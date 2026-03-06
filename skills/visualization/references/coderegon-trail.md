# Coderegon Trail — Game Mechanics Reference

The Coderegon Trail is a retro pixel art game that teaches web framework concepts by mapping the request pipeline to a trail journey. Each framework has ~8 stops, and the player must answer quiz questions disguised as trail events to survive the journey.

## Game Loop

```
TITLE → SETUP → [TRAVEL → STOP/EVENT]×8 → WIN or DEATH
```

### Title Screen
- Pixel art logo: "CODEREGON TRAIL" in western-style pixel font
- Scrolling landscape behind the title
- "Press any key to start" or "Click to begin"
- Subtitle: "A [Framework] Learning Adventure"

### Setup Phase
1. **Framework Selection** (if not pre-selected via command arg)
   - Show wagon icons with framework logos as flags
   - Each wagon shows the trail name: "The App Router Trail", "The Convention Trail", etc.
   - Click or arrow-key to select

2. **Party Naming**
   - "Your party of 4 represents the key concepts you'll learn:"
   - Show 4 party members with default names (framework concepts)
   - Player can optionally rename them (but defaults are the real concept names)
   - Each party member has a 16x16 pixel portrait icon

3. **Difficulty Selection** (optional — maps to verbosity)
   - **Settler** (Easy): More hints, longer explanations, forgiving scoring
   - **Adventurer** (Normal): Standard game
   - **Trail Blazer** (Hard): No hints, terse narration, strict scoring

### Travel Phase
- Wagon moves across a scrolling landscape
- Progress bar shows position on the trail (Stop 1 of 8)
- Day counter increments
- Random travel text: "The trail is dusty but your party is in good spirits."
- Travel takes 2-3 seconds of animation before arriving at next stop/event

### Stop Phase
Each stop represents a stage in the framework's request pipeline:

1. **Arrival announcement**: "You have arrived at [Stop Name]!"
2. **Code panel opens**: Shows the code snippet for this pipeline stage
3. **Narration text**: Explains what this code does and why it matters
4. **Interaction choices**:
   - "Continue on the trail" → advance to next travel phase
   - "Examine the code more closely" → show additional detail / expanded snippet
   - "Ask about [specific thing]" → context-sensitive deeper explanation
5. After interaction, advance to next travel/event

### Event Phase
Events appear between stops (roughly every other stop). They are quiz questions disguised as trail decisions.

#### Event Types

**Weather Events (Architecture Questions)**
- Metaphor: Weather = architectural forces acting on your system
- Visual: Storm clouds, lightning, fog rolling in
- Questions test: middleware patterns, error handling, request flow
- Penalty for wrong answer: Health damage + party member takes 1 damage

**River Crossings (Major Boundaries)**
- Metaphor: Rivers = major architectural boundaries (client/server, app/db)
- Visual: Animated river with choices on how to cross
- Questions test: data flow across boundaries, rendering strategies, ORM vs raw queries
- Higher stakes: Wrong answer = more damage, potential party member death
- Only 1-2 river crossings per trail

**Encounters (Pattern Discovery)**
- Metaphor: Meeting fellow travelers who share wisdom
- Visual: NPC character with speech bubble
- Shows actual code patterns from the framework
- Multiple choice: identify the pattern being demonstrated
- Reward for correct: Health bonus + insight text

**Misfortune Events (Anti-Pattern Awareness)**
- Metaphor: Bad things happen on the trail — bandits, broken wheels, illness
- Visual: Alert/warning with dramatic pixel art
- Questions test: security, performance, common mistakes
- Penalty for wrong: Party member gets "sick" (1 damage)
- Reward for correct: Avoided the danger, health maintained

**Fortune Events (Positive Reinforcement)**
- Trigger: After a correct-answer streak of 3+
- No question — just a reward
- "You found a spring of clean code! +20 health"
- "A group of friendly developers joined your camp! You learned about [concept]."
- Visual: Sparkles, treasure chest, friendly NPCs

### Death Conditions
Game over occurs when:
- Health reaches 0
- All 4 party members die (each has 3 HP)

On death:
1. Show pixel art tombstone
2. Display framework-specific death message
3. Show partial score card (how far you got)
4. "Press any key to try again"

### Win Conditions
Arrive at the final stop ("Response Frontier") with:
- Health > 0
- At least 1 party member alive

On win:
1. Celebration animation (fireworks pixel art)
2. Full score card (see Score Card section)
3. Concept mastery breakdown
4. Personalized study recommendation based on weak areas

## Resources

### Health (0-100)
- Starts at 100
- Lost on wrong answers: -15
- Gained on correct answers: +10
- Gained on streak bonus: +5 per correct after 3-streak
- If health reaches 0: game over

### Supplies (0-8)
- Starts at 5
- Each supply = 1 hint
- Using a hint: -1 supply
- Can find supplies in fortune events: +1-2 supplies
- Not fatal if 0 — just means no hints available

### Pace (display depth)
- At each stop, player chooses interaction level
- "Continue" = brief view (saves time but less learning)
- "Examine" = detailed view (more learning, no penalty)
- Tracked for score card: how many stops were examined in detail

