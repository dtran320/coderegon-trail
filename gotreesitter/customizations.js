// TITLE
The Coderegon Trail - GoTreeSitter Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The grammar blob decompresses. 206 languages at your fingertips...",
  "LexState transitions fire. The DFA walks character by character...",
  "ASCII fast-path: one lookup, one transition. No scanning needed...",
  "The lexer skips whitespace tokens. Real symbols emerge from the stream...",
  "Parse tables loaded. Shift, reduce, accept, recover — the four actions...",
  "GLR stacks fork on ambiguity. Two paths diverge in a parse table...",
  "The arena slab allocates another 2MB. Nodes pour in without GC pressure...",
  "Reduce action fires. Children collapse into a parent node...",
  "Pre-goto state recorded. Incremental reparse will use this later...",
  "A keyword token matches. The reserved word set confirms it...",
  "Recovery state found. The parser inserts a missing token and continues...",
  "The tree cursor descends. GotoFirstChild returns true...",
  "Query patterns compile. Root symbol index built for fast matching...",
  "External scanner checkpoint saved. Template literal state preserved...",
  "Subtree reused. 40,000 bytes of unchanged nodes skip re-parsing..."
];
// END FLAVORS
// OVERLAYS
  // --- SYMBOL STORM: cascading symbols rain from the sky ---
  if (currentEventTitle.indexOf('Symbol Storm') !== -1) {
    // Darken sky
    ctx.fillStyle = 'rgba(0,0,40,0.4)';
    ctx.fillRect(0, 0, W, 110);
    // Lightning flash (periodic)
    var flashPhase = Math.sin(t * 2.1) + Math.sin(t * 3.7);
    if (flashPhase > 1.5) {
      ctx.fillStyle = 'rgba(200,255,200,0.3)';
      ctx.fillRect(0, 0, W, H);
      // Lightning bolt
      ctx.strokeStyle = '#55FF55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      var lx = 90 + Math.sin(t * 1.9) * 70;
      ctx.moveTo(lx, 8);
      ctx.lineTo(lx - 6, 30);
      ctx.lineTo(lx + 7, 32);
      ctx.lineTo(lx - 4, 58);
      ctx.lineTo(lx + 9, 60);
      ctx.lineTo(lx + 1, 90);
      ctx.stroke();
    }
    // Falling symbol characters
    ctx.fillStyle = '#55FF55';
    ctx.font = '8px monospace';
    var symbols = ['S', 'R', 'A', 'E', '{', '}', '(', ')', ';', '+'];
    for (var i = 0; i < 25; i++) {
      var sx = (i * 13.1 + t * 30) % W;
      var sy = (i * 17.3 + t * 80) % 110;
      ctx.fillText(symbols[i % symbols.length], Math.floor(sx), Math.floor(sy));
    }
    return;
  }

  // --- TOKEN STREAM CROSSING: rough rapids with token fragments ---
  if (currentEventTitle.indexOf('Token Stream Crossing') !== -1) {
    // Extra turbulence
    ctx.fillStyle = '#55FFFF';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 17 + t * 45) % W;
      var sy = 157 + Math.sin((i * 3 + t * 5)) * 3;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 4, 2);
    }
    // Floating token fragments
    ctx.fillStyle = '#FFFF55';
    ctx.font = '6px monospace';
    var tokens = ['func', 'if', 'for', '{', '}', 'EOF', 'nil', ':='];
    for (var i = 0; i < 5; i++) {
      var tx = (i * 65 + t * 20) % W;
      var ty = 156 + Math.sin(t * 2.5 + i * 1.3) * 3;
      ctx.fillText(tokens[i % tokens.length], Math.floor(tx), Math.floor(ty));
    }
    return;
  }

  // --- GLR FORK: two translucent stacks diverging ---
  if (currentEventTitle.indexOf('GLR Fork') !== -1) {
    // Draw two diverging parse stacks
    var cx = 160;
    var baseY = 145;
    // Left stack (shift path)
    ctx.strokeStyle = '#FF5555';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    var leftX = cx - 30 - Math.sin(t * 0.8) * 10;
    ctx.lineTo(leftX, baseY - 40);
    ctx.lineTo(leftX - 10, baseY - 60);
    ctx.stroke();
    // Stack boxes (left)
    ctx.fillStyle = 'rgba(255,85,85,0.6)';
    for (var i = 0; i < 3; i++) {
      ctx.fillRect(leftX - 15 + i * 2, baseY - 45 - i * 12, 10, 8);
    }
    // Right stack (reduce path)
    ctx.strokeStyle = '#5555FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    var rightX = cx + 30 + Math.sin(t * 0.8) * 10;
    ctx.lineTo(rightX, baseY - 40);
    ctx.lineTo(rightX + 10, baseY - 60);
    ctx.stroke();
    // Stack boxes (right)
    ctx.fillStyle = 'rgba(85,85,255,0.6)';
    for (var i = 0; i < 3; i++) {
      ctx.fillRect(rightX + 5 - i * 2, baseY - 45 - i * 12, 10, 8);
    }
    // Labels
    ctx.fillStyle = '#FF8888';
    ctx.font = '7px monospace';
    ctx.fillText('SHIFT', leftX - 18, baseY - 65);
    ctx.fillStyle = '#8888FF';
    ctx.fillText('REDUCE', rightX + 2, baseY - 65);
    // Fork point indicator
    ctx.fillStyle = '#FFFF55';
    ctx.beginPath();
    ctx.arc(cx, baseY, 3, 0, Math.PI * 2);
    ctx.fill();
    // Person standing at fork
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(cx - 1, baseY + 2, 2, 6);
    ctx.fillRect(cx - 3, baseY + 4, 6, 2);
    ctx.fillRect(cx - 1, baseY, 2, 2);
    return;
  }

  // --- ARENA OVERFLOW: memory blocks falling / stacking ---
  if (currentEventTitle.indexOf('Arena Overflow') !== -1) {
    // Draw slab blocks stacking up
    ctx.fillStyle = 'rgba(50,0,0,0.3)';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < 12; i++) {
      var bx = 40 + (i % 4) * 65;
      var by = 140 - Math.floor(i / 4) * 18 + Math.sin(t * 2 + i) * 3;
      // Slab block
      var hue = (i * 30 + t * 20) % 360;
      var r = Math.floor(128 + 60 * Math.sin(hue * 0.017));
      var g = Math.floor(128 + 60 * Math.sin((hue + 120) * 0.017));
      var b = Math.floor(128 + 60 * Math.sin((hue + 240) * 0.017));
      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(bx, by, 50, 12);
      // Label
      ctx.fillStyle = '#000';
      ctx.font = '6px monospace';
      ctx.fillText('2MB', bx + 16, by + 9);
    }
    // Warning text
    if (Math.sin(t * 3) > 0) {
      ctx.fillStyle = '#FF5555';
      ctx.font = '8px monospace';
      ctx.fillText('SLAB FULL', 120, 80);
    }
    return;
  }

  // --- INCREMENTAL REPARSE BLIZZARD: snow with tree fragments ---
  if (currentEventTitle.indexOf('Reparse Blizzard') !== -1) {
    // Darken sky
    ctx.fillStyle = 'rgba(20,20,50,0.4)';
    ctx.fillRect(0, 0, W, 110);
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 50; i++) {
      var fx = (i * 7.3 + t * 15 + Math.sin(i * 0.5) * 20) % W;
      var fy = (i * 11.7 + t * 40) % 120;
      var size = 1 + (i % 3);
      ctx.fillRect(Math.floor(fx), Math.floor(fy), size, size);
    }
    // Tree branch diagram (showing reuse)
    ctx.strokeStyle = '#55FF55';
    ctx.lineWidth = 1;
    // Trunk
    ctx.beginPath();
    ctx.moveTo(260, 100);
    ctx.lineTo(260, 70);
    ctx.stroke();
    // Reused branch (green)
    ctx.beginPath();
    ctx.moveTo(260, 80);
    ctx.lineTo(240, 60);
    ctx.stroke();
    ctx.fillStyle = '#55FF55';
    ctx.font = '5px monospace';
    ctx.fillText('reused', 224, 58);
    // Dirty branch (red, pulsing)
    ctx.strokeStyle = '#FF5555';
    ctx.beginPath();
    ctx.moveTo(260, 80);
    ctx.lineTo(280, 60 + Math.sin(t * 4) * 3);
    ctx.stroke();
    ctx.fillStyle = '#FF5555';
    ctx.fillText('dirty', 282, 58);
    return;
  }

  // --- QUERY PATTERN PIONEER: person with scroll ---
  if (currentEventTitle.indexOf('Query Pattern') !== -1) {
    var px = 200, py = 142;
    // Person
    ctx.fillStyle = '#FFAA55';
    ctx.fillRect(px, py - 8, 4, 4); // head
    ctx.fillRect(px, py - 4, 4, 8); // body
    ctx.fillRect(px - 2, py - 2, 2, 2); // left arm
    ctx.fillRect(px + 4, py - 2, 2, 2); // right arm
    ctx.fillRect(px, py + 4, 2, 4); // left leg
    ctx.fillRect(px + 2, py + 4, 2, 4); // right leg
    // Scroll in hand
    ctx.fillStyle = '#FFFFAA';
    ctx.fillRect(px + 6, py - 4, 12, 8);
    ctx.fillStyle = '#AA8855';
    ctx.fillRect(px + 6, py - 5, 12, 1);
    ctx.fillRect(px + 6, py + 4, 12, 1);
    // Query text on scroll
    ctx.fillStyle = '#554400';
    ctx.font = '4px monospace';
    ctx.fillText('(fn @n)', px + 7, py + 1);
    // Campfire
    var flicker = Math.sin(t * 8) * 2;
    ctx.fillStyle = '#FF5500';
    ctx.fillRect(px + 24, py + 2 + flicker, 4, 4);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px + 25, py + flicker, 2, 3);
    ctx.fillStyle = '#AA4400';
    ctx.fillRect(px + 22, py + 6, 8, 2);
    return;
  }

  // --- PURE GO BREAKTHROUGH: sunshine and clear skies ---
  if (currentEventTitle.indexOf('Pure Go Breakthrough') !== -1) {
    // Bright sun
    ctx.fillStyle = '#FFFF55';
    ctx.beginPath();
    ctx.arc(80, 30, 15, 0, Math.PI * 2);
    ctx.fill();
    // Sun rays
    ctx.strokeStyle = '#FFFF55';
    ctx.lineWidth = 1;
    for (var i = 0; i < 8; i++) {
      var angle = (i / 8) * Math.PI * 2 + t * 0.5;
      ctx.beginPath();
      ctx.moveTo(80 + Math.cos(angle) * 18, 30 + Math.sin(angle) * 18);
      ctx.lineTo(80 + Math.cos(angle) * 25, 30 + Math.sin(angle) * 25);
      ctx.stroke();
    }
    // Go gopher silhouette (simple)
    ctx.fillStyle = '#55CCFF';
    ctx.beginPath();
    ctx.arc(250, 130, 8, 0, Math.PI * 2);
    ctx.fill();
    // Eyes
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(248, 128, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(253, 128, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(248, 128, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(253, 128, 1, 0, Math.PI * 2);
    ctx.fill();
    // Body
    ctx.fillStyle = '#55CCFF';
    ctx.fillRect(244, 138, 12, 8);
    // Celebration text
    ctx.fillStyle = '#FFFF55';
    ctx.font = '7px monospace';
    var msgs = ['No CGo!', 'Pure Go!', 'go build!'];
    var msgIdx = Math.floor(t * 0.5) % msgs.length;
    ctx.fillText(msgs[msgIdx], 220, 120);
    return;
  }
// END OVERLAYS
