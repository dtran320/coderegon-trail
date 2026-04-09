// TITLE
The Coderegon Trail - Ferrite Edition
// END TITLE

// FLAVORS
const travelFlavors = [
  "The markdown renders cleanly today...",
  "Comrak parses the AST in microseconds...",
  "The rope rebalances after a large paste...",
  "Syntax highlighting paints the code blocks...",
  "A Mermaid flowchart appears in the preview...",
  "The line cache warms up. Galleys are ready...",
  "Virtual scrolling skips 400,000 invisible lines...",
  "Blake3 hashes the document. Cache hit...",
  "The Sugiyama layout assigns layers to nodes...",
  "HarfRust shapes the complex script glyphs...",
  "The WYSIWYG editor maps clicks to source lines...",
  "Dark mode activates. Base16-ocean colors load...",
  "The tab bar wraps to a second row. Many files open...",
  "Ropey splits the text at a balanced tree node...",
  "The overscan buffer pre-renders five extra lines...",
  "A wikilink resolves to another markdown file..."
];
// END FLAVORS

// OVERLAYS
  // --- BUFFER OVERFLOW STORM: cascading characters raining down ---
  if (currentEventTitle.indexOf('Buffer Overflow Storm') !== -1) {
    ctx.fillStyle = 'rgba(0,0,40,0.4)';
    ctx.fillRect(0, 0, W, 110);
    // Raining characters
    ctx.fillStyle = '#55FF55';
    ctx.font = '8px monospace';
    var chars = 'fn let mut pub struct impl use mod';
    for (var i = 0; i < 30; i++) {
      var cx = (i * 11.3 + t * 60) % W;
      var cy = (i * 17.1 + t * 90) % 130;
      var ch = chars[Math.floor((i * 7 + t * 3) % chars.length)];
      ctx.fillText(ch, Math.floor(cx), Math.floor(cy));
    }
    // Lightning bolt (periodic)
    var flashPhase = Math.sin(t * 1.7) + Math.sin(t * 3.1);
    if (flashPhase > 1.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#FFFF55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      var lx = 100 + Math.sin(t * 2.3) * 50;
      ctx.moveTo(lx, 8);
      ctx.lineTo(lx - 4, 30);
      ctx.lineTo(lx + 6, 30);
      ctx.lineTo(lx - 2, 55);
      ctx.stroke();
    }
    return;
  }

  // --- PARSER ENCOUNTER: person with scroll by campfire ---
  if (currentEventTitle.indexOf('Parser Appears') !== -1) {
    var px = 195, py = 142;
    // Person body
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Scroll/document in hand
    ctx.fillStyle = '#FFFFAA';
    ctx.fillRect(px + 6, py - 11, 6, 8);
    ctx.fillStyle = '#AAAAAA';
    ctx.fillRect(px + 7, py - 10, 4, 1);
    ctx.fillRect(px + 7, py - 8, 3, 1);
    ctx.fillRect(px + 7, py - 6, 4, 1);
    // Campfire
    var fx = 210, fy = 148;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(fx - 3, fy, 2, 3);
    ctx.fillRect(fx + 3, fy, 2, 3);
    ctx.fillStyle = '#FF5555';
    var flicker = Math.sin(t * 8) * 2;
    ctx.fillRect(fx - 1, fy - 3 + Math.floor(flicker * 0.3), 4, 3);
    ctx.fillStyle = '#FFFF55';
    ctx.fillRect(fx, fy - 5 + Math.floor(flicker * 0.5), 2, 2);
    ctx.fillStyle = 'rgba(255,170,0,0.08)';
    ctx.beginPath();
    ctx.arc(fx + 1, fy - 2, 15, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // --- CACHE INVALIDATION CROSSING: turbulent river with hash symbols ---
  if (currentEventTitle.indexOf('Cache Invalidation Crossing') !== -1) {
    // Turbulent water
    ctx.fillStyle = '#55AAFF';
    for (var i = 0; i < 25; i++) {
      var sx = (i * 13 + t * 50) % W;
      var sy = 155 + Math.sin((i * 2.7 + t * 4)) * 4;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 5, 2);
    }
    // Floating hash symbols
    ctx.fillStyle = '#FFFF55';
    ctx.font = '7px monospace';
    for (var i = 0; i < 5; i++) {
      var hx = (i * 65 + t * 20) % W;
      var hy = 158 + Math.sin(t * 2.5 + i * 1.3) * 3;
      ctx.fillText('#', Math.floor(hx), Math.floor(hy));
    }
    // Floating log
    ctx.fillStyle = '#AA5500';
    for (var i = 0; i < 3; i++) {
      var logX = (i * 110 + t * 30) % W;
      var logY = 160 + Math.sin(t * 1.8 + i) * 2;
      ctx.fillRect(Math.floor(logX), Math.floor(logY), 8, 2);
    }
    return;
  }

  // --- THEME BLIZZARD: snow and dark/light flashing ---
  if (currentEventTitle.indexOf('Theme Blizzard') !== -1) {
    // Darken sky
    ctx.fillStyle = 'rgba(20,20,40,0.5)';
    ctx.fillRect(0, 0, W, 110);
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 50; i++) {
      var sx = (i * 6.7 + t * 30 + Math.sin(t + i) * 10) % W;
      var sy = (i * 11.3 + t * 40) % 140;
      var size = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }
    // Periodic dark/light flash (theme switching effect)
    var themeFlash = Math.sin(t * 0.8);
    if (themeFlash > 0.7) {
      ctx.fillStyle = 'rgba(255,255,240,0.15)';
      ctx.fillRect(0, 0, W, H);
    }
    return;
  }

  // --- DIAGRAM CARTOGRAPHER: person with map and protractor ---
  if (currentEventTitle.indexOf('Diagram Cartographer') !== -1) {
    var mx = 180, my = 140;
    // Person
    ctx.fillStyle = '#886633';
    ctx.fillRect(mx, my - 12, 4, 8);
    ctx.fillStyle = '#DDAA55';
    ctx.fillRect(mx, my - 15, 4, 3);
    ctx.fillRect(mx - 1, my - 4, 2, 5);
    ctx.fillRect(mx + 3, my - 4, 2, 5);
    // Hat (cartographer)
    ctx.fillStyle = '#553311';
    ctx.fillRect(mx - 2, my - 17, 8, 2);
    ctx.fillRect(mx - 1, my - 19, 6, 2);
    // Map/diagram on ground
    ctx.fillStyle = '#FFFFCC';
    ctx.fillRect(mx + 10, my - 6, 14, 10);
    // Flowchart boxes on map
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.strokeRect(mx + 12, my - 4, 4, 3);
    ctx.strokeRect(mx + 18, my - 4, 4, 3);
    ctx.beginPath();
    ctx.moveTo(mx + 16, my - 2);
    ctx.lineTo(mx + 18, my - 2);
    ctx.stroke();
    ctx.strokeRect(mx + 14, my + 1, 4, 3);
    ctx.beginPath();
    ctx.moveTo(mx + 16, my - 1);
    ctx.lineTo(mx + 16, my + 1);
    ctx.stroke();
    return;
  }

  // --- MEMORY LEAK: dripping green liquid, warning signs ---
  if (currentEventTitle.indexOf('Memory Leak') !== -1) {
    // Green drips from sky
    ctx.fillStyle = '#33FF33';
    for (var i = 0; i < 15; i++) {
      var dx = 30 + (i * 19) % (W - 60);
      var dy = (i * 23 + t * 50) % 100;
      var dh = 3 + Math.sin(t * 2 + i) * 2;
      ctx.fillRect(Math.floor(dx), Math.floor(dy), 2, Math.floor(Math.abs(dh)));
    }
    // Warning sign
    var wx = 240, wy = 130;
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.moveTo(wx, wy - 12);
    ctx.lineTo(wx - 8, wy);
    ctx.lineTo(wx + 8, wy);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = '8px monospace';
    ctx.fillText('!', wx - 2, wy - 2);
    // Pile of tab icons
    ctx.fillStyle = '#666666';
    for (var i = 0; i < 6; i++) {
      ctx.fillRect(wx - 15 + i * 5, wy + 2, 4, 3);
    }
    return;
  }

  // --- VIRTUAL SCROLL BREAKTHROUGH: clear skies, rainbow ---
  if (currentEventTitle.indexOf('Virtual Scroll Breakthrough') !== -1) {
    // Rainbow arc
    var colors = ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0088FF', '#8800FF'];
    for (var c = 0; c < colors.length; c++) {
      ctx.strokeStyle = colors[c];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(W / 2, 120, 80 - c * 4, Math.PI, 0);
      ctx.stroke();
    }
    // Sparkles
    ctx.fillStyle = '#FFFF55';
    for (var i = 0; i < 8; i++) {
      var sx = 60 + (i * 30) + Math.sin(t * 3 + i) * 5;
      var sy = 40 + Math.sin(t * 2 + i * 0.7) * 15;
      var sparkSize = Math.abs(Math.sin(t * 4 + i * 1.5)) > 0.6 ? 2 : 1;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), sparkSize, sparkSize);
    }
    return;
  }
// END OVERLAYS
