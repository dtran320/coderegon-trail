# Fly-Through Mode — Snippet Plan Reference

Fly-through mode auto-advances through code snippets with synchronized TTS narration, giving a guided tour of the most important code paths.

## Snippet Plan Format

Narrator agents output an ordered list of snippet entries as a `SNIPPET_PLAN:` block. Each entry contains:

- **file** — path to the source file
- **start_line** — beginning line number
- **end_line** — ending line number (max 25 lines from start)
- **narration** — 2-4 sentence TTS-friendly explanation of that snippet
- **transition** — 1 sentence bridging to the next snippet (empty for last)

```
SNIPPET_PLAN:
1. file: src/routes/users.ts | lines: 15-38
   narration: "This is the route handler for user creation. Notice how it validates the request body before passing it to the service layer. The error handling wraps everything in a try-catch that maps service errors to HTTP status codes."
   transition: "This handler calls the UserService, which we'll see next."

2. file: src/services/user-service.ts | lines: 22-45
   narration: "Here's where the actual user creation logic lives. The service checks for duplicate emails, hashes the password, and persists the new user. It returns a clean DTO rather than the raw database model."
   transition: "The service delegates persistence to the repository layer."

3. file: src/repos/user-repo.ts | lines: 10-30
   narration: "The repository wraps the database calls. Notice the transaction here — if the insert fails, the whole operation rolls back cleanly."
   transition: ""
```

## Snippet Selection Guidelines

- Follow execution flow: entry point, then service, then data layer, then response
- Show "money" code — the logic that matters, not boilerplate
- Max 25 lines per snippet to keep code visible and digestible
- For diffs: show the changed hunks with 3 lines of context
- For walkthroughs: show the most important function bodies
- 4-8 snippets per section (configurable via `tts.json` key `fly_through.snippets_per_section`)
- Include at least one "surprise" — an interesting pattern or clever design choice

## Display Template

For each fly-through step:

```
────────────────────────────────────────────────
  Step N of M — file/path.ts:15-38
────────────────────────────────────────────────
[code snippet displayed via Read tool]

💬 [narration text in a quote block]

  ▶ Auto-advancing in Ns... (pause | stop)
────────────────────────────────────────────────
```

The `file:line` format is deliberately clickable in VS Code terminals.

## Timing

- Duration estimated from narration word count divided by configured WPM, plus buffer
- Default buffer: 2 seconds (configurable in `tts.json` key `fly_through.auto_pause_buffer`)
- User can say `pause` to stop auto-advance, `resume` to continue, `stop` to exit fly-through

## Team Mode

In team mode, each fly-through snippet uses the domain specialist's voice. The lead voice provides the opening ("Let's fly through this section...") and closing ("That covers the key code paths.").
