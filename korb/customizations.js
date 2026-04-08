// TITLE
The Coderegon Trail - Korb Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The terminal cursor blinks. Your grocery list is ready...",
  "Haskell compiles your order. No runtime exceptions today...",
  "The ExceptT monad carries your errors safely upstream...",
  "curl writes mTLS certificates to temp. The API awaits...",
  "Your REWE store is set. Zip code locked in...",
  "optparse-applicative parses your subcommands cleanly...",
  "The JWT payload decodes. Thirty seconds until expiry...",
  "Product search returns organic avocados. Filters applied...",
  "The basket version increments. Optimistic concurrency holds...",
  "A Siri shortcut appends oat milk to the shopping list...",
  "Template Haskell embeds the certificates at compile time...",
  "The suggestion engine ranks by purchase frequency...",
  "Lean 4 proofs verify the sorting invariants formally...",
  "Timeslot reserved. Pickup window confirmed...",
  "The agentic workflow orders groceries on your behalf..."
];
// END FLAVORS
// OVERLAYS
  // --- CLOUDFLARE STORM: dark sky, lightning, digital rain ---
  if (currentEventTitle.indexOf('Cloudflare Storm') !== -1) {
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
      ctx.lineTo(lx + 10, 65);
      ctx.lineTo(lx + 2, 95);
      ctx.stroke();
    }
    // Digital rain (matrix-style green chars)
    ctx.fillStyle = '#33FF33';
    ctx.font = '8px monospace';
    for (var i = 0; i < 20; i++) {
      var rx = (i * 16.1) % W;
      var ry = (i * 23.7 + t * 60) % 110;
      ctx.globalAlpha = 0.4 + Math.sin(t + i) * 0.2;
      ctx.fillText(String.fromCharCode(48 + (i * 7 + Math.floor(t * 3)) % 10), Math.floor(rx), Math.floor(ry));
    }
    ctx.globalAlpha = 1.0;
    return;
  }

  // --- PKCE RIVER: rough rapids with crypto symbols ---
  if (currentEventTitle.indexOf('PKCE River') !== -1) {
    ctx.fillStyle = '#55FFFF';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 17 + t * 40) % W;
      var sy = 157 + Math.sin((i * 3 + t * 5)) * 3;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 4, 2);
    }
    // Floating hash symbols
    ctx.fillStyle = '#FFFF55';
    ctx.font = '10px monospace';
    for (var i = 0; i < 5; i++) {
      var hx = (i * 65 + t * 20) % W;
      var hy = 155 + Math.sin(t * 2 + i) * 4;
      ctx.fillText('#', Math.floor(hx), Math.floor(hy));
    }
    return;
  }

  // --- HASKELL DEVELOPER ENCOUNTER: person with lambda hat ---
  if (currentEventTitle.indexOf('Haskell Developer') !== -1) {
    var px = 200, py = 142;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Lambda hat
    ctx.fillStyle = '#AA55FF';
    ctx.fillRect(px - 1, py - 17, 6, 2);
    ctx.fillRect(px, py - 19, 4, 2);
    // Campfire
    var fx = 212, fy = 148;
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

  // --- EXPIRED TOKEN: red danger, clock symbol ---
  if (currentEventTitle.indexOf('Expired Token') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.25)';
    ctx.fillRect(0, 0, W, H);
    // Smoke/steam rising
    ctx.fillStyle = '#555555';
    for (var i = 0; i < 15; i++) {
      var sx = 140 + Math.sin(i * 2.7 + t) * 30;
      var sy = 130 - ((t * 20 + i * 15) % 90);
      var size = 2 + (i % 3);
      ctx.globalAlpha = 0.3 + Math.sin(t + i) * 0.15;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }
    ctx.globalAlpha = 1.0;
    // Pulsing clock outline
    var pulse = (Math.sin(t * 3) + 1) * 0.3;
    ctx.strokeStyle = 'rgba(255,85,85,' + pulse.toFixed(2) + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(160, 100, 12, 0, Math.PI * 2);
    ctx.stroke();
    // Clock hands
    ctx.beginPath();
    ctx.moveTo(160, 100);
    ctx.lineTo(160, 92);
    ctx.moveTo(160, 100);
    ctx.lineTo(166, 100);
    ctx.stroke();
    ctx.lineWidth = 1;
    return;
  }

  // --- TYPE STORM: blizzard with type annotations ---
  if (currentEventTitle.indexOf('Type Storm') !== -1) {
    ctx.fillStyle = 'rgba(0,0,50,0.55)';
    ctx.fillRect(0, 0, W, 110);
    for (var bolt = 0; bolt < 3; bolt++) {
      var flashPhase = Math.sin(t * (1.7 + bolt * 0.9)) + Math.sin(t * (3.1 + bolt * 1.3));
      if (flashPhase > 1.5) {
        ctx.strokeStyle = '#FFFF55';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        var lx = 50 + bolt * 90 + Math.sin(t * 2.3 + bolt) * 30;
        ctx.moveTo(lx, 5);
        ctx.lineTo(lx - 4, 25);
        ctx.lineTo(lx + 6, 30);
        ctx.lineTo(lx - 2, 55);
        ctx.stroke();
      }
    }
    // Snow/type annotations falling
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 30; i++) {
      var sx = (i * 11 + t * 30) % W;
      var sy = (i * 17 + t * 40) % 110;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 2, 2);
    }
    return;
  }

  // --- SMART SHOPPER: person with shopping cart ---
  if (currentEventTitle.indexOf('Smart Shopper') !== -1) {
    var px = 195, py = 142;
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px, py - 12, 4, 8);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(px, py - 15, 4, 3);
    ctx.fillRect(px - 1, py - 4, 2, 5);
    ctx.fillRect(px + 3, py - 4, 2, 5);
    // Shopping cart
    ctx.strokeStyle = '#AAAAAA';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(208, py - 10);
    ctx.lineTo(210, py - 2);
    ctx.lineTo(225, py - 2);
    ctx.lineTo(223, py - 10);
    ctx.closePath();
    ctx.stroke();
    // Wheels
    ctx.fillStyle = '#AAAAAA';
    ctx.beginPath();
    ctx.arc(213, py, 2, 0, Math.PI * 2);
    ctx.arc(222, py, 2, 0, Math.PI * 2);
    ctx.fill();
    // Items in cart
    ctx.fillStyle = '#55FF55';
    ctx.fillRect(212, py - 8, 4, 4);
    ctx.fillStyle = '#FFAA00';
    ctx.fillRect(218, py - 9, 3, 5);
    return;
  }

  // --- EMPTY BASKET CRASH: red sky, broken wheel ---
  if (currentEventTitle.indexOf('Empty Basket') !== -1) {
    ctx.fillStyle = 'rgba(170,0,0,0.2)';
    ctx.fillRect(0, 0, W, H);
    // Broken wheel
    ctx.strokeStyle = '#AA5500';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(160, 145, 10, 0, Math.PI * 1.5);
    ctx.stroke();
    // Spokes
    for (var i = 0; i < 4; i++) {
      var angle = i * Math.PI / 2 + t * 0.5;
      ctx.beginPath();
      ctx.moveTo(160, 145);
      ctx.lineTo(160 + Math.cos(angle) * 8, 145 + Math.sin(angle) * 8);
      ctx.stroke();
    }
    ctx.lineWidth = 1;
    // Warning flashes
    var pulse = (Math.sin(t * 4) + 1) * 0.12;
    ctx.strokeStyle = 'rgba(255,0,0,' + pulse.toFixed(2) + ')';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    ctx.lineWidth = 1;
    return;
  }
// END OVERLAYS
