// TITLE
The Coderegon Trail - miniDiffusion Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The VAE encoder compresses your image down to a sixteen-channel latent...",
  "CLIP and T5 embeddings fuse together to guide the diffusion transformer...",
  "Twenty-four DiT blocks process your noisy latents with joint attention...",
  "The logit-normal sampler picks a timestep right in the sweet spot of sigma...",
  "Your Euler solver takes another step along the probability flow ODE...",
  "Sinusoidal position embeddings orient each patch in the two-D grid...",
  "AdaLayerNormZero modulates hidden states with six learned parameters...",
  "The byte-level BPE tokenizer splits your prompt into subword pieces...",
  "RMSNorm stabilizes the query and key projections before attention...",
  "A fellow traveler shares their FID score — inception features look clean...",
  "The paged KV cache stores key-value pairs across attention layers...",
  "Dual attention layers give image tokens extra self-attention passes...",
  "The VAE decoder upsamples your sixteen-channel latent back to RGB...",
  "Pooled CLIP embeddings combine with the timestep to condition every layer...",
  "The noise schedule shifts sigmas leftward — training on medium noise pays off...",
];
// END FLAVORS
// OVERLAYS
  // --- UNICODE_BYTE_STORM: falling byte characters in a storm ---
  if (currentEventTitle.indexOf('Unicode Byte Storm') !== -1) {
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(0, 0, W, H);
    // Falling byte characters
    ctx.font = '9px monospace';
    var byteChars = ['\\xf0', '\\xa1', '\\xac', '\\xae', '\\xff', 'UTF-8', '<eos>', 'BPE', '\\x00', '\\x80'];
    for (var si = 0; si < 18; si++) {
      var sx = (si * 19 + t * 25 + Math.sin(t + si * 0.9) * 15) % W;
      var sy = (si * 13 + t * 40) % (H + 20) - 10;
      ctx.fillStyle = si % 4 === 0 ? '#FF6666' : si % 4 === 1 ? '#66FFAA' : si % 4 === 2 ? '#6688FF' : '#FFCC44';
      ctx.fillText(byteChars[si % byteChars.length], sx, sy);
    }
    // Lightning bolts
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    for (var li = 0; li < 3; li++) {
      if (Math.floor(t * 2 + li) % 5 === 0) {
        var lx = 50 + li * 100;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx + 10, 30);
        ctx.lineTo(lx - 5, 30);
        ctx.lineTo(lx + 15, 65);
        ctx.stroke();
      }
    }
    ctx.lineWidth = 1;
    // Byte map table
    ctx.fillStyle = '#111111';
    ctx.fillRect(80, H - 45, 160, 35);
    ctx.strokeStyle = '#44FF44';
    ctx.strokeRect(80, H - 45, 160, 35);
    ctx.fillStyle = '#44FF44';
    ctx.font = '7px monospace';
    ctx.fillText('to_utf_bytes(): 256 -> chars', 88, H - 30);
    ctx.fillText('byte_encoder[b] for b in UTF-8', 88, H - 18);
    return;
  }

  // --- PROMPT_ENGINEER: NPC with triple encoder diagram ---
  if (currentEventTitle.indexOf('Prompt Engineer') !== -1) {
    ctx.fillStyle = '#0e0a1a';
    ctx.fillRect(0, 0, W, H);
    // NPC figure
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(40, 80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6633AA';
    ctx.fillRect(34, 92, 12, 28);
    // Glasses
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(36, 78, 4, 0, Math.PI * 2);
    ctx.arc(44, 78, 4, 0, Math.PI * 2);
    ctx.stroke();
    // Triple encoder diagram
    ctx.fillStyle = '#111111';
    ctx.fillRect(75, 15, 235, 165);
    ctx.strokeStyle = '#8866FF';
    ctx.strokeRect(75, 15, 235, 165);
    ctx.font = '8px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Triple Text Encoding:', 85, 30);
    // Three encoder boxes
    var encoders = [
      { name: 'CLIP', dim: '768d', color: '#335588', y: 42 },
      { name: 'OpenCLIP', dim: '1280d', color: '#553388', y: 82 },
      { name: 'T5', dim: '4096d', color: '#885533', y: 122 }
    ];
    var numVisible = Math.min(3, Math.floor(t * 0.8) + 1);
    for (var ei = 0; ei < numVisible; ei++) {
      var enc = encoders[ei];
      ctx.fillStyle = enc.color;
      ctx.fillRect(85, enc.y, 90, 30);
      ctx.strokeStyle = '#AAAAAA';
      ctx.strokeRect(85, enc.y, 90, 30);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '7px monospace';
      ctx.fillText(enc.name, 90, enc.y + 13);
      ctx.fillStyle = '#AAAAAA';
      ctx.fillText(enc.dim, 90, enc.y + 24);
      // Arrow to concat
      ctx.strokeStyle = '#FFAA44';
      ctx.beginPath();
      ctx.moveTo(175, enc.y + 15);
      ctx.lineTo(210, enc.y + 15);
      ctx.stroke();
    }
    // Concat box
    if (numVisible >= 3) {
      ctx.fillStyle = '#446644';
      ctx.fillRect(215, 62, 85, 50);
      ctx.strokeStyle = '#66FF66';
      ctx.strokeRect(215, 62, 85, 50);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '7px monospace';
      ctx.fillText('cat + pad', 222, 78);
      ctx.fillText('-> 4096d', 222, 92);
      ctx.fillText('embeddings', 222, 106);
    }
    return;
  }

  // --- LATENT_SPACE_RAPIDS: river with floating latent vectors ---
  if (currentEventTitle.indexOf('Latent Space Rapids') !== -1) {
    // Sky
    ctx.fillStyle = '#0a1133';
    ctx.fillRect(0, 0, W, 60);
    // River
    ctx.fillStyle = '#0a1855';
    ctx.fillRect(0, 60, W, 100);
    // Waves
    ctx.fillStyle = '#1a3388';
    for (var wi = 0; wi < 14; wi++) {
      var wx = (wi * 25 + t * 35) % (W + 20) - 10;
      ctx.beginPath();
      ctx.arc(wx, 105 + Math.sin(t * 2 + wi) * 6, 14, 0, Math.PI);
      ctx.fill();
    }
    // Floating latent channel numbers
    ctx.font = '8px monospace';
    for (var vi = 0; vi < 8; vi++) {
      var vx = (vi * 42 + t * 25) % (W + 30) - 15;
      var vy = 75 + Math.sin(t * 1.5 + vi * 1.4) * 15;
      ctx.fillStyle = vi < 4 ? '#88FFAA' : '#FF8888';
      var label = vi < 4 ? 'mu[' + vi + ']' : 'lv[' + (vi - 4) + ']';
      ctx.fillText(label, vx, vy);
    }
    // Reparameterization formula
    ctx.fillStyle = '#FFFF66';
    ctx.font = '9px monospace';
    var fAlpha = 0.5 + Math.sin(t * 2) * 0.3;
    ctx.globalAlpha = fAlpha;
    ctx.fillText('z = mean + eps * std', 100, 45);
    ctx.globalAlpha = 1.0;
    // Banks
    ctx.fillStyle = '#223322';
    ctx.fillRect(0, 155, W, 45);
    return;
  }

  // --- SIGMA_SCHEDULE_COLLAPSE: histogram of timestep distribution ---
  if (currentEventTitle.indexOf('Sigma Schedule') !== -1) {
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, W, H);
    // Title
    ctx.font = '9px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Timestep Sampling Distribution', 70, 18);
    // Draw logit-normal curve
    ctx.strokeStyle = '#33FF33';
    ctx.lineWidth = 2;
    ctx.beginPath();
    var started = false;
    for (var xi = 0; xi < 280; xi++) {
      var xt = xi / 280;
      if (xt < 0.01 || xt > 0.99) continue;
      var logit = Math.log(xt / (1 - xt));
      var pdf = Math.exp(-logit * logit / 2) / (xt * (1 - xt) * 2.507);
      var py = 160 - pdf * 70;
      var px = 20 + xi;
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
    // Uniform comparison (flat line)
    ctx.strokeStyle = '#FF3333';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(20, 140);
    ctx.lineTo(300, 140);
    ctx.stroke();
    ctx.setLineDash([]);
    // Labels
    ctx.font = '7px monospace';
    ctx.fillStyle = '#33FF33';
    ctx.fillText('logit-normal', 230, 85);
    ctx.fillStyle = '#FF3333';
    ctx.fillText('uniform', 250, 135);
    // Axis labels
    ctx.fillStyle = '#AAAAAA';
    ctx.fillText('t=0 (clean)', 20, H - 5);
    ctx.fillText('t=1 (noise)', 250, H - 5);
    // Animated sampling dot
    var dotX = 20 + (140 + Math.sin(t * 1.5) * 60);
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(dotX, 160 - 35, 4, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // --- POSITION_EMBEDDING_FOG: patches in fog with sinusoidal waves ---
  if (currentEventTitle.indexOf('Position Embedding Fog') !== -1) {
    // Foggy sky
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(0, 0, W, H);
    // Fog layers
    for (var fi = 0; fi < 6; fi++) {
      ctx.fillStyle = 'rgba(100,100,140,' + (0.08 + fi * 0.02) + ')';
      var fy = 20 + fi * 28 + Math.sin(t * 0.5 + fi) * 8;
      ctx.fillRect(0, fy, W, 20);
    }
    // Patch grid
    var gridSize = 6;
    var cellW = 30;
    var cellH = 22;
    var startX = (W - gridSize * cellW) / 2;
    var startY = 30;
    ctx.font = '6px monospace';
    var numRevealed = Math.min(gridSize * gridSize, Math.floor(t * 4));
    for (var py = 0; py < gridSize; py++) {
      for (var px = 0; px < gridSize; px++) {
        var idx = py * gridSize + px;
        if (idx >= numRevealed) continue;
        var cx = startX + px * cellW;
        var cy = startY + py * cellH;
        // Patch box
        var bright = 30 + Math.floor(Math.sin(t + px * 0.5 + py * 0.7) * 20 + 20);
        ctx.fillStyle = 'rgb(' + bright + ',' + (bright + 20) + ',' + (bright + 50) + ')';
        ctx.fillRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
        ctx.strokeStyle = '#5566AA';
        ctx.strokeRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
        // Patch coordinates
        ctx.fillStyle = '#AADDFF';
        ctx.fillText(px + ',' + py, cx + 8, cy + 14);
      }
    }
    // Sincos label
    ctx.fillStyle = '#FFCC44';
    ctx.font = '8px monospace';
    ctx.fillText('2D sincos pos_embed', 100, H - 12);
    return;
  }

  // --- DIFFUSION_RESEARCHER: final block architecture diagram ---
  if (currentEventTitle.indexOf('Diffusion Researcher') !== -1) {
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, W, H);
    // NPC researcher
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(30, 100, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(25, 110, 10, 22);
    // Lab coat
    ctx.strokeStyle = '#AAAAAA';
    ctx.strokeRect(23, 110, 14, 22);
    // Block comparison diagram
    ctx.fillStyle = '#111111';
    ctx.fillRect(60, 10, 250, 180);
    ctx.strokeStyle = '#6688CC';
    ctx.strokeRect(60, 10, 250, 180);
    ctx.font = '8px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Block 0-22 vs Block 23 (final)', 75, 25);
    // Regular block
    ctx.fillStyle = '#334455';
    ctx.fillRect(70, 35, 100, 65);
    ctx.strokeStyle = '#5588BB';
    ctx.strokeRect(70, 35, 100, 65);
    ctx.fillStyle = '#88BBFF';
    ctx.font = '7px monospace';
    ctx.fillText('AdaLNZero', 78, 48);
    ctx.fillText('JointAttn', 78, 60);
    ctx.fillText('FF + FF_ctx', 78, 72);
    ctx.fillText('ctx -> next', 78, 84);
    // Arrow
    ctx.fillStyle = '#FFAA44';
    ctx.font = '14px monospace';
    ctx.fillText('>', 180, 70);
    // Final block
    var finalVis = t > 1.5;
    if (finalVis) {
      ctx.fillStyle = '#553322';
      ctx.fillRect(200, 35, 100, 65);
      ctx.strokeStyle = '#FF8844';
      ctx.strokeRect(200, 35, 100, 65);
      ctx.fillStyle = '#FFBB88';
      ctx.font = '7px monospace';
      ctx.fillText('AdaLNCont', 208, 48);
      ctx.fillText('JointAttn', 208, 60);
      ctx.fillText('FF only', 208, 72);
      ctx.fillText('ctx -> None', 208, 84);
    }
    // Labels
    ctx.fillStyle = '#AAAAAA';
    ctx.font = '7px monospace';
    ctx.fillText('Blocks 0-22:', 70, 112);
    ctx.fillText('- AdaLayerNormZero (6 params)', 70, 124);
    ctx.fillText('- Context FF + residual', 70, 136);
    if (finalVis) {
      ctx.fillStyle = '#FFAA66';
      ctx.fillText('Block 23 (final):', 70, 152);
      ctx.fillText('- AdaLayerNormContinuous', 70, 164);
      ctx.fillText('- No context FF, ctx=None', 70, 176);
    }
    return;
  }
// END OVERLAYS
