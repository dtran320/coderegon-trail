// =====================================================================
// CUSTOMIZATIONS — Mini Browser Edition
// =====================================================================
// Game title and theming overrides for beginner-jhj/mini_browser
// A from-scratch browser engine in C++ with Qt

const GAME_TITLE = "The Coderegon Trail - Mini Browser Edition";
const GAME_SUBTITLE = "A Browser Engine Learning Adventure";
const DESTINATION_NAME = "Pixel Frontier";

// =====================================================================
// TRAVEL FLAVORS — Browser/Web Themed
// =====================================================================
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

// =====================================================================
// EVENT OVERLAY THEMES — Visual Customizations
// =====================================================================
const eventOverlays = {
  weather: {
    title: "Rendering Storm",
    palette: {
      sky: "#1a1a2e",
      clouds: "#4a4a6a",
      lightning: "#e0e0ff",
      accent: "#7b68ee"
    },
    particles: "angle-brackets",  // falling < and > characters
    description: "Storm clouds of malformed markup roll in"
  },
  river: {
    title: "Pipeline Crossing",
    palette: {
      water: "#1e3a5f",
      foam: "#87ceeb",
      banks: "#2d4a22",
      accent: "#4682b4"
    },
    flowPattern: "data-stream",  // binary/hex patterns in the water
    description: "The boundary between parsing and rendering"
  },
  encounter: {
    title: "Fellow Developer",
    palette: {
      background: "#1a2a1a",
      npc: "#c0c0c0",
      speechBubble: "#f0f0e8",
      accent: "#90ee90"
    },
    npcSprite: "cpp-developer",  // pixel art developer with laptop
    description: "A C++ developer shares browser engine wisdom"
  },
  misfortune: {
    title: "Bug Report!",
    palette: {
      background: "#2a1a1a",
      alert: "#ff6b6b",
      border: "#8b0000",
      accent: "#ff4444"
    },
    icon: "segfault",  // crash/error icon
    description: "Something went wrong in the rendering pipeline"
  },
  fortune: {
    title: "Clean Build!",
    palette: {
      background: "#1a2a1a",
      sparkle: "#ffd700",
      glow: "#98fb98",
      accent: "#00ff7f"
    },
    icon: "green-checkmark",  // successful compile
    description: "Your code compiles without warnings"
  }
};

// =====================================================================
// THEME COLORS — Browser Engine Aesthetic
// =====================================================================
const themeColors = {
  primary: "#2d5986",       // deep browser blue
  secondary: "#4a9eda",     // link blue
  accent: "#e8a838",        // warning/highlight amber
  background: "#0a0a1a",    // dark IDE background
  text: "#e0e0e0",          // light text
  code: "#1e1e2e",          // code block background
  success: "#4caf50",       // green for correct answers
  danger: "#ef5350",        // red for wrong answers
  trail: "#8b7355",         // dusty trail brown
  wagon: "#c8a864"          // wagon wood color
};

// =====================================================================
// LANDMARK ICONS — Pipeline Stage Visuals
// =====================================================================
const landmarkIcons = {
  town: "browser-window",        // for entry/exit points
  camp: "code-editor",           // for parsing/processing stops
  mountain: "tree-structure",    // for tree-building stops
  river: "data-flow",           // for boundary crossings
  forest: "cascade-waterfall"   // for style computation
};

// =====================================================================
// PARTY MEMBER DESCRIPTIONS
// =====================================================================
const partyDescriptions = {
  "DOM Tree": "The hierarchical structure of nodes, built from HTML tokens. Your foundation.",
  "CSSOM": "The CSS Object Model that matches selectors to nodes. Your style authority.",
  "Layout Engine": "Computes x, y, width, height for every box. Your geometry calculator.",
  "Rendering Pipeline": "Ties it all together -- from HTML string to painted pixels. Your destination."
};
