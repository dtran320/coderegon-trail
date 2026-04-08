#!/usr/bin/env node
// Checks if upstream repos have newer commits since each game's snapshot.
// Requires: gh CLI authenticated
// Run: node scripts/check-staleness.js
// Exit code 1 if any games are stale.

const { execSync } = require('child_process');
const { loadAllGames } = require('./lib/trail-data');

function daysAgo(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

function checkUpstream(repo, sinceDate) {
  try {
    const result = execSync(
      `gh api repos/${repo}/commits?since=${sinceDate}T00:00:00Z\\&per_page=1 --jq 'length'`,
      { encoding: 'utf8', timeout: 10000, stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    return parseInt(result, 10) > 0;
  } catch(e) {
    return null; // API error (repo not found, auth issue, etc.)
  }
}

const { loaded, errors } = loadAllGames();

const gamesWithSource = loaded.filter(g => g.data.sourceInfo?.repo);
let staleCount = 0;

console.log('Checking upstream repos for new commits...\n');

for (const { dir, data } of gamesWithSource) {
  const { repo, commit, snapshotDate } = data.sourceInfo;
  const age = daysAgo(snapshotDate);
  const hasNewCommits = checkUpstream(repo, snapshotDate);

  let status;
  if (hasNewCommits === null) {
    status = 'ERROR (API)';
  } else if (hasNewCommits) {
    status = 'STALE';
    staleCount++;
  } else {
    status = 'current';
  }

  const statusMark = status === 'current' ? '  ' : status === 'STALE' ? '! ' : '? ';
  console.log(`${statusMark}${dir.padEnd(14)} ${repo.padEnd(30)} ${commit}  ${snapshotDate} (${age}d ago)  ${status}`);
}

console.log(`\n${gamesWithSource.length} games checked, ${staleCount} stale`);

if (errors.length > 0) {
  console.log(`${errors.length} games could not be parsed: ${errors.join(', ')}`);
}

process.exit(staleCount > 0 ? 1 : 0);
