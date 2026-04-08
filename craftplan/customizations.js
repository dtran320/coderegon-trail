// TITLE
The Coderegon Trail - Craftplan Edition
// END TITLE
// FLAVORS
const travelFlavors = [
  "The sourdough starter is bubbling nicely...",
  "Flour dust settles on the plug pipeline...",
  "The oven preheats while Ash validates the changeset...",
  "A fresh batch of croissants enters production...",
  "The inventory forecast shows enough butter for the week...",
  "LiveView pushes a real-time order update to the dashboard...",
  "The BOM rollup recalculates material costs silently...",
  "A delivery date looms on the calendar feed...",
  "The API key authenticates. JSON flows downstream...",
  "Lot traceability tracks flour from supplier to baguette...",
  "The production batch groups three customer orders together...",
  "CSRF tokens bake alongside the bread. Security by default...",
  "The partial unique index holds firm. One active recipe only...",
  "Purchase orders flow upstream to restock the pantry...",
  "The balance cells project a flour shortage on Thursday...",
  "Decimal arithmetic keeps the cost calculations precise..."
];
// END FLAVORS
// OVERLAYS
  if (currentEventTitle.indexOf('Pipeline Storm') !== -1) {
    // Darken sky — storm clouds over the bakery
    ctx.fillStyle = 'rgba(0,0,50,0.45)';
    ctx.fillRect(0, 0, W, 110);
    // Lightning flash (periodic)
    var flashPhase = Math.sin(t * 1.7) + Math.sin(t * 3.1);
    if (flashPhase > 1.6) {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillRect(0, 0, W, H);
      // Lightning bolt
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
    // Rain
    ctx.strokeStyle = '#5555FF';
    ctx.lineWidth = 1;
    for (var i = 0; i < 40; i++) {
      var rx = (i * 8.3 + t * 80) % W;
      var ry = (i * 13.7 + t * 120) % 110;
      ctx.beginPath();
      ctx.moveTo(Math.floor(rx), Math.floor(ry));
      ctx.lineTo(Math.floor(rx - 1), Math.floor(ry + 5));
      ctx.stroke();
    }
    return;
  }

  if (currentEventTitle.indexOf('Baker Appears') !== -1) {
    // Baker NPC standing by a brick oven
    var px = 195, py = 142;
    // Baker body
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(px, py - 12, 4, 8); // white coat
    ctx.fillStyle = '#FFCC88';
    ctx.fillRect(px, py - 15, 4, 3); // head
    ctx.fillRect(px - 1, py - 4, 2, 5); // left leg
    ctx.fillRect(px + 3, py - 4, 2, 5); // right leg
    // Chef hat
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(px - 1, py - 19, 6, 4);
    ctx.fillRect(px, py - 22, 4, 3);
    // Brick oven
    ctx.fillStyle = '#AA4400';
    ctx.fillRect(210, py - 14, 16, 16);
    ctx.fillStyle = '#CC5500';
    ctx.fillRect(212, py - 12, 12, 10);
    // Oven opening
    ctx.fillStyle = '#331100';
    ctx.fillRect(214, py - 8, 8, 6);
    // Fire inside oven
    var flicker = Math.sin(t * 8) * 2;
    ctx.fillStyle = '#FF5555';
    ctx.fillRect(216, py - 6 + Math.floor(flicker * 0.3), 4, 3);
    ctx.fillStyle = '#FFFF55';
    ctx.fillRect(217, py - 7 + Math.floor(flicker * 0.5), 2, 2);
    // Oven glow
    ctx.fillStyle = 'rgba(255,170,0,0.08)';
    ctx.beginPath();
    ctx.arc(218, py - 5, 12, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (currentEventTitle.indexOf('Role Blizzard') !== -1) {
    // Darken sky — blizzard
    ctx.fillStyle = 'rgba(0,0,50,0.55)';
    ctx.fillRect(0, 0, W, 110);
    // Multiple lightning bolts
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
        ctx.lineTo(lx + 8, 58);
        ctx.lineTo(lx + 1, 85);
        ctx.stroke();
      }
    }
    // Heavy snow
    ctx.fillStyle = '#FFFFFF';
    for (var i = 0; i < 50; i++) {
      var sx = (i * 7.3 + t * 40) % W;
      var sy = (i * 11.7 + t * 60) % 110;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 2, 2);
    }
    return;
  }

  if (currentEventTitle.indexOf('Recipe Crossing') !== -1) {
    // River crossing — turbulent water with floating ingredients
    ctx.fillStyle = '#55FFFF';
    for (var i = 0; i < 20; i++) {
      var sx = (i * 17 + t * 40) % W;
      var sy = 157 + Math.sin((i * 3 + t * 5)) * 3;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), 4, 2);
    }
    // Floating recipe cards / ingredient bags
    ctx.fillStyle = '#FFEECC';
    for (var i = 0; i < 3; i++) {
      var cardX = (i * 110 + t * 25) % W;
      var cardY = 158 + Math.sin(t * 2 + i) * 2;
      ctx.fillRect(Math.floor(cardX), Math.floor(cardY), 6, 4);
      // Text line on card
      ctx.fillStyle = '#AA5500';
      ctx.fillRect(Math.floor(cardX) + 1, Math.floor(cardY) + 1, 4, 1);
      ctx.fillStyle = '#FFEECC';
    }
    return;
  }

  if (currentEventTitle.indexOf('Capacity Overflow') !== -1) {
    // Red danger tint — overflowing bakery
    ctx.fillStyle = 'rgba(170,0,0,0.25)';
    ctx.fillRect(0, 0, W, H);
    // Smoke rising from overworked oven
    ctx.fillStyle = '#555555';
    for (var i = 0; i < 15; i++) {
      var sx = 140 + Math.sin(i * 2.7 + t) * 30;
      var sy = 130 - ((t * 20 + i * 15) % 90);
      var size = 2 + (i % 3);
      ctx.globalAlpha = 0.3 + Math.sin(t + i) * 0.15;
      ctx.fillRect(Math.floor(sx), Math.floor(sy), size, size);
    }
    ctx.globalAlpha = 1.0;
    // Stacked bread loaves spilling over
    ctx.fillStyle = '#CC8844';
    for (var i = 0; i < 8; i++) {
      var bx = 125 + i * 8;
      var by = 140 - (i % 3) * 4;
      ctx.fillRect(bx, by, 6, 3);
    }
    // Pulsing red border
    var pulse = (Math.sin(t * 4) + 1) * 0.15;
    ctx.strokeStyle = 'rgba(255,0,0,' + pulse.toFixed(2) + ')';
    ctx.lineWidth = 3;
    ctx.strokeRect(1, 1, W - 2, H - 2);
    ctx.lineWidth = 1;
    return;
  }

  if (currentEventTitle.indexOf('Production Manager') !== -1) {
    // Manager NPC with clipboard standing by production board
    var px = 200, py = 142;
    // Person body
    ctx.fillStyle = '#4477AA';
    ctx.fillRect(px, py - 12, 4, 8); // blue shirt
    ctx.fillStyle = '#FFCC88';
    ctx.fillRect(px, py - 15, 4, 3); // head
    ctx.fillRect(px - 1, py - 4, 2, 5); // left leg
    ctx.fillRect(px + 3, py - 4, 2, 5); // right leg
    // Hard hat
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(px - 1, py - 17, 6, 2);
    ctx.fillRect(px, py - 19, 4, 2);
    // Clipboard in hand
    ctx.fillStyle = '#AA5500';
    ctx.fillRect(px + 6, py - 11, 3, 5);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(px + 6, py - 10, 3, 3);
    // Production board
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(214, py - 20, 16, 14);
    ctx.fillStyle = '#000000';
    // Board lines (schedule)
    for (var i = 0; i < 4; i++) {
      ctx.fillRect(216, py - 18 + i * 3, 12, 1);
    }
    // Green checkmarks
    ctx.fillStyle = '#00AA00';
    ctx.fillRect(226, py - 18, 2, 2);
    ctx.fillRect(226, py - 15, 2, 2);
    return;
  }
// END OVERLAYS
