// TITLE
The Coderegon Trail - cmux Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The app delegate finishes launching. Observers installed...",
  "Ghostty config loaded from ~/.config/ghostty/config...",
  "Key event swizzle intercepts a rogue performKeyEquivalent...",
  "A new workspace spawns in the sidebar. Terminal one of many...",
  "BonsplitController divides the pane. Left terminal, right browser...",
  "The Metal renderer redraws at sixty frames per second...",
  "A blue notification ring pulses on workspace three...",
  "The Unix socket accepts a new client connection...",
  "Port scanner coalesces kicks across all panels...",
  "Session persistence autosaves every eight seconds...",
  "The IME composing flag blocks performKeyEquivalent bypass...",
  "withExtendedLifetime keeps the workspace alive through ARC rapids...",
  "cmux.json custom commands load into the command palette...",
  "Cmd+Shift+U jumps to the latest unread notification...",
  "The sidebar shows git branch, PR status, and listening ports..."
];
// END FLAVORS
// OVERLAYS
  // --- CONFIG BLIZZARD: snow and cold wind ---
  if (currentEventTitle && currentEventTitle.indexOf('Configuration Blizzard') !== -1) {
    ctx.fillStyle = 'rgba(200,210,230,0.3)';
    ctx.fillRect(0, 0, W, 110);
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 30; i++) {
      var sx = (i * 37 + t * 40 * (1 + (i % 3) * 0.5)) % W;
      var sy = (i * 23 + t * 25 * (1 + (i % 2))) % 110;
      var size = 1 + (i % 3);
      ctx.fillRect(sx, sy, size, size);
    }
    // Wind lines
    ctx.strokeStyle = 'rgba(200,220,255,0.3)';
    ctx.lineWidth = 1;
    for (var w = 0; w < 5; w++) {
      var wy = 20 + w * 18;
      var wx = (t * 80 + w * 60) % (W + 40) - 20;
      ctx.beginPath();
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx + 30, wy - 2);
      ctx.stroke();
    }
  }

  // --- SWIFTUI FOCUS BUG: glitchy screen tearing effect ---
  if (currentEventTitle && currentEventTitle.indexOf('SwiftUI Focus Bug') !== -1) {
    // Horizontal glitch bars
    for (var g = 0; g < 6; g++) {
      var gy = Math.floor((Math.sin(t * 3.7 + g * 1.2) * 0.5 + 0.5) * 100);
      var gw = 20 + Math.sin(t * 5 + g) * 15;
      var gx = Math.floor(Math.sin(t * 2.3 + g * 0.7) * 30);
      ctx.fillStyle = 'rgba(0,255,100,' + (0.15 + Math.sin(t * 8 + g) * 0.1) + ')';
      ctx.fillRect(gx, gy, gw, 2);
    }
    // Static noise
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    for (var n = 0; n < 40; n++) {
      var nx = Math.floor(Math.random() * W);
      var ny = Math.floor(Math.random() * 110);
      ctx.fillRect(nx, ny, 1, 1);
    }
  }

  // --- ARC RAPIDS: rushing water ---
  if (currentEventTitle && currentEventTitle.indexOf('ARC Rapids') !== -1) {
    // River water
    ctx.fillStyle = 'rgba(0,80,200,0.25)';
    ctx.fillRect(0, 85, W, 25);
    // Wave crests
    ctx.strokeStyle = '#55AAFF';
    ctx.lineWidth = 1;
    for (var r = 0; r < 8; r++) {
      ctx.beginPath();
      var rx = (r * 40 - t * 50) % W;
      if (rx < 0) rx += W;
      ctx.moveTo(rx, 90 + Math.sin(t * 3 + r) * 3);
      ctx.lineTo(rx + 15, 88 + Math.sin(t * 3 + r + 1) * 3);
      ctx.lineTo(rx + 30, 90 + Math.sin(t * 3 + r + 2) * 3);
      ctx.stroke();
    }
    // Spray particles
    ctx.fillStyle = '#AADDFF';
    for (var s = 0; s < 10; s++) {
      var spx = (s * 31 + t * 35) % W;
      var spy = 82 + Math.sin(t * 4 + s * 1.5) * 5;
      ctx.fillRect(spx, spy, 2, 2);
    }
  }

  // --- SPLIT LAYOUT PLAGUE: falling blocks / broken grid ---
  if (currentEventTitle && currentEventTitle.indexOf('Split Layout Plague') !== -1) {
    ctx.strokeStyle = '#FF5555';
    ctx.lineWidth = 1;
    // Falling broken rectangles
    for (var p = 0; p < 8; p++) {
      var px = 20 + p * 35;
      var py = (t * 30 + p * 15) % 120;
      var pw = 10 + (p % 3) * 5;
      var ph = 8 + (p % 2) * 4;
      ctx.strokeRect(px, py, pw, ph);
      // Crack through the rectangle
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + pw, py + ph);
      ctx.stroke();
    }
  }

  // --- CLIPBOARD SANDSTORM: swirling particles ---
  if (currentEventTitle && currentEventTitle.indexOf('Clipboard Sandstorm') !== -1) {
    ctx.fillStyle = 'rgba(180,140,60,0.2)';
    ctx.fillRect(0, 0, W, 110);
    // Sand particles swirling
    ctx.fillStyle = '#CCAA55';
    for (var d = 0; d < 35; d++) {
      var angle = t * 1.5 + d * 0.4;
      var radius = 20 + d * 2 + Math.sin(t + d) * 10;
      var dx = W / 2 + Math.cos(angle) * radius;
      var dy = 55 + Math.sin(angle * 0.7) * 30;
      var ds = 1 + (d % 3);
      if (dx > 0 && dx < W && dy > 0 && dy < 110) {
        ctx.fillRect(dx, dy, ds, ds);
      }
    }
  }

  // --- NOTIFICATION SCOUT: blue pulsing rings ---
  if (currentEventTitle && currentEventTitle.indexOf('Notification Scout') !== -1) {
    // Pulsing blue notification rings
    for (var nr = 0; nr < 3; nr++) {
      var ringX = 60 + nr * 80;
      var ringY = 55;
      var ringPhase = t * 2.5 + nr * 2.1;
      var ringRadius = 8 + Math.sin(ringPhase) * 4;
      var ringAlpha = 0.3 + Math.sin(ringPhase) * 0.2;
      ctx.strokeStyle = 'rgba(0,145,255,' + ringAlpha + ')';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
      // Inner dot
      ctx.fillStyle = 'rgba(0,145,255,' + (ringAlpha + 0.2) + ')';
      ctx.beginPath();
      ctx.arc(ringX, ringY, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- SOCKET PATH OVERFLOW: cascading error text ---
  if (currentEventTitle && currentEventTitle.indexOf('Socket Path Overflow') !== -1) {
    ctx.font = '6px monospace';
    ctx.fillStyle = '#FF5555';
    var chars = '/tmp/cmux-debug-very-long-tag-name-that-exceeds-the-sockaddr-un-limit.sock';
    for (var c = 0; c < 5; c++) {
      var cx = 5;
      var cy = 15 + c * 18 + (t * 12 + c * 5) % 20;
      var visibleChars = chars.substring(0, Math.min(chars.length, Math.floor(t * 8 + c * 10) % (chars.length + 5)));
      ctx.fillText(visibleChars, cx, cy);
    }
    // Truncation marker
    var truncY = 95 + Math.sin(t * 3) * 5;
    ctx.fillStyle = '#FFFF55';
    ctx.font = '8px monospace';
    ctx.fillText('ENOBUFS: path too long!', 60, truncY);
  }
// END OVERLAYS
