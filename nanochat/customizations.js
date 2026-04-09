// TITLE
The Coderegon Trail - nanochat Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The BPE tokenizer crunches text smoothly at thirty-two thousand merges...",
  "Rotary embeddings spin your position vectors into perfect alignment...",
  "The residual stream flows clear and strong through all twenty-four layers...",
  "Flash Attention 3 hums on the Hopper GPU — memory-efficient and fast...",
  "Your Muon optimizer orthogonalizes gradients with five Polar Express steps...",
  "The KV cache prefill completes in a single pass — decode tokens stream out...",
  "A fellow traveler shares their wandb plots — validation BPB is dropping...",
  "The BOS-aligned dataloader packs documents with zero padding waste...",
  "Your softcap of fifteen smoothly squashes the logits — no infinities today...",
  "The smear gate mixes in bigram context from the previous token...",
  "Value embeddings from ResFormer gate open on alternating layers...",
  "Someone trained a depth-twelve model in five minutes for a quick experiment...",
  "The x0 lambda blends initial embeddings back, fighting representation collapse...",
  "Your party crosses a sliding window boundary — the final layer sees full context...",
  "The backout lambda subtracts mid-layer noise and the logits sharpen beautifully...",
];
// END FLAVORS
// OVERLAYS
  // --- VOCABULARY_BLIZZARD: falling BPE tokens in a snowstorm ---
  if (currentEventTitle.indexOf('Vocabulary Blizzard') !== -1) {
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(0, 0, W, H);
    // Falling token fragments
    ctx.font = '9px monospace';
    var tokens = ['<|bos|>', 'Ġthe', 'Ġof', '##ing', 'ĠÃ', '\\xf0', 'Ġ\\n', '<|unk|>', 'Ġhello', '0xff'];
    for (var si = 0; si < 18; si++) {
      var sx = (si * 19 + t * 20 + Math.sin(t + si * 0.9) * 15) % W;
      var sy = (si * 13 + t * 35) % (H + 20) - 10;
      ctx.fillStyle = si % 4 === 0 ? '#FF6666' : si % 4 === 1 ? '#66FF66' : si % 4 === 2 ? '#6666FF' : '#FFFF66';
      ctx.fillText(tokens[si % tokens.length], sx, sy);
    }
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var fi = 0; fi < 30; fi++) {
      var fx = (fi * 11 + t * 40 + Math.cos(t * 0.7 + fi) * 30) % W;
      var fy = (fi * 7 + t * 55) % (H + 10) - 5;
      ctx.fillRect(fx, fy, 2, 2);
    }
    // Ground
    ctx.fillStyle = '#1a1a3e';
    ctx.fillRect(0, H - 10, W, 10);
    return;
  }

  // --- DATA_WRANGLER: NPC with document packing visualization ---
  if (currentEventTitle.indexOf('Data Wrangler') !== -1) {
    ctx.fillStyle = '#1a1000';
    ctx.fillRect(0, 0, W, H);
    // NPC figure
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(60, 80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(54, 92, 12, 28);
    // Cowboy hat
    ctx.fillStyle = '#5C4033';
    ctx.fillRect(46, 66, 28, 5);
    ctx.fillRect(52, 58, 16, 10);
    // Document packing display
    ctx.fillStyle = '#111111';
    ctx.fillRect(100, 25, 210, 145);
    ctx.strokeStyle = '#44FF44';
    ctx.strokeRect(100, 25, 210, 145);
    ctx.font = '8px monospace';
    ctx.fillStyle = '#44FF44';
    ctx.fillText('BOS-aligned best-fit:', 108, 40);
    // Draw packed rows
    var colors = ['#335588', '#553388', '#885533', '#338855', '#883355'];
    for (var ri = 0; ri < 5; ri++) {
      var ry = 50 + ri * 22;
      // BOS marker
      ctx.fillStyle = '#FFFF00';
      ctx.fillRect(104, ry, 8, 14);
      ctx.fillStyle = '#000000';
      ctx.font = '6px monospace';
      ctx.fillText('B', 105, ry + 10);
      // Document blocks
      var px = 114;
      var visRow = Math.min(3, Math.floor(t * 0.8) + 1);
      if (ri < visRow) {
        for (var di = 0; di < 3; di++) {
          var dw = 30 + ((ri * 7 + di * 13) % 40);
          if (px + dw > 306) dw = 306 - px;
          if (dw > 0) {
            ctx.fillStyle = colors[(ri + di) % colors.length];
            ctx.fillRect(px, ry, dw, 14);
            px += dw + 2;
          }
        }
      }
    }
    ctx.font = '8px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText('100% utilization, ~35% cropped', 108, 165);
    // Ground
    ctx.fillStyle = '#2d1b00';
    ctx.fillRect(0, H - 25, W, 25);
    return;
  }

  // --- EMBEDDING_RAPIDS: river with floating dimension numbers ---
  if (currentEventTitle.indexOf('Embedding Dimension') !== -1) {
    // Sky
    ctx.fillStyle = '#1a2244';
    ctx.fillRect(0, 0, W, 65);
    // River
    ctx.fillStyle = '#0a2255';
    ctx.fillRect(0, 65, W, 95);
    // Waves
    ctx.fillStyle = '#1a44AA';
    for (var wi = 0; wi < 14; wi++) {
      var wx = (wi * 25 + t * 40) % (W + 20) - 10;
      ctx.beginPath();
      ctx.arc(wx, 110 + Math.sin(t * 2.5 + wi) * 5, 14, 0, Math.PI);
      ctx.fill();
    }
    // Floating embedding dimensions
    ctx.font = '7px monospace';
    for (var vi = 0; vi < 6; vi++) {
      var vx = (vi * 55 + t * 30) % (W + 30) - 15;
      var vy = 80 + Math.sin(t * 1.2 + vi * 1.8) * 12;
      ctx.fillStyle = '#88FFCC';
      var val = (Math.sin(t * 0.8 + vi * 1.1) * 0.7).toFixed(3);
      ctx.fillText('d' + (vi * 128) + ':' + val, vx, vy);
    }
    // RMS norm label
    ctx.fillStyle = '#FFFF66';
    ctx.font = '10px monospace';
    var normAlpha = 0.5 + Math.sin(t * 2) * 0.3;
    ctx.globalAlpha = normAlpha;
    ctx.fillText('RMS_NORM(x)', 120, 50);
    ctx.globalAlpha = 1.0;
    // Banks
    ctx.fillStyle = '#224422';
    ctx.fillRect(0, 155, W, 45);
    return;
  }

  // --- SLIDING_WINDOW_AMBUSH: alternating window pattern visualization ---
  if (currentEventTitle.indexOf('Sliding Window') !== -1) {
    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(0, 0, W, H);
    // Draw attention pattern grid
    ctx.font = '8px monospace';
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText('window_pattern = "SSSL"', 80, 18);
    // Layer blocks
    var pattern = ['S', 'S', 'S', 'L'];
    var layerColors = { 'S': '#553300', 'L': '#003355' };
    var layerLabels = { 'S': 'SHORT', 'L': 'FULL' };
    var numVisible = Math.min(12, Math.floor(t * 2) + 1);
    for (var li = 0; li < numVisible; li++) {
      var lx = 15 + (li % 4) * 75;
      var ly = 30 + Math.floor(li / 4) * 50;
      var ch = pattern[li % 4];
      // Force last layer to L
      if (li === 11) ch = 'L';
      ctx.fillStyle = layerColors[ch];
      ctx.fillRect(lx, ly, 65, 35);
      ctx.strokeStyle = ch === 'L' ? '#0088FF' : '#FF8800';
      ctx.strokeRect(lx, ly, 65, 35);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '7px monospace';
      ctx.fillText('L' + li + ':' + layerLabels[ch], lx + 5, ly + 15);
      // Window size
      ctx.fillStyle = '#AAAAAA';
      ctx.font = '6px monospace';
      ctx.fillText(ch === 'L' ? 'w=2048' : 'w=512', lx + 12, ly + 28);
    }
    // Warning flash on last layer
    if (Math.floor(t * 3) % 2 === 0 && numVisible >= 12) {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.strokeRect(240, 130, 65, 35);
      ctx.lineWidth = 1;
    }
    return;
  }

  // --- GRADIENT_UNDERFLOW: precision bars draining ---
  if (currentEventTitle.indexOf('Gradient Underflow') !== -1) {
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, W, H);
    // Precision comparison bars
    ctx.font = '9px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Precision Management:', 80, 20);
    var dtypes = ['fp32 (master)', 'bf16 (compute)', 'fp8 (optional)'];
    var barColors = ['#33AA33', '#3388DD', '#DD8833'];
    var barWidths = [250, 200, 150];
    for (var bi = 0; bi < 3; bi++) {
      var by = 40 + bi * 45;
      // Label
      ctx.fillStyle = '#CCCCCC';
      ctx.font = '8px monospace';
      ctx.fillText(dtypes[bi], 10, by + 12);
      // Bar background
      ctx.fillStyle = '#222222';
      ctx.fillRect(10, by + 18, 260, 16);
      // Bar fill (animated)
      var bw = Math.min(barWidths[bi], t * 40);
      ctx.fillStyle = barColors[bi];
      ctx.fillRect(10, by + 18, bw, 16);
    }
    // Gradient arrows flowing
    ctx.strokeStyle = '#FF4444';
    ctx.lineWidth = 2;
    for (var gi = 0; gi < 5; gi++) {
      var gx = (gi * 65 + t * 50) % (W + 20) - 10;
      ctx.beginPath();
      ctx.moveTo(gx, 170);
      ctx.lineTo(gx + 15, 170);
      ctx.lineTo(gx + 12, 166);
      ctx.moveTo(gx + 15, 170);
      ctx.lineTo(gx + 12, 174);
      ctx.stroke();
    }
    // Label
    ctx.fillStyle = '#FF6666';
    ctx.font = '8px monospace';
    ctx.fillText('weight.to(dtype=x.dtype)  # cast in forward', 40, H - 8);
    return;
  }

  // --- CALCULATOR_MISFIRE: malicious eval expressions ---
  if (currentEventTitle.indexOf('Calculator Tool') !== -1) {
    ctx.fillStyle = '#1a0000';
    ctx.fillRect(0, 0, W, H);
    // Python REPL terminal
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(20, 15, 280, 130);
    ctx.strokeStyle = '#33FF33';
    ctx.strokeRect(20, 15, 280, 130);
    ctx.font = '8px monospace';
    // Malicious expressions falling
    var evilExprs = ['__import__("os")', 'exec("rm -rf /")', 'open("/etc/passwd")', 'eval(input())', 'globals()["key"]'];
    for (var ei = 0; ei < 5; ei++) {
      var ey = 30 + ei * 22;
      var vis = Math.floor(t * 1.5) > ei;
      if (vis) {
        ctx.fillStyle = '#FF3333';
        ctx.fillText('>>> ' + evilExprs[ei], 28, ey);
        // Blocked indicator
        ctx.fillStyle = '#33FF33';
        ctx.fillText(' => BLOCKED', 200, ey);
      }
    }
    // Safe expression at bottom
    if (t > 4) {
      ctx.fillStyle = '#66FF66';
      ctx.fillText(">>> 'strawberry'.count('r')", 28, 135);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(' => 3', 220, 135);
    }
    // Shield
    ctx.strokeStyle = '#33FF33';
    ctx.lineWidth = 2;
    var shieldGlow = 0.4 + Math.sin(t * 3) * 0.2;
    ctx.globalAlpha = shieldGlow;
    ctx.strokeRect(16, 11, 288, 138);
    ctx.globalAlpha = 1.0;
    ctx.lineWidth = 1;
    // Label
    ctx.fillStyle = '#FFFF44';
    ctx.font = '9px monospace';
    ctx.fillText('SANDBOX: __builtins__={}  timeout=3s', 50, H - 12);
    return;
  }
// END OVERLAYS
