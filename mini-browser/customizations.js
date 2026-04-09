// TITLE
The Coderegon Trail - Mini Browser Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The HTML stream arrives cleanly over the wire...",
  "Your tokenizer hums along, splitting tags from text...",
  "Angle brackets pass by like mile markers on the trail...",
  "The DOM tree grows taller with each parsed element...",
  "Shared pointers keep your nodes alive and connected...",
  "CSS rules cascade like waterfalls along the trail...",
  "The style computation engine resolves property conflicts...",
  "QFontMetrics measures each word with pixel precision...",
  "Layout boxes stack and flow across the viewport...",
  "The paint queue is clear and the QPainter is ready...",
  "A gentle breeze carries well-formed HTML your way...",
  "Your party's computed styles look sharp and resolved...",
  "Block elements march in orderly vertical columns...",
  "Inline elements flow like a river of text across the page...",
  "The user agent stylesheet provides sensible defaults..."
];
// END FLAVORS
// OVERLAYS
  // --- RENDERING STORM: dark sky, falling angle brackets ---
  if (currentEventTitle.indexOf('Rendering Storm') !== -1) {
    ctx.fillStyle = 'rgba(0,0,50,0.45)';
    ctx.fillRect(0, 0, W, 110);
    var flashPhase = Math.sin(t * 1.7) + Math.sin(t * 3.1);
    if (flashPhase > 1.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillRect(0, 0, W, H);
    }
    ctx.fillStyle = '#7B68EE';
    ctx.font = '10px monospace';
    for (var i = 0; i < 20; i++) {
      var bx = (i * 17 + t * 30) % W;
      var by = (i * 23 + t * 60) % 110;
      ctx.fillText(i % 2 === 0 ? '<' : '>', Math.floor(bx), Math.floor(by));
    }
    return;
  }

  // --- PIPELINE CROSSING: turbulent data stream ---
  if (currentEventTitle.indexOf('Pipeline') !== -1 || currentEventTitle.indexOf('Cascade') !== -1) {
    ctx.fillStyle = '#55FFFF';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 17 + t * 40) % W;
      var sy = 157 + Math.sin((i * 3 + t * 5)) * 3;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 4, 2);
    }
    ctx.fillStyle = '#4682B4';
    ctx.font = '6px monospace';
    for (var i = 0; i < 8; i++) {
      var hx = (i * 42 + t * 25) % W;
      var hy = 159 + Math.sin(t * 2 + i) * 2;
      ctx.fillText('0x' + ((i * 37 + Math.floor(t)) % 256).toString(16), Math.floor(hx), Math.floor(hy));
    }
    return;
  }

  // --- DEVELOPER ENCOUNTER: pixel art developer ---
  if (currentEventTitle.indexOf('Developer') !== -1 || currentEventTitle.indexOf('Mentor') !== -1) {
    var px = 200, py = 142;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    ctx.fillStyle = '#555555';
    ctx.fillRect(px - 1, py - 17, 6, 2);
    ctx.fillRect(px, py - 19, 4, 2);
    // Laptop
    ctx.fillStyle = '#AAAAAA';
    ctx.fillRect(px + 8, py - 8, 8, 6);
    ctx.fillStyle = '#55AAFF';
    ctx.fillRect(px + 9, py - 7, 6, 4);
    return;
  }

  // --- BUG REPORT: red danger tint ---
  if (currentEventTitle.indexOf('Bug') !== -1 || currentEventTitle.indexOf('Segfault') !== -1 || currentEventTitle.indexOf('Overflow') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.25)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#FF5555';
    ctx.font = '8px monospace';
    for (var i = 0; i < 6; i++) {
      var ex = 40 + Math.sin(t * 2 + i * 1.5) * 100;
      var ey = 30 + (i * 20 + t * 15) % 120;
      ctx.fillText('SEGFAULT', Math.floor(ex), Math.floor(ey));
    }
    var pulse = (Math.sin(t * 4) + 1) * 0.15;
    ctx.strokeStyle = 'rgba(255,0,0,' + pulse.toFixed(2) + ')';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    ctx.lineWidth = 1;
    return;
  }
// END OVERLAYS
