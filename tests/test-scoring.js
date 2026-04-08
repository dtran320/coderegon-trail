#!/usr/bin/env node
// Tests for Coderegon Trail scoring and damage logic.
// Mirrors the logic in engine.js:1471-1536, 1542-1562.
// Run: node tests/test-scoring.js

let pass = 0;
let fail = 0;

function assert(name, actual, expected) {
  if (actual === expected) {
    pass++;
  } else {
    fail++;
    console.log(`  FAIL: ${name} — expected ${expected}, got ${actual}`);
  }
}

// --- Scoring engine (extracted from engine.js:1517-1536) ---
function applyChoice(state, event, choice) {
  state.totalQuestions++;
  const isRiver = event.type === 'river';

  if (choice.correct) {
    const bonus = state.streak >= 3 ? 5 : 0;
    state.health = Math.min(state.health + 10 + bonus, state.maxHealth);
    state.score++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  } else {
    const dmg = isRiver ? 20 : 15;
    state.health -= dmg;
    state.streak = 0;
    // Damage party member
    const memberIdx = state.partyMembers.findIndex(m => m.name === event.concept);
    if (memberIdx >= 0 && state.partyHealth[memberIdx] > 0) {
      state.partyHealth[memberIdx]--;
    }
  }
}

// Fortune events (engine.js:1471-1475)
function applyFortune(state) {
  state.health = Math.min(state.health + 20, state.maxHealth);
}

// Hint logic (engine.js:1542-1562)
function applyHint(state, hintFree) {
  if (!hintFree && state.supplies <= 0) return false;
  if (!hintFree) state.supplies--;
  state.hintsUsed++;
  return true;
}

function freshState(overrides) {
  return {
    health: 100, maxHealth: 100, supplies: 5,
    score: 0, totalQuestions: 0, streak: 0, bestStreak: 0, hintsUsed: 0,
    partyMembers: [
      { name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }
    ],
    partyHealth: [3, 3, 3, 3],
    ...overrides
  };
}

// --- Tests ---

console.log('Correct answer basics:');
{
  const s = freshState();
  const event = { type: 'weather', concept: 'A' };
  applyChoice(s, event, { correct: true });
  assert('health +10', s.health, 100); // capped at max
  assert('score +1', s.score, 1);
  assert('streak +1', s.streak, 1);
  assert('totalQuestions +1', s.totalQuestions, 1);
}

console.log('Correct answer health gain (not at cap):');
{
  const s = freshState({ health: 80 });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: true });
  assert('health 80 -> 90', s.health, 90);
}

console.log('Wrong answer (non-river):');
{
  const s = freshState();
  applyChoice(s, { type: 'weather', concept: 'B' }, { correct: false });
  assert('health -15', s.health, 85);
  assert('streak reset', s.streak, 0);
  assert('score unchanged', s.score, 0);
  assert('party member B damaged', s.partyHealth[1], 2);
  assert('party member A untouched', s.partyHealth[0], 3);
}

console.log('Wrong answer (river — double damage):');
{
  const s = freshState();
  applyChoice(s, { type: 'river', concept: 'C' }, { correct: false });
  assert('health -20', s.health, 80);
  assert('party member C damaged', s.partyHealth[2], 2);
}

console.log('Streak bonus at 3:');
{
  const s = freshState({ health: 50 });
  const event = { type: 'weather', concept: 'A' };
  // Build streak to 3
  applyChoice(s, event, { correct: true }); // streak=1, health=60
  applyChoice(s, event, { correct: true }); // streak=2, health=70
  applyChoice(s, event, { correct: true }); // streak=3, health=80+5=85? No: 80+0=80 (streak was 2 when checked)
  // streak was 2 before this call, so bonus = 0, health = 80
  assert('health after 3 correct (no bonus yet)', s.health, 80);
  assert('streak is 3', s.streak, 3);

  // 4th correct: streak is 3, so bonus = 5
  applyChoice(s, event, { correct: true }); // health = 80 + 10 + 5 = 95
  assert('health with streak bonus', s.health, 95);
  assert('bestStreak tracks high water', s.bestStreak, 4);
}

console.log('Streak resets on wrong answer:');
{
  const s = freshState({ health: 50, streak: 5, bestStreak: 5 });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: false });
  assert('streak reset to 0', s.streak, 0);
  assert('bestStreak preserved', s.bestStreak, 5);
}

console.log('Health capped at max:');
{
  const s = freshState({ health: 95 });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: true });
  assert('health capped at 100', s.health, 100);
}

console.log('Health capped with streak bonus:');
{
  const s = freshState({ health: 90, streak: 3 });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: true });
  assert('health capped at 100 even with bonus', s.health, 100);
}

console.log('Fortune event:');
{
  const s = freshState({ health: 70 });
  applyFortune(s);
  assert('fortune +20 health', s.health, 90);
}

console.log('Fortune health capped:');
{
  const s = freshState({ health: 90 });
  applyFortune(s);
  assert('fortune capped at 100', s.health, 100);
}

console.log('Party member at 0 health not damaged further:');
{
  const s = freshState({ partyHealth: [0, 3, 3, 3] });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: false });
  assert('party member stays at 0', s.partyHealth[0], 0);
}

console.log('Unknown concept does not crash:');
{
  const s = freshState();
  applyChoice(s, { type: 'weather', concept: 'Unknown' }, { correct: false });
  assert('health still damaged', s.health, 85);
  assert('all party health unchanged', s.partyHealth.join(','), '3,3,3,3');
}

console.log('Hint costs 1 supply:');
{
  const s = freshState({ supplies: 3 });
  const used = applyHint(s, false);
  assert('hint used', used, true);
  assert('supplies -1', s.supplies, 2);
  assert('hintsUsed +1', s.hintsUsed, 1);
}

console.log('Hint free for Ralph Wiggum:');
{
  const s = freshState({ supplies: 0 });
  const used = applyHint(s, true);
  assert('hint allowed', used, true);
  assert('supplies unchanged', s.supplies, 0);
  assert('hintsUsed +1', s.hintsUsed, 1);
}

console.log('Hint blocked when no supplies:');
{
  const s = freshState({ supplies: 0 });
  const used = applyHint(s, false);
  assert('hint blocked', used, false);
  assert('supplies unchanged', s.supplies, 0);
  assert('hintsUsed unchanged', s.hintsUsed, 0);
}

console.log('Custom max health (Staff Architect):');
{
  const s = freshState({ health: 50, maxHealth: 50 });
  applyChoice(s, { type: 'weather', concept: 'A' }, { correct: true });
  assert('health capped at 50', s.health, 50);
}

// --- Summary ---
console.log('');
if (fail === 0) {
  console.log(`All ${pass} scoring tests passed.`);
} else {
  console.log(`${pass} passed, ${fail} failed.`);
}
process.exit(fail > 0 ? 1 : 0);
