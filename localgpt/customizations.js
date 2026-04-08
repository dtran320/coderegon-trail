// TITLE
The Coderegon Trail - LocalGPT Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The TurnGate semaphore is green — your wagon rolls forward...",
  "Memory chunks are indexing smoothly at four hundred tokens each...",
  "The Anthropic API responds with a warm two hundred status...",
  "Your SOUL.md is intact and the agent knows who it is...",
  "A gentle breeze carries the hum of an Ollama server in the distance...",
  "The JSONL session file saves cleanly — no corruption today...",
  "Your party crosses a compaction boundary without losing any memories...",
  "The workspace lock releases and the next request flows through...",
  "Someone in the party is editing HEARTBEAT.md by hand...",
  "The failover provider chain is fully configured — three models deep...",
  "A fellow traveler waves — they are running inference on a local GPU...",
  "The content delimiters are holding strong against injection attempts...",
  "Your context window has plenty of headroom — only forty percent used...",
  "The loop detector is quiet — no repeated tool calls today...",
  "The MMR re-ranker surfaces diverse memories from across your workspace...",
];
// END FLAVORS
// OVERLAYS
  // --- Borrow Checker Blizzard: snowflakes with lifetime annotations ---
  if (currentEventTitle.indexOf('Borrow Checker') !== -1) {
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(0, 0, 320, 200);
    // Snowflakes with lifetime symbols
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '10px monospace';
    var lifetimes = ["'a", "'b", "'static", "&mut", "&self", "Arc<>"];
    for (var si = 0; si < 20; si++) {
      var sx = (si * 17 + t * 25 + Math.sin(t + si * 0.7) * 20) % 320;
      var sy = (si * 11 + t * 40) % 220 - 10;
      ctx.fillStyle = si % 3 === 0 ? '#FF6666' : '#BBDDFF';
      ctx.fillText(lifetimes[si % lifetimes.length], sx, sy);
    }
    // Error message at bottom
    ctx.fillStyle = '#FF4444';
    ctx.font = '9px monospace';
    var errPhase = Math.floor(t) % 3;
    if (errPhase === 0) ctx.fillText('error[E0505]: cannot move out of borrowed content', 10, 185);
    else if (errPhase === 1) ctx.fillText('error[E0382]: use of moved value: `session`', 10, 185);
    else ctx.fillText('error[E0597]: `agent` does not live long enough', 10, 185);
    // Ground
    ctx.fillStyle = '#1a1a3e';
    ctx.fillRect(0, 190, 320, 10);
    return;
  }

  // --- Memory Architect: NPC with file tree ---
  if (currentEventTitle.indexOf('Memory Architect') !== -1) {
    ctx.fillStyle = '#1a0f00';
    ctx.fillRect(0, 0, 320, 200);
    // NPC
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(70, 80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#556B2F';
    ctx.fillRect(64, 92, 12, 30);
    // Hat
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(58, 66, 24, 6);
    ctx.fillRect(62, 58, 16, 10);
    // File tree display
    ctx.fillStyle = '#222222';
    ctx.fillRect(120, 30, 180, 140);
    ctx.strokeStyle = '#33FF66';
    ctx.strokeRect(120, 30, 180, 140);
    ctx.fillStyle = '#33FF66';
    ctx.font = '9px monospace';
    var files = ['~/.localgpt/', '  SOUL.md', '  MEMORY.md', '  HEARTBEAT.md', '  IDENTITY.md', '  USER.md', '  memory/', '    2026-04-08.md'];
    var visibleCount = Math.min(files.length, Math.floor(t * 1.5) + 1);
    for (var fi = 0; fi < visibleCount; fi++) {
      ctx.fillText(files[fi], 128, 48 + fi * 16);
    }
    // Ground
    ctx.fillStyle = '#2d1b00';
    ctx.fillRect(0, 170, 320, 30);
    return;
  }

  // --- Embedding Rapids: river with floating vectors ---
  if (currentEventTitle.indexOf('Embedding Rapids') !== -1) {
    // Sky
    ctx.fillStyle = '#334466';
    ctx.fillRect(0, 0, 320, 70);
    // River
    ctx.fillStyle = '#1a3366';
    ctx.fillRect(0, 70, 320, 90);
    // Waves
    ctx.fillStyle = '#2244AA';
    for (var wi = 0; wi < 12; wi++) {
      var wx = (wi * 30 + t * 45) % 340 - 10;
      ctx.beginPath();
      ctx.arc(wx, 110 + Math.sin(t * 2 + wi) * 6, 16, 0, Math.PI);
      ctx.fill();
    }
    // Floating vector numbers
    ctx.font = '8px monospace';
    for (var vi = 0; vi < 5; vi++) {
      var vx = (vi * 70 + t * 35) % 360 - 20;
      var vy = 85 + Math.sin(t * 1.5 + vi * 2) * 10;
      ctx.fillStyle = '#88FFAA';
      var val = (Math.sin(t + vi * 1.3) * 0.5).toFixed(3);
      ctx.fillText('[' + val + ']', vx, vy);
    }
    // Banks
    ctx.fillStyle = '#225522';
    ctx.fillRect(0, 155, 320, 45);
    ctx.fillRect(0, 0, 320, 15);
    return;
  }

  // --- Prompt Injection Attack: red warning with malicious text ---
  if (currentEventTitle.indexOf('Prompt Injection') !== -1) {
    ctx.fillStyle = '#1a0000';
    ctx.fillRect(0, 0, 320, 200);
    // Malicious text falling
    ctx.font = '8px monospace';
    var injections = ['IGNORE ABOVE', 'NEW INSTRUCTIONS:', 'sudo rm -rf /', 'OVERRIDE SAFETY', 'DISREGARD RULES'];
    for (var ii = 0; ii < 8; ii++) {
      var ix = (ii * 43 + Math.sin(t + ii) * 15) % 310;
      var iy = (ii * 31 + t * 50) % 220 - 10;
      ctx.fillStyle = '#FF3333';
      ctx.fillText(injections[ii % injections.length], ix, iy);
    }
    // XML shield in center
    ctx.fillStyle = '#33FF66';
    ctx.font = '10px monospace';
    ctx.fillText('<tool_output>', 100, 90);
    ctx.fillText('  DATA ONLY', 110, 106);
    ctx.fillText('</tool_output>', 100, 122);
    // Shield glow
    ctx.strokeStyle = '#33FF66';
    ctx.lineWidth = 2;
    ctx.strokeRect(90, 75, 150, 55);
    var glowAlpha = 0.3 + Math.sin(t * 3) * 0.2;
    ctx.strokeStyle = 'rgba(51, 255, 102, ' + glowAlpha + ')';
    ctx.lineWidth = 4;
    ctx.strokeRect(86, 71, 158, 63);
    return;
  }

  // --- Infinite Tool Loop: spinning gears ---
  if (currentEventTitle.indexOf('Infinite Tool Loop') !== -1) {
    ctx.fillStyle = '#111122';
    ctx.fillRect(0, 0, 320, 200);
    // Spinning gears
    for (var gi = 0; gi < 3; gi++) {
      var gx = 80 + gi * 80;
      var gy = 100;
      var gAngle = t * (2 + gi * 0.5);
      ctx.strokeStyle = gi === 1 ? '#FF4444' : '#666688';
      ctx.lineWidth = 3;
      // Gear teeth
      for (var tooth = 0; tooth < 8; tooth++) {
        var tAngle = gAngle + tooth * Math.PI / 4;
        var innerR = 20;
        var outerR = 30;
        ctx.beginPath();
        ctx.moveTo(gx + Math.cos(tAngle) * innerR, gy + Math.sin(tAngle) * innerR);
        ctx.lineTo(gx + Math.cos(tAngle) * outerR, gy + Math.sin(tAngle) * outerR);
        ctx.stroke();
      }
      // Gear circle
      ctx.beginPath();
      ctx.arc(gx, gy, 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Loop counter
    ctx.fillStyle = '#FF4444';
    ctx.font = '12px monospace';
    var loopCount = Math.floor(t * 3) % 99;
    ctx.fillText('web_search(' + loopCount + ')', 100, 170);
    ctx.fillStyle = '#FFFF44';
    ctx.font = '9px monospace';
    ctx.fillText('STUCK LOOP DETECTED', 105, 185);
    return;
  }

  // --- Context Window Overflow: rising token flood ---
  if (currentEventTitle.indexOf('Context Window') !== -1) {
    // Background gradient effect
    ctx.fillStyle = '#0a0a22';
    ctx.fillRect(0, 0, 320, 200);
    // Rising token flood
    var waterLevel = 160 - Math.min(120, t * 15);
    ctx.fillStyle = '#2244AA';
    ctx.fillRect(0, waterLevel, 320, 200 - waterLevel);
    // Floating token labels
    ctx.font = '7px monospace';
    ctx.fillStyle = '#88BBFF';
    for (var ti = 0; ti < 10; ti++) {
      var tx = (ti * 35 + t * 20) % 320;
      var ty = waterLevel + 5 + (ti * 11) % (200 - waterLevel);
      if (ty < 200) ctx.fillText('tok', tx, ty);
    }
    // Context bar at top
    ctx.fillStyle = '#333333';
    ctx.fillRect(20, 10, 280, 20);
    var fillWidth = Math.min(275, t * 30);
    ctx.fillStyle = fillWidth > 240 ? '#FF4444' : fillWidth > 180 ? '#FFAA00' : '#33FF66';
    ctx.fillRect(22, 12, fillWidth, 16);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '9px monospace';
    ctx.fillText('context: ' + Math.min(100, Math.floor(t * 11)) + '%', 110, 24);
    // Threshold lines
    ctx.strokeStyle = '#FFFF00';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(210, 10);
    ctx.lineTo(210, 30);
    ctx.stroke();
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(260, 10);
    ctx.lineTo(260, 30);
    ctx.stroke();
    ctx.setLineDash([]);
    // Labels
    ctx.fillStyle = '#FFFF00';
    ctx.font = '7px monospace';
    ctx.fillText('soft', 200, 42);
    ctx.fillStyle = '#FF0000';
    ctx.fillText('hard', 250, 42);
    return;
  }
// END OVERLAYS
