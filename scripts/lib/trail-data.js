// Shared TRAIL_DATA extraction logic used by audit and validation scripts.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

function findGames() {
  return fs.readdirSync(ROOT).filter(dir => {
    const dirPath = path.join(ROOT, dir);
    const htmlPath = path.join(dirPath, 'index.html');
    return fs.statSync(dirPath).isDirectory()
      && fs.existsSync(htmlPath)
      && fs.readFileSync(htmlPath, 'utf8').includes('TRAIL_DATA');
  }).sort();
}

function extractTrailData(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const marker = 'window.TRAIL_DATA = ';
  const start = html.indexOf(marker);
  if (start === -1) return null;

  const jsonStart = start + marker.length;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = jsonStart; i < html.length; i++) {
    const c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\' && inStr) { esc = true; continue; }
    if (c === '"' && !esc) { inStr = !inStr; continue; }
    if (!inStr) {
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) {
        try { return JSON.parse(html.slice(jsonStart, i + 1)); }
        catch(e) { return null; }
      }}
    }
  }
  return null;
}

function loadAllGames() {
  const games = findGames();
  const loaded = [];
  const errors = [];
  for (const dir of games) {
    const data = extractTrailData(path.join(ROOT, dir, 'index.html'));
    if (data) loaded.push({ dir, data });
    else errors.push(dir);
  }
  return { loaded, errors };
}

module.exports = { ROOT, findGames, extractTrailData, loadAllGames };
