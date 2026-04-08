#!/usr/bin/env node
// Extracts and displays all questions/answers from Coderegon Trail game files.
// Usage:
//   node scripts/audit-trails.js              # all games, human-readable
//   node scripts/audit-trails.js --json       # all games, JSON output
//   node scripts/audit-trails.js --game gstack # single game
//   node scripts/audit-trails.js --stale 30   # only games with snapshots > 30 days old

const { loadAllGames } = require('./lib/trail-data');

// --- Parse args ---
const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const gameIdx = args.indexOf('--game');
const gameFilter = gameIdx !== -1 ? args[gameIdx + 1] : null;
const staleIdx = args.indexOf('--stale');
const staleDays = staleIdx !== -1 ? parseInt(args[staleIdx + 1], 10) : null;

// --- Calculate days ago ---
function daysAgo(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

// --- Main ---
const { loaded, errors } = loadAllGames();
const results = [];

for (const { dir, data } of loaded) {
  if (gameFilter && dir !== gameFilter) continue;

  const age = data.sourceInfo?.snapshotDate ? daysAgo(data.sourceInfo.snapshotDate) : null;

  // --stale filter: skip games that aren't old enough
  if (staleDays != null) {
    if (age == null || age < staleDays) continue;
  }

  const quizEvents = data.events.filter(e => e.choices && e.choices.length > 0);
  const fortuneEvents = data.events.filter(e => !e.choices || e.choices.length === 0);

  const gameResult = {
    dir,
    framework: data.framework,
    trailName: data.trailName,
    sourceInfo: data.sourceInfo || null,
    age,
    totalEvents: data.events.length,
    quizCount: quizEvents.length,
    fortuneCount: fortuneEvents.length,
    stops: data.stops.map(s => s.name),
    partyMembers: data.partyMembers.map(m => m.name),
    events: data.events.map((event, i) => ({
      index: i + 1,
      type: event.type,
      difficulty: event.difficulty,
      triggerStop: event.triggerStop,
      stopName: data.stops[event.triggerStop]?.name || `stop ${event.triggerStop}`,
      title: event.title,
      concept: event.concept,
      text: event.text,
      choices: event.choices.map(c => ({
        text: c.text,
        correct: c.correct,
        explanation: c.explanation
      }))
    }))
  };

  results.push(gameResult);
}

if (jsonMode) {
  const output = {
    games: results,
    errors: errors.map(dir => ({ dir, error: 'truncated or malformed TRAIL_DATA JSON' }))
  };
  process.stdout.write(JSON.stringify(output, null, 2) + '\n');
  process.exit(errors.length > 0 ? 1 : 0);
}

// --- Human-readable output ---
for (const game of results) {
  const sep = '='.repeat(60);
  console.log(`\n${sep}`);
  console.log(`${game.framework}: ${game.trailName}`);
  console.log(sep);

  if (game.sourceInfo) {
    const src = game.sourceInfo;
    console.log(`Source: ${src.repo} @ ${src.commit} (${src.snapshotDate}) — ${game.age} days ago`);
  } else {
    console.log('Source: built-in (no source tracking)');
  }

  console.log(`${game.totalEvents} events (${game.quizCount} quiz + ${game.fortuneCount} fortune)`);
  console.log(`Party: ${game.partyMembers.join(', ')}`);
  console.log('');

  for (const event of game.events) {
    const label = `[${event.index}/${game.totalEvents}]`;
    const typeStr = event.type.toUpperCase();
    const diff = event.difficulty;
    console.log(`${label} ${typeStr} (${diff}) — after stop ${event.triggerStop} "${event.stopName}"`);
    console.log(`  Concept: ${event.concept}`);
    console.log(`  Q: ${event.text}`);

    if (event.choices.length === 0) {
      console.log('  (auto-apply fortune — no choices)');
    } else {
      const labels = 'ABCD';
      for (let j = 0; j < event.choices.length; j++) {
        const c = event.choices[j];
        const mark = c.correct ? ' [CORRECT]' : '';
        console.log(`  ${labels[j]}) ${c.text}${mark}`);
      }
    }
    console.log('');
  }
}

if (errors.length > 0) {
  console.log('\n' + '='.repeat(60));
  console.log('ERRORS: Could not parse TRAIL_DATA for:');
  console.log('='.repeat(60));
  for (const dir of errors) {
    console.log(`  ${dir}/index.html — truncated or malformed JSON`);
  }
  console.log('');
}

if (results.length === 0 && errors.length === 0) {
  if (gameFilter) {
    console.error(`No game found matching "${gameFilter}"`);
  } else if (staleDays != null) {
    console.log(`No games with snapshots older than ${staleDays} days.`);
  }
}

// Summary
if (!jsonMode) {
  console.log(`${results.length} games audited, ${errors.length} failed to parse`);
}
