// TITLE
The Coderegon Trail - KittenTTS Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The mel spectrograms look crisp today...",
  "Your party hums at a comfortable twenty-four kilohertz...",
  "The phonemes are flowing smoothly through the pipeline...",
  "A gentle breeze carries the sound of eSpeak in the distance...",
  "The ONNX runtime is warm and the inference is fast...",
  "Your voice embeddings are well-aligned for the journey ahead...",
  "The text preprocessor found twelve numbers to expand — a good omen...",
  "The trail echoes with perfectly chunked sentences...",
  "Someone in the party is humming in IPA notation...",
  "The NumPy arrays are stacked neatly in the wagon...",
  "A fellow traveler waves — they are running the nano model on a Raspberry Pi...",
  "The attention weights are focused and the decoder is steady...",
  "Your party crosses a buffer boundary without dropping a single sample...",
  "The Hugging Face cache is warm — no downloads needed today...",
  "Eight voices ride with you: Bella, Jasper, Luna, Bruno, Rosie, Hugo, Kiki, and Leo...",
];
// END FLAVORS
// OVERLAYS
  // --- Dependency Storm: swirling config files and lightning ---
  if (currentEventTitle.indexOf('Dependency Storm') !== -1) {
    // Dark storm sky
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 320, 200);
    // Lightning bolt
    var lx = 160 + Math.sin(t * 3) * 40;
    if (Math.floor(t * 4) % 3 === 0) {
      ctx.strokeStyle = '#FFFF00';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx - 10, 60);
      ctx.lineTo(lx + 15, 65);
      ctx.lineTo(lx - 5, 130);
      ctx.stroke();
    }
    // Falling config.json files
    ctx.fillStyle = '#88CCFF';
    for (var i = 0; i < 6; i++) {
      var fx = (i * 57 + t * 40) % 320;
      var fy = (i * 43 + t * 60) % 200;
      ctx.fillRect(fx, fy, 16, 20);
      ctx.fillStyle = '#334455';
      ctx.fillRect(fx + 2, fy + 4, 12, 2);
      ctx.fillRect(fx + 2, fy + 8, 10, 2);
      ctx.fillRect(fx + 2, fy + 12, 12, 2);
      ctx.fillStyle = '#88CCFF';
    }
    // Storm clouds
    ctx.fillStyle = '#333355';
    for (var ci = 0; ci < 4; ci++) {
      var cx = ci * 90 + Math.sin(t + ci) * 10;
      ctx.beginPath();
      ctx.arc(cx, 30, 35, 0, Math.PI * 2);
      ctx.arc(cx + 30, 25, 30, 0, Math.PI * 2);
      ctx.arc(cx + 15, 15, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  // --- Preprocessing Pioneer: text transforming on screen ---
  if (currentEventTitle.indexOf('Preprocessing Pioneer') !== -1) {
    ctx.fillStyle = '#2d1b00';
    ctx.fillRect(0, 0, 320, 200);
    // NPC traveler (simple pixel person)
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(80, 80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(74, 92, 12, 30);
    // Hat
    ctx.fillStyle = '#654321';
    ctx.fillRect(68, 66, 24, 6);
    ctx.fillRect(72, 60, 16, 8);
    // Speech bubble
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(110, 40, 190, 60);
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(110, 70);
    ctx.lineTo(96, 80);
    ctx.lineTo(110, 75);
    ctx.fill();
    // Transforming text animation
    ctx.fillStyle = '#333333';
    ctx.font = '10px monospace';
    var phase = Math.floor(t * 2) % 3;
    if (phase === 0) {
      ctx.fillText('$100 at 3:30pm', 118, 60);
      ctx.fillText('on the 1st', 118, 75);
    } else if (phase === 1) {
      ctx.fillText('one hundred dollars', 118, 60);
      ctx.fillText('at three thirty pm', 118, 75);
    } else {
      ctx.fillText('one hundred dollars', 118, 60);
      ctx.fillText('at three thirty pm', 118, 75);
      ctx.fillText('on the first', 118, 90);
    }
    // Ground
    ctx.fillStyle = '#3d2b00';
    ctx.fillRect(0, 160, 320, 40);
    return;
  }

  // --- Chunking Rapids: river with text chunks floating ---
  if (currentEventTitle.indexOf('Chunking Rapids') !== -1) {
    // Sky
    ctx.fillStyle = '#4488AA';
    ctx.fillRect(0, 0, 320, 80);
    // River
    ctx.fillStyle = '#2255AA';
    ctx.fillRect(0, 80, 320, 80);
    // River waves
    ctx.fillStyle = '#3366BB';
    for (var wi = 0; wi < 10; wi++) {
      var wx = (wi * 35 + t * 50) % 340 - 10;
      ctx.beginPath();
      ctx.arc(wx, 110 + Math.sin(t * 2 + wi) * 5, 18, 0, Math.PI);
      ctx.fill();
    }
    // Floating text chunks (like logs)
    ctx.fillStyle = '#DEB887';
    for (var ci = 0; ci < 3; ci++) {
      var chunkX = (ci * 120 + t * 30) % 380 - 30;
      var chunkY = 95 + Math.sin(t * 1.5 + ci * 2) * 8;
      ctx.fillRect(chunkX, chunkY, 60, 14);
      ctx.fillStyle = '#333333';
      ctx.font = '8px monospace';
      ctx.fillText('chunk ' + (ci + 1), chunkX + 6, chunkY + 10);
      ctx.fillStyle = '#DEB887';
    }
    // Banks
    ctx.fillStyle = '#228833';
    ctx.fillRect(0, 155, 320, 45);
    ctx.fillRect(0, 0, 320, 20);
    return;
  }

  // --- Phoneme Plague: emoji and strange characters raining down ---
  if (currentEventTitle.indexOf('Phoneme Plague') !== -1) {
    ctx.fillStyle = '#1a0a2e';
    ctx.fillRect(0, 0, 320, 200);
    // Falling unknown characters (represented as red squares with ?)
    ctx.font = '14px monospace';
    for (var pi = 0; pi < 12; pi++) {
      var px = (pi * 29 + Math.sin(t + pi) * 10) % 310;
      var py = (pi * 37 + t * 45) % 220 - 10;
      // Red warning box
      ctx.fillStyle = '#FF3333';
      ctx.fillRect(px, py, 18, 18);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('?', px + 4, py + 14);
    }
    // Healthy phonemes passing through (green)
    ctx.fillStyle = '#33FF66';
    ctx.font = '11px monospace';
    var phonemes = ['a', 'e', 'i', 'o', 'u', 'k', 't', 'p'];
    for (var hi = 0; hi < 5; hi++) {
      var hx = 40 + hi * 55;
      var hy = 150 + Math.sin(t * 2 + hi) * 10;
      ctx.fillText(phonemes[hi % phonemes.length], hx, hy);
    }
    // Pipeline arrow at bottom
    ctx.fillStyle = '#666688';
    ctx.fillRect(20, 180, 280, 4);
    ctx.beginPath();
    ctx.moveTo(300, 182);
    ctx.lineTo(290, 175);
    ctx.lineTo(290, 189);
    ctx.fill();
    return;
  }

  // --- Voice Vector Blizzard: snowflakes and voice waveforms ---
  if (currentEventTitle.indexOf('Voice Vector Blizzard') !== -1) {
    ctx.fillStyle = '#DDEEFF';
    ctx.fillRect(0, 0, 320, 200);
    // Snowflakes
    ctx.fillStyle = '#FFFFFF';
    for (var si = 0; si < 30; si++) {
      var sx = (si * 11 + t * 20 + Math.sin(t + si * 0.5) * 15) % 320;
      var sy = (si * 7 + t * 35) % 200;
      var sr = 1 + (si % 3);
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
    // Voice waveform display
    ctx.strokeStyle = '#3355AA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var vx = 0; vx < 320; vx += 2) {
      var vy = 100 + Math.sin(vx * 0.05 + t * 3) * 25 * Math.sin(vx * 0.02);
      if (vx === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.stroke();
    // Voice name labels
    ctx.fillStyle = '#334466';
    ctx.font = '9px monospace';
    var voices = ['Bella', 'Jasper', 'Luna', 'Bruno', 'Rosie', 'Hugo', 'Kiki', 'Leo'];
    var activeV = Math.floor(t) % 8;
    for (var vi = 0; vi < 8; vi++) {
      ctx.fillStyle = vi === activeV ? '#FF4444' : '#334466';
      ctx.fillText(voices[vi], 10 + vi * 38, 170);
    }
    return;
  }

  // --- Streaming Scout: chunks flowing out of a wagon ---
  if (currentEventTitle.indexOf('Streaming Scout') !== -1) {
    // Prairie background
    ctx.fillStyle = '#88AA44';
    ctx.fillRect(0, 0, 320, 200);
    ctx.fillStyle = '#77BB55';
    ctx.fillRect(0, 140, 320, 60);
    // Sky
    ctx.fillStyle = '#88CCEE';
    ctx.fillRect(0, 0, 320, 100);
    // Scout on horseback (simplified)
    var horseX = 200 + Math.sin(t) * 5;
    // Horse body
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(horseX - 15, 110, 30, 18);
    // Horse legs
    ctx.fillRect(horseX - 12, 128, 5, 14);
    ctx.fillRect(horseX + 8, 128, 5, 14);
    // Horse head
    ctx.fillRect(horseX + 15, 100, 10, 16);
    // Rider
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(horseX, 100, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4444AA';
    ctx.fillRect(horseX - 5, 104, 10, 12);
    // Streaming audio chunks flowing from left
    ctx.fillStyle = '#33CC66';
    for (var ai = 0; ai < 4; ai++) {
      var ax = (ai * 45 + t * 60) % 180;
      var ay = 115 + Math.sin(t * 3 + ai) * 5;
      ctx.fillRect(ax, ay, 30, 8);
      ctx.fillStyle = '#226633';
      ctx.font = '6px monospace';
      ctx.fillText('WAV', ax + 5, ay + 6);
      ctx.fillStyle = '#33CC66';
    }
    return;
  }

  // --- Trailing Silence Trap: waveform with noisy end being trimmed ---
  if (currentEventTitle.indexOf('Trailing Silence') !== -1) {
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 320, 200);
    // Waveform - clean part
    ctx.strokeStyle = '#33FF66';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var wx = 0; wx < 220; wx += 2) {
      var wy = 100 + Math.sin(wx * 0.08 + t * 2) * 30 * (1 - wx / 300);
      if (wx === 0) ctx.moveTo(wx, wy);
      else ctx.lineTo(wx, wy);
    }
    ctx.stroke();
    // Waveform - noisy end (red, being trimmed)
    ctx.strokeStyle = '#FF3333';
    ctx.beginPath();
    for (var nx = 220; nx < 300; nx += 2) {
      var ny = 100 + (Math.random() - 0.5) * 40;
      if (nx === 220) ctx.moveTo(nx, ny);
      else ctx.lineTo(nx, ny);
    }
    ctx.stroke();
    // Scissors / trim line
    var trimX = 220 + Math.sin(t * 2) * 5;
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(trimX, 40);
    ctx.lineTo(trimX, 160);
    ctx.stroke();
    ctx.setLineDash([]);
    // Label
    ctx.fillStyle = '#FFFF00';
    ctx.font = '10px monospace';
    ctx.fillText(':-5000]', trimX - 20, 35);
    // Label for clean part
    ctx.fillStyle = '#33FF66';
    ctx.fillText('speech', 90, 180);
    // Label for noise
    ctx.fillStyle = '#FF3333';
    ctx.fillText('artifacts', 240, 180);
    return;
  }
// END OVERLAYS
