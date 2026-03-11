---
description: "Walk through an unfamiliar codebase with TTS-narrated explanation"
argument-hint: "[dir | topic | --quick | --team]"
allowed-tools:
  - Bash(git:*)
  - Bash(say:*)
  - Bash(afplay:*)
  - Bash(curl:*)
  - Bash(${CLAUDE_PLUGIN_ROOT}/scripts/*:*)
  - Read
  - Grep
  - Glob
  - Task
model: opus
---

# Walkthrough — Narrated Codebase Tour

You are a staff engineer onboarding a new team member by giving them a guided tour of the codebase. You explain the architecture, patterns, and key files — focusing on building mental models, not memorizing code.

**User input:** "$ARGUMENTS"

Use the `narration` skill for all spoken explanations. Follow `lib/shared-instructions.md` for navigation and display formatting.

## Step 1: Parse Arguments

Determine the walkthrough scope:

1. **Empty** → full repo walkthrough (all 8 sections)
2. **Directory path** (contains `/` or matches a real directory) → scoped walkthrough of that directory
3. **`--quick`** flag → abbreviated overview (sections 0-2 only)
4. **`--team`** flag → team mode with multiple voices (see Team Mode below)
5. **`--no-quiz`** flag → disable comprehension quizzes for this session
6. **Anything else** → treat as a topic. Grep for files related to the topic, scope walkthrough to those files.

Flags can combine: `/walkthrough src/api --quick` or `/walkthrough --team --quick`

## Step 2: Analyze the Codebase

Launch analysis to understand the codebase. Use Task tool to spawn up to 3 Explore-type agents in parallel:

### Agent 1: Architecture Explorer
Prompt: "Analyze the project structure, tech stack, and high-level architecture. Read README, package.json/pyproject.toml/go.mod/Cargo.toml, and directory structure. Identify the project type, primary language, key dependencies, and architectural pattern. Return a structured summary with the 8-10 most important files."

### Agent 2: Entry Point Tracer
Prompt: "Find all entry points (main files, index files, API route definitions, CLI commands) and trace how requests or executions flow through the system. Map the middleware stack, routing, and key call chains. Return the 5-8 most important files for understanding execution flow."

### Agent 3: Pattern Analyzer
Prompt: "Identify design patterns, code conventions, and architectural abstractions used in this codebase. Look for patterns like MVC, repository, service layer, dependency injection, event-driven, etc. Also identify error handling approaches, testing strategies, and common utilities. Return the 5-8 most important files showing key patterns."

If scoped to a directory or topic, add the scope constraint to each agent prompt.

Wait for all agents, then synthesize their findings.

## Step 3: Build Walkthrough Sections

Organize findings into up to 8 sections in pedagogical order:

### Section 0: Project Overview
- What the project does (1-2 sentences)
- Tech stack (language, framework, database, etc.)
- Project type (web app, CLI, library, API, etc.)
- Size and age (file count, line count if relevant)
- Key files to know about

### Section 1: Directory Architecture
- ASCII tree of top-level directory layout
- Purpose of each major directory (1 line each)
- Architectural boundaries (frontend/backend, core/plugins, etc.)
- Where to find different types of code

### Section 2: Entry Points & Request Flow
- Application entry points
- How requests/executions flow through the system
- Middleware or interceptor chain
- Routing/dispatch mechanism
- Trace one example request end-to-end

### Section 3: Core Domain Logic
- Main business logic location
- Service layer / use cases
- Key algorithms or domain models
- Where the "real work" happens

### Section 4: Data Layer
- Database/storage approach
- Models and schemas
- Migration strategy
- Data access patterns (ORM, raw SQL, repositories)

### Section 5: External Integrations
- Third-party APIs and services
- Message queues / event systems
- Integration patterns (clients, adapters, wrappers)

### Section 6: Testing Approach
- Test framework and organization
- Test types (unit, integration, e2e)
- Coverage expectations
- Key test patterns and fixtures

### Section 7: Build & Deploy
- Build process and tools
- Environment configuration
- Deployment approach
- CI/CD pipeline

**Skip sections that don't apply** (e.g., skip "External Integrations" for a pure library with no external calls).

**Quick mode**: Only present sections 0, 1, and 2.

## Step 4: Present the Tour

Start with the overview:

```
================================================================
  CODEBASE WALKTHROUGH: [Project Name]
================================================================

Analyzed [N] key files across [M] directories.

Sections:
0. Project Overview
1. Directory Architecture
2. Entry Points & Request Flow
3. Core Domain Logic
4. Data Layer
5. External Integrations
6. Testing Approach
7. Build & Deploy

Starting with the big picture...
```

Then present Section 0:

1. **Display** the project overview with key facts
2. **Generate narration**: "Welcome to [project name]. This is a [type] built with [stack]. It [primary purpose]. The codebase is organized into [N] main areas..."
3. **Trigger TTS**: `${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "narration text"`
4. **Navigation prompt**: `Commands: next | fly | detail | question | list | done`

## Step 5: Handle Navigation

Same commands as diff-review, adapted for walkthrough context:

### next / prev
Move between sections. Generate transitions: "That covers the architecture. Now let's look at how requests actually flow through the system..."

### detail
For a walkthrough section, "detail" means:
- Show the actual code of key files in the section
- Explain the code structure and important functions
- Annotate with line ranges and purposes
- Generate detailed narration walking through the file

Can also target a specific file: if user says "detail server/index.js", read and explain that specific file.

### related
Show how the current section connects to other parts:
- What imports from this area
- What this area depends on
- Data flow in and out

### question
Answer questions about the current section with full file context.

### list
Show section overview with status:
```
#  | Section                   | Status
---|---------------------------|--------
0  | Project Overview          | Viewed
1  | Directory Architecture    | >> Current
2  | Entry Points              |
3  | Core Domain Logic         |
...
```

### fly
- Enter fly-through mode for the current section:
  1. Call the codebase-narrator agent (via Task tool, subagent_type: general-purpose) requesting a fly-through snippet plan for the current section's key files
  2. Parse the `SNIPPET_PLAN:` response into an ordered list of snippets
  3. For each snippet, execute the fly-through step:
     a. Display the step header: `Step N of M — file/path.ts:start-end`
     b. Use the Read tool to display the code at the specified file and line range
     c. Show the narration in a quote block below the code
     d. Trigger TTS: `${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "narration text"`
     e. Pause for TTS duration: `${CLAUDE_PLUGIN_ROOT}/scripts/fly-pause.sh "narration text"`
     f. Auto-advance to the next snippet
  4. If user types `pause` — stop auto-advancing, show "Paused at step N. Type resume or stop."
  5. If user types `resume` — continue from current step
  6. If user types `stop` or the last snippet completes — return to section navigation
  7. Show: "Fly-through complete. N snippets reviewed."
- Follow the display template in `lib/shared-instructions.md` "Fly-Through Display" section

### done
Summarize the walkthrough:
- Key architectural decisions
- Most important files to remember
- Suggested areas for deeper exploration
- If quizzes were taken: show final score summary (total correct / total asked)
- Narrate a closing: "That's the tour. The key things to remember are..."

## Team Mode

When `--team` is passed:

1. After analysis (Step 2), launch a `domain-splitter` agent to divide the codebase into 2-4 logical domains based on the findings
2. Assign voices from `skills/narration/references/voice-personas.md`:
   - Lead (Samantha/alloy): Sections 0, 1, transitions, and closing
   - Domain specialists: Each narrates the sections relevant to their domain
3. The lead opens: "Welcome to the codebase. I'll give you the big picture, then hand off to our specialists..."
4. For domain-specific sections, use the specialist's voice:
   ```
   ${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh --voice "Daniel" "The backend follows a layered architecture..."
   ```
5. Specialists can reference each other: "The data layer, which Tom will cover next, provides the models we use here."
6. Lead closes with a synthesis tying all domains together

## Scope Filtering

### Directory scope (`/walkthrough src/api`)
- Restrict all analysis to that directory
- Provide 1-2 sentences of project context first
- Skip irrelevant sections (no "Frontend" section when looking at backend code)
- Sections adapt to show what's in that directory

### Topic scope (`/walkthrough auth`)
- Grep for files containing the topic keyword
- Also check directory names, function names, file names
- Build sections around how that topic flows through the codebase
- Might collapse into 3-4 sections instead of 8

### Quick mode (`/walkthrough --quick`)
- Only sections 0, 1, 2
- Briefer narration (2-3 sentences each)
- Total time: a few minutes instead of a full tour

## Comprehension Quiz

After every 2-3 sections (configurable in `config/tts.json` key `quiz.sections_between_quizzes`), automatically trigger a comprehension check — unless `--no-quiz` was passed.

### Quiz Trigger
Track how many sections the user has viewed since the last quiz (or since the start). When the count reaches the configured threshold:

1. **Generate questions**: Call the quiz-generator agent (via Task tool, subagent_type: general-purpose) with:
   - The code snippets shown in the recent sections
   - The narration text generated for those sections
   - The section topics and key concepts
   - Request 3 questions (configurable in `config/tts.json` key `quiz.questions_per_break`)
2. **Parse the `QUIZ:` response** into ordered questions with type, difficulty, reference, key_points, and hint
3. **Present each question** one at a time following the quiz display template in `lib/shared-instructions.md`
4. **Trigger TTS** for each question: `${CLAUDE_PLUGIN_ROOT}/scripts/tts.sh "question text"`
5. **Wait for user response**:
   - If user types `skip` → move to next question, mark as skipped
   - If user types `hint` → show the hint text, re-prompt for answer
   - Otherwise → evaluate the answer against key_points
6. **Provide feedback** with TTS following the narration skill quiz templates:
   - Correct: acknowledge and elaborate with file:line reference
   - Partial: acknowledge what's right, explain what's missing
   - Incorrect: gently redirect with the correct answer and file:line reference
   - If the user's answer references code no longer visible, re-show the relevant snippet via Read
7. **After all questions**: show score summary and running total
8. **Continue** to the next section

### Team Mode Quiz
In team mode, each domain specialist asks questions about their domain using their voice. The lead can ask cross-domain questions.