### Morale (streak counter)
- Increments on each correct answer
- Resets to 0 on wrong answer
- Displayed as stars: 0=none, 1-2=★, 3-4=★★, 5+=★★★
- Streak of 3+ triggers fortune events
- Streak of 5+ gives bonus points on score card

## Party Member Health

Each party member has 3 HP:
- **Healthy (3 HP)**: Full portrait, green name
- **Minor illness (2 HP)**: Slightly faded portrait, yellow name
- **Severe illness (1 HP)**: Very faded portrait, red name
- **Dead (0 HP)**: Crossed-out portrait, grey name, struck-through text

Party members take damage when the player answers a question about their concept incorrectly. The question's `concept` field maps to a party member.

When a party member dies:
- Dramatic message: "[Name] has died of unhandled exceptions."
- That concept's questions become harder (no partial credit)
- Party member shown as ghost in status bar

## Score Card (Win Screen)

```
╔══════════════════════════════════════════╗
║   YOU MADE IT TO RESPONSE FRONTIER!     ║
╠══════════════════════════════════════════╣
║                                          ║
║  Framework: [Name] ([Trail Name])        ║
║  Party Survivors: N/4                    ║
║    [status icon] [Name] ([health])       ║
║    ... (for each party member)           ║
║                                          ║
║  Quiz Score: X/Y (Z%)                   ║
║  Hints Used: N                           ║
║  Streak Best: N in a row                 ║
║  Stops Examined: N/M                     ║
║                                          ║
║  Concepts Mastered:                      ║
║    ★★★ [concept] (all correct)          ║
║    ★★☆ [concept] (mostly correct)       ║
║    ★☆☆ [concept] (needs work)           ║
║    ☆☆☆ [concept] (party member died)    ║
║                                          ║
║  "[Personalized study recommendation]"   ║
╚══════════════════════════════════════════╝
```

## Death Messages

Framework-specific tombstone inscriptions. Include at least 8 per framework, randomly selected on death:

### Universal
- "Died of dysentery... er, dependency conflicts."
- "Your session expired of old age."
- "Starved waiting for the API response. No timeout configured."

### Next.js
- "Here lies your app. It died of unhandled promise rejections."
- "Lost in the file router — too many nested layouts."
- "Drowned in the hydration mismatch river."
- "Killed by a rogue 'use client' directive in a server component."

### Rails
- "Died of N+1 query disease. Should have used .includes."
- "Lost in the convention — named the controller wrong."
- "Buried under an avalanche of unpinned gem versions."

### Express
- "Lost in the middleware — never called next()."
- "Died of callback hell. No async/await equipped."
- "The unhandled rejection consumed all resources."

### Django
- "Lost in the URLconf — circular imports everywhere."
- "Died of template inheritance confusion."
- "The migration history was irreconcilable."

### React
- "Killed by an infinite useEffect loop."
- "Died of prop drilling — state never reached the leaf."
- "Re-rendered into oblivion. No memoization equipped."

### Laravel
- "Lost in the service container — binding not found."
- "Died of mass assignment vulnerability."
- "The Artisan command ran but nobody was listening."

## Difficulty Tiers

Each framework has 12-15 events at three difficulty tiers. The player's chosen profession determines which tiers they see:

| Profession | Sees Tiers | Style |
|---|---|---|
| Ralph Wiggum | `easy` only | Forgiving mode — wrong answers let you try again |
| Vibe Coder | `easy` + `medium` | "What does X do?" and "Why does X work this way?" |
| Engineer | `medium` + `hard` | "Why/how" + "Spot the bug" / "Trace the flow" |
| Staff Architect | `hard` only | Deep tradeoff questions, no hints |

The game filters events by difficulty tier based on the selected profession, then picks up to 6 events from the filtered pool (shuffled if pool > 6). Fortune events (rewards) trigger on answer streaks regardless of tier.

Each playthrough still presents ~6 events. With 12-15 events per framework across three tiers, each profession tier has at least 5 eligible events.

### Tier Guidelines

- **Easy**: "What does X do?" / "Which is the right pattern?" — tests recognition and basic understanding. Sourced from getting-started docs and tutorials.
- **Medium**: "Why does X work this way?" / "What happens if...?" — tests comprehension and cause-effect reasoning. Sourced from concept guides and best practices docs.
- **Hard**: "Spot the bug" / "Trace the flow" / "What's the tradeoff?" — tests deep architectural understanding. Sourced from advanced guides, performance docs, and security advisories.

## Event Catalog Template

Each event in `framework-trails.md` follows this structure:

```yaml
- type: weather | river | encounter | misfortune | fortune
  trigger: after_stop | random | milestone
  triggerStop: N  # which stop triggers this event (0-indexed)
  title: "Event Title"
  text: "Narrative text describing the situation..."
  choices:
    - text: "Choice A text"
      correct: true | false
      explanation: "Why this is right/wrong"
      damage: 0      # health damage on wrong (default: 15)
      partyDamage: 0  # party member damage (default: 1 if wrong)
    - text: "Choice B text"
      ...
  concept: "Which party member concept this maps to"
  difficulty: easy | medium | hard
```
