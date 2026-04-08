// TITLE
// Title screen customizations for pg_textsearch — The Relevance Trail
const TITLE_CONFIG = {
  title: "THE RELEVANCE TRAIL",
  subtitle: "A pg_textsearch Learning Adventure",
  tagline: "BM25 Full-Text Search for Postgres",
  year: "2025",
  colors: {
    titleText: "#FFAA00",
    subtitleText: "#55FFFF",
    taglineText: "#AAAAAA",
    wagonAccent: "#FF5555",
    skyTop: "#001144",
    skyBottom: "#003366",
    ground: "#2A1B0A",
    trailDust: "#5C4A2A"
  }
};
// END TITLE

// FLAVORS
const travelFlavors = [
  "The posting lists are well-ordered today...",
  "Your inverted index is freshly compacted...",
  "Document frequencies hold steady on the trail...",
  "A warm cache of IDF values speeds your journey...",
  "The memtable spills gracefully to disk...",
  "Segment levels merge without conflict...",
  "Your BM25 parameters are well-tuned...",
  "The lexemes stem cleanly through the English config...",
  "Block-max upper bounds keep the path efficient...",
  "Bitpacked deltas decode swiftly in the SIMD lane...",
  "A hawk circles overhead, watching your query throughput...",
  "The top-k heap maintains perfect order...",
  "Your shared memory allocation is generous today...",
  "The planner hooks resolve indexes without a catalog miss...",
  "The trail ahead is indexed and ready for scanning..."
];
// END FLAVORS

