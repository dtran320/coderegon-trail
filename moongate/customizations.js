// TITLE
The Coderegon Trail - Moongate Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The TCP accept loop awaits. Port 2593 is listening...",
  "Twofish encrypts the cipher table in 16-byte blocks...",
  "A client socket connects from the Kingdom of Britannia...",
  "The middleware pipeline processes another packet buffer...",
  "MemoryPack serializes the world snapshot to disk...",
  "The game loop ticks. 128 inbound packets dispatched...",
  "LoginSeedPacket arrives. Encryption negotiation begins...",
  "Your party crosses the Encryption River. XOR keys rotate...",
  "The PacketRegistry routes opcode 0x80 to LoginHandler...",
  "DryIoc resolves service dependencies from the container...",
  "A MoongateTCPClient receives its SessionId sequence number...",
  "The outbound writer thread signals. AutoResetEvent fires...",
  "Lua scripts extend NPC dialogue from the scripting engine...",
  "The SemaphoreSlim guards the snapshot file stream...",
  "You hear the distant hum of .NET 10 AOT compilation..."
];
// END FLAVORS
// OVERLAYS
  if (!currentEventType && !currentEventTitle) return;

  var t = (time || 0) * 0.001;

  // --- SYN FLOOD STORM: dark sky, lightning, cascading connection dots ---
  if (currentEventTitle.indexOf('SYN Flood Storm') !== -1) {
    ctx.fillStyle = 'rgba(0,0,50,0.45)';
    ctx.fillRect(0, 0, W, 110);
    var flashPhase = Math.sin(t * 1.7) + Math.sin(t * 3.1);
    if (flashPhase > 1.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
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
    // Cascading connection dots
    ctx.fillStyle = '#FF5555';
    for (var i = 0; i < 25; i++) {
      var rx = (i * 13.7 + t * 50) % W;
      var ry = (i * 19.3 + t * 70) % 110;
      ctx.globalAlpha = 0.5 + Math.sin(t * 3 + i) * 0.3;
      ctx.fillRect(Math.floor(rx), Math.floor(ry), 3, 3);
    }
    ctx.globalAlpha = 1.0;
    return;
  }

  // --- ENCRYPTION RIVER: deep blue rapids with hex digits ---
  if (currentEventTitle.indexOf('Encryption River') !== -1) {
    ctx.fillStyle = '#3355AA';
    for (var i = 0; i < 25; i++) {
      var sx = (i * 14 + t * 45) % W;
      var sy = 155 + Math.sin((i * 2.5 + t * 4)) * 4;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 5, 2);
    }
    // Floating hex digits
    ctx.fillStyle = '#55FFFF';
    ctx.font = '8px monospace';
    var hexChars = '0123456789ABCDEF';
    for (var i = 0; i < 8; i++) {
      var hx = (i * 40 + t * 25) % W;
      var hy = 152 + Math.sin(t * 2.5 + i * 1.3) * 5;
      var ch = hexChars[(Math.floor(t * 4 + i * 3)) % 16];
      ctx.fillText('0x' + ch + ch, Math.floor(hx), Math.floor(hy));
    }
    return;
  }

  // --- MIDDLEWARE DEVELOPER ENCOUNTER: person with chain links ---
  if (currentEventTitle.indexOf('Middleware Developer') !== -1) {
    var px = 200, py = 142;
    // Person
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Chain links (middleware pipeline)
    ctx.strokeStyle = '#AAAAAA';
    ctx.lineWidth = 1.5;
    for (var i = 0; i < 4; i++) {
      var cx = 215 + i * 12;
      ctx.beginPath();
      ctx.ellipse(cx, py - 8, 4, 6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Campfire
    var fx = 188, fy = 148;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(fx - 3, fy, 2, 3);
    ctx.fillRect(fx + 3, fy, 2, 3);
    ctx.fillStyle = '#FF5555';
    var flicker = Math.sin(t * 8) * 2;
    ctx.fillRect(fx - 1, fy - 3 + Math.floor(flicker * 0.3), 4, 3);
    ctx.fillStyle = '#FFFF55';
    ctx.fillRect(fx, fy - 5 + Math.floor(flicker * 0.5), 2, 2);
    return;
  }

  // --- SLOW DISPATCH BREAKDOWN: red danger, spinning clock ---
  if (currentEventTitle.indexOf('Slow Dispatch') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.25)';
    ctx.fillRect(0, 0, W, H);
    // Smoke from overheating
    ctx.fillStyle = '#555555';
    for (var i = 0; i < 12; i++) {
      var sx = 150 + Math.sin(i * 2.1 + t * 0.8) * 25;
      var sy = 120 - ((t * 15 + i * 12) % 80);
      var size = 2 + (i % 3);
      ctx.globalAlpha = 0.25 + Math.sin(t + i) * 0.15;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }
    ctx.globalAlpha = 1.0;
    // Spinning stopwatch
    var pulse = (Math.sin(t * 3) + 1) * 0.3;
    ctx.strokeStyle = 'rgba(255,85,85,' + (0.5 + pulse).toFixed(2) + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(160, 100, 14, 0, Math.PI * 2);
    ctx.stroke();
    // Spinning hand
    ctx.beginPath();
    ctx.moveTo(160, 100);
    ctx.lineTo(160 + Math.cos(t * 6) * 10, 100 + Math.sin(t * 6) * 10);
    ctx.stroke();
    ctx.lineWidth = 1;
    return;
  }

  // --- BRUTE FORCE BLIZZARD: snow, ice, login attempts ---
  if (currentEventTitle.indexOf('Brute Force Blizzard') !== -1) {
    ctx.fillStyle = 'rgba(0,0,50,0.55)';
    ctx.fillRect(0, 0, W, 110);
    // Lightning bolts
    for (var bolt = 0; bolt < 2; bolt++) {
      var flashPhase = Math.sin(t * (1.9 + bolt * 1.1)) + Math.sin(t * (2.7 + bolt));
      if (flashPhase > 1.5) {
        ctx.strokeStyle = '#FFFF55';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        var lx = 60 + bolt * 110 + Math.sin(t * 2 + bolt) * 25;
        ctx.moveTo(lx, 5);
        ctx.lineTo(lx - 4, 25);
        ctx.lineTo(lx + 6, 30);
        ctx.lineTo(lx - 2, 55);
        ctx.stroke();
      }
    }
    // Snow/password attempts falling
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '6px monospace';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 16.5 + t * 35) % W;
      var sy = (i * 13.7 + t * 45) % 110;
      ctx.globalAlpha = 0.4 + Math.sin(t * 2 + i) * 0.2;
      ctx.fillText('****', Math.floor(sx), Math.floor(sy));
    }
    ctx.globalAlpha = 1.0;
    return;
  }

  // --- GAME DESIGNER ENCOUNTER: person with game controller ---
  if (currentEventTitle.indexOf('Game Designer') !== -1) {
    var px = 195, py = 142;
    // Person
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#55AA55';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Game tick visualization (oscilloscope-style)
    ctx.strokeStyle = '#55FF55';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i = 0; i < 40; i++) {
      var wx = 210 + i;
      var wy = py - 8 + Math.sin(t * 4 + i * 0.5) * 5;
      if (i === 0) ctx.moveTo(wx, wy);
      else ctx.lineTo(wx, wy);
    }
    ctx.stroke();
    // Threshold line
    ctx.strokeStyle = '#FF5555';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(210, py - 14);
    ctx.lineTo(250, py - 14);
    ctx.stroke();
    ctx.setLineDash([]);
    return;
  }

  // --- CORRUPTED SNAPSHOT: red sky, broken file icon, data scatter ---
  if (currentEventTitle.indexOf('Corrupted Snapshot') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.2)';
    ctx.fillRect(0, 0, W, H);
    // Broken file icon
    ctx.strokeStyle = '#AAAAAA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 90);
    ctx.lineTo(150, 120);
    ctx.lineTo(170, 120);
    ctx.lineTo(170, 97);
    ctx.lineTo(163, 90);
    ctx.closePath();
    ctx.stroke();
    // Crack through the file
    ctx.strokeStyle = '#FF5555';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(148, 102);
    ctx.lineTo(155, 106);
    ctx.lineTo(152, 110);
    ctx.lineTo(162, 114);
    ctx.lineTo(158, 118);
    ctx.lineTo(172, 122);
    ctx.stroke();
    // Scattered data bits
    ctx.fillStyle = '#55AAFF';
    ctx.font = '7px monospace';
    for (var i = 0; i < 10; i++) {
      var dx = 130 + Math.sin(t + i * 1.7) * 50;
      var dy = 85 + Math.cos(t * 0.7 + i * 2.1) * 25;
      ctx.globalAlpha = 0.3 + Math.sin(t * 2 + i) * 0.2;
      ctx.fillText(i % 2 === 0 ? '01' : '10', Math.floor(dx), Math.floor(dy));
    }
    ctx.globalAlpha = 1.0;
    // Warning border pulse
    var pulse = (Math.sin(t * 4) + 1) * 0.1;
    ctx.strokeStyle = 'rgba(255,0,0,' + pulse.toFixed(2) + ')';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    ctx.lineWidth = 1;
    return;
  }
// END OVERLAYS
