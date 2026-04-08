#!/usr/bin/env node
// Validates structural correctness of all Coderegon Trail game data.
// Run: node tests/validate-trails.js

const { loadAllGames } = require('../scripts/lib/trail-data');

const VALID_TYPES = ['weather', 'encounter', 'misfortune', 'fortune', 'river'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

let totalPass = 0;
let totalFail = 0;
const failures = [];

function check(game, desc, condition) {
  if (condition) {
    totalPass++;
  } else {
    totalFail++;
    failures.push(`${game}: ${desc}`);
  }
}

const { loaded, errors } = loadAllGames();

// Report parse errors as failures
for (const dir of errors) {
  totalFail++;
  failures.push(`${dir}: TRAIL_DATA is truncated or malformed — cannot parse`);
}

for (const { dir, data } of loaded) {
  const memberNames = data.partyMembers.map(m => m.name);

  // --- Stop validation ---
  check(dir, 'has at least 2 stops', data.stops.length >= 2);

  // --- Event validation ---
  const eventTitles = new Set();
  const conceptsCovered = new Set();

  for (let i = 0; i < data.events.length; i++) {
    const e = data.events[i];
    const label = `event[${i}] "${e.title}"`;

    // Required fields
    check(dir, `${label} has type`, typeof e.type === 'string');
    check(dir, `${label} has trigger`, typeof e.trigger === 'string');
    check(dir, `${label} has triggerStop`, typeof e.triggerStop === 'number');
    check(dir, `${label} has title`, typeof e.title === 'string' && e.title.length > 0);
    check(dir, `${label} has text`, typeof e.text === 'string' && e.text.length > 0);
    check(dir, `${label} has choices array`, Array.isArray(e.choices));
    check(dir, `${label} has concept`, typeof e.concept === 'string');
    check(dir, `${label} has difficulty`, typeof e.difficulty === 'string');

    // Valid enum values
    check(dir, `${label} type is valid (${e.type})`, VALID_TYPES.includes(e.type));
    check(dir, `${label} difficulty is valid (${e.difficulty})`, VALID_DIFFICULTIES.includes(e.difficulty));

    // triggerStop in range
    check(dir, `${label} triggerStop ${e.triggerStop} in range [0, ${data.stops.length - 1}]`,
      e.triggerStop >= 0 && e.triggerStop < data.stops.length);

    // Concept matches a party member
    check(dir, `${label} concept "${e.concept}" matches a party member`,
      memberNames.includes(e.concept));
    conceptsCovered.add(e.concept);

    // Fortune events: no choices
    if (e.type === 'fortune') {
      check(dir, `${label} fortune has empty choices`, e.choices.length === 0);
    } else {
      // Non-fortune: exactly 1 correct answer
      const correctCount = e.choices.filter(c => c.correct).length;
      check(dir, `${label} has exactly 1 correct answer (got ${correctCount})`, correctCount === 1);

      // Each choice has required fields
      for (let j = 0; j < e.choices.length; j++) {
        const c = e.choices[j];
        check(dir, `${label} choice[${j}] has text`, typeof c.text === 'string' && c.text.length > 0);
        check(dir, `${label} choice[${j}] has correct flag`, typeof c.correct === 'boolean');
        check(dir, `${label} choice[${j}] has explanation`, typeof c.explanation === 'string' && c.explanation.length > 0);
      }
    }

    // No duplicate titles
    check(dir, `${label} title is unique`, !eventTitles.has(e.title));
    eventTitles.add(e.title);
  }

  // Each party member should have at least 1 event
  for (const name of memberNames) {
    check(dir, `party member "${name}" has at least 1 event`, conceptsCovered.has(name));
  }

  // sourceInfo validation (when present)
  if (data.sourceInfo) {
    check(dir, 'sourceInfo has repo', typeof data.sourceInfo.repo === 'string');
    check(dir, 'sourceInfo has commit', typeof data.sourceInfo.commit === 'string');
    check(dir, 'sourceInfo has snapshotDate', typeof data.sourceInfo.snapshotDate === 'string');
  }

  // partyMembers validation
  check(dir, 'has 4 party members', data.partyMembers.length === 4);
  for (let i = 0; i < data.partyMembers.length; i++) {
    const m = data.partyMembers[i];
    check(dir, `partyMember[${i}] has name`, typeof m.name === 'string');
    check(dir, `partyMember[${i}] has icon`, typeof m.icon === 'string');
    check(dir, `partyMember[${i}] has maxHealth`, typeof m.maxHealth === 'number' && m.maxHealth > 0);
  }

  // deathMessages
  check(dir, 'has death messages', Array.isArray(data.deathMessages) && data.deathMessages.length > 0);
}

// --- Report ---
console.log('');
if (failures.length === 0) {
  console.log(`All ${totalPass} checks passed across ${loaded.length} games.`);
} else {
  console.log('FAILURES:');
  for (const f of failures) {
    console.log(`  FAIL: ${f}`);
  }
  console.log(`\n${totalPass} passed, ${totalFail} failed across ${loaded.length} games (+${errors.length} unparseable)`);
}

process.exit(totalFail > 0 ? 1 : 0);