// OVERLAYS
function drawEventOverlay(time) {
  if (!currentEventType && !currentEventTitle) return;

  var t = (time || 0) * 0.001;

  // --- CONFIGURATION STORM: swirling config files, lightning ---
  if (currentEventTitle.indexOf('Configuration Storm') !== -1) {
    ctx.fillStyle = 'rgba(0,0,50,0.45)';
    ctx.fillRect(0, 0, W, 110);
    var flashPhase = Math.sin(t * 1.7) + Math.sin(t * 3.1);
    if (flashPhase > 1.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#FFFF55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      var lx = 80 + Math.sin(t * 2.3) * 60;
      ctx.moveTo(lx, 10);
      ctx.lineTo(lx - 5, 35);
      ctx.lineTo(lx + 8, 35);
      ctx.lineTo(lx - 3, 65);
      ctx.stroke();
    }
    // Falling config tokens (like rain but blocky)
    ctx.fillStyle = '#55AAFF';
    for (var i = 0; i < 30; i++) {
      var rx = (i * 11.3 + t * 60) % W;
      var ry = (i * 17.7 + t * 100) % 110;
      ctx.fillRect(Math.floor(rx), Math.floor(ry), 3, 2);
    }
    return;
  }

  // --- DATABASE TRAVELER: person at a signpost ---
  if (currentEventTitle.indexOf('Database Traveler') !== -1) {
    var px = 200, py = 142;
    // Person
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Database hat (cylinder)
    ctx.fillStyle = '#5555FF';
    ctx.fillRect(px - 2, py - 19, 8, 2);
    ctx.fillRect(px - 1, py - 22, 6, 3);
    // Signpost
    var sx = 215, sy = 130;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(sx, sy, 2, 20);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(sx - 8, sy, 18, 6);
    ctx.fillRect(sx - 6, sy + 8, 14, 6);
    // Sign text dots
    ctx.fillStyle = '#000000';
    for (var i = 0; i < 4; i++) ctx.fillRect(sx - 5 + i * 4, sy + 2, 2, 2);
    return;
  }

  // --- MEMORY BOUNDARY RIVER: data flowing downstream ---
  if (currentEventTitle.indexOf('Memory Boundary') !== -1) {
    ctx.fillStyle = '#55FFFF';
    for (var i = 0; i < 25; i++) {
      var sx = (i * 14 + t * 50) % W;
      var sy = 155 + Math.sin((i * 2.5 + t * 4)) * 4;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 5, 2);
    }
    // Memory blocks floating
    ctx.fillStyle = '#FFAA00';
    for (var i = 0; i < 5; i++) {
      var bx = (i * 70 + t * 30) % W;
      var by = 157 + Math.sin(t * 1.5 + i * 1.2) * 3;
      ctx.fillRect(Math.floor(bx), Math.floor(by), 6, 4);
      ctx.fillStyle = '#FF5555';
      ctx.fillRect(Math.floor(bx) + 1, Math.floor(by) + 1, 4, 2);
      ctx.fillStyle = '#FFAA00';
    }
    return;
  }

  // --- N+1 QUERY PLAGUE: red danger, multiplying query particles ---
  if (currentEventTitle.indexOf('N-plus-One') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.2)';
    ctx.fillRect(0, 0, W, H);
    // Multiplying query particles
    ctx.fillStyle = '#FF5555';
    var numParticles = 10 + Math.floor(t * 3) % 30;
    for (var i = 0; i < numParticles; i++) {
      var qx = 60 + Math.sin(i * 1.7 + t * 2) * 100;
      var qy = 60 + Math.cos(i * 2.3 + t * 1.5) * 40;
      ctx.fillRect(Math.floor(qx), Math.floor(qy), 2, 2);
    }
    // Exclamation marks
    ctx.fillStyle = '#FFFF55';
    for (var i = 0; i < 3; i++) {
      var ex = 100 + i * 60;
      var ey = 40 + Math.sin(t * 3 + i) * 5;
      ctx.fillRect(ex, Math.floor(ey), 2, 6);
      ctx.fillRect(ex, Math.floor(ey) + 8, 2, 2);
    }
    return;
  }

  // --- THRESHOLD BLIZZARD: snow, wind, swirling documents ---
  if (currentEventTitle.indexOf('Threshold Blizzard') !== -1) {
    // White-out effect
    ctx.fillStyle = 'rgba(200,200,255,0.15)';
    ctx.fillRect(0, 0, W, H);
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 50; i++) {
      var sx = (i * 7.1 + t * 40 + Math.sin(i + t) * 20) % W;
      var sy = (i * 11.3 + t * 60) % H;
      var size = 1 + (i % 3);
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }
    // Wind streaks
    ctx.strokeStyle = 'rgba(200,200,255,0.3)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 8; i++) {
      var wy = 30 + i * 15;
      ctx.beginPath();
      ctx.moveTo((t * 80 + i * 40) % W, wy);
      ctx.lineTo((t * 80 + i * 40 + 20) % W, wy + 2);
      ctx.stroke();
    }
    return;
  }

  // --- COMPRESSION CROSSING: river with binary digits ---
  if (currentEventTitle.indexOf('Compression Crossing') !== -1) {
    ctx.fillStyle = '#3388FF';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 17 + t * 35) % W;
      var sy = 156 + Math.sin((i * 3 + t * 4)) * 3;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 4, 2);
    }
    // Binary digits floating on the river
    ctx.fillStyle = '#00FF00';
    ctx.font = '6px monospace';
    for (var i = 0; i < 15; i++) {
      var dx = (i * 22 + t * 25) % W;
      var dy = 158 + Math.sin(t * 2 + i * 0.8) * 2;
      var bit = ((i + Math.floor(t)) % 2) ? '1' : '0';
      ctx.fillText(bit, Math.floor(dx), Math.floor(dy));
    }
    return;
  }

  // --- CACHE FORTUNE: sparkles and golden glow ---
  if (currentEventTitle.indexOf('Cache of Fresh') !== -1) {
    // Golden glow
    ctx.fillStyle = 'rgba(255,170,0,0.1)';
    ctx.beginPath();
    ctx.arc(160, 130, 40, 0, Math.PI * 2);
    ctx.fill();
    // Sparkles
    ctx.fillStyle = '#FFFF55';
    for (var i = 0; i < 12; i++) {
      var angle = (i / 12) * Math.PI * 2 + t * 0.5;
      var dist = 20 + Math.sin(t * 3 + i) * 8;
      var sparkX = 160 + Math.cos(angle) * dist;
      var sparkY = 130 + Math.sin(angle) * dist;
      ctx.fillRect(Math.floor(sparkX), Math.floor(sparkY), 2, 2);
    }
    // Treasure chest
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(152, 134, 16, 10);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(154, 136, 12, 6);
    ctx.fillStyle = '#FFFF55';
    ctx.fillRect(159, 138, 2, 2);
    return;
  }

  // --- SCORE NEGATION BUG: broken wheel, upside-down numbers ---
  if (currentEventTitle.indexOf('Score Negation') !== -1) {
    // Warning stripes
    ctx.fillStyle = 'rgba(255,170,0,0.15)';
    ctx.fillRect(0, 0, W, H);
    // Broken wheel
    var wx = 240, wy = 148;
    ctx.strokeStyle = '#AA5500';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(wx, wy, 8, 0, Math.PI * 1.5);
    ctx.stroke();
    // Spokes
    for (var i = 0; i < 4; i++) {
      var angle = (i / 4) * Math.PI * 2 + t * 0.3;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx + Math.cos(angle) * 7, wy + Math.sin(angle) * 7);
      ctx.stroke();
    }
    // Upside-down score numbers
    ctx.save();
    ctx.fillStyle = '#FF5555';
    ctx.font = '8px monospace';
    ctx.translate(160, 80);
    ctx.rotate(Math.PI);
    ctx.fillText('-8.5', -10, 0);
    ctx.restore();
    ctx.fillStyle = '#55FF55';
    ctx.font = '8px monospace';
    ctx.fillText('8.5', 150, 90);
    return;
  }
}
// END OVERLAYS
