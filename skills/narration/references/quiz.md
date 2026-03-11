# Quiz Mode — Comprehension Questions Reference

Quiz mode inserts comprehension checks between sections to reinforce understanding and encourage active engagement with the code.

## Question Types

| Type | Template | When to use |
|------|----------|-------------|
| Why | "Why does this use X instead of Y?" | Design decisions, pattern choices |
| What-if | "What would happen if X were changed to Y?" | Edge cases, failure modes |
| Trace | "If a user does X, what happens step by step?" | Flow understanding |
| Connect | "Which component depends on / connects to X?" | Architecture understanding |
| Spot-the-issue | "Is there a potential problem with this approach?" | Critical thinking, code quality |

## Question Generation Guidelines

- Test understanding, not memorization — never ask "What is the function name?"
- Reference specific code that was shown (by file:line)
- Mix question types within a quiz (no two consecutive same-type)
- Difficulty progression: easier questions first, harder last
- 3 questions per quiz break (configurable in `tts.json` key `quiz.questions_per_break`)
- Quiz triggers after every 2-3 sections (configurable in `tts.json` key `quiz.sections_between_quizzes`)

## Output Format

Quiz generator agent outputs:

```
QUIZ:
Q1 [type: why] [difficulty: easy] [ref: src/auth.ts:42-58]
  "Why does the authentication middleware check the token expiry before verifying the signature?"
  key_points: ["performance optimization", "avoid expensive crypto for expired tokens"]
  hint: "Think about what's cheaper to check first."

Q2 [type: what-if] [difficulty: medium] [ref: src/cache.ts:15-30]
  "What would happen to the application if the cache TTL were set to zero?"
  key_points: ["every request hits database", "increased latency", "cache becomes pass-through"]
  hint: "Consider what TTL zero means for cache behavior."

Q3 [type: trace] [difficulty: medium] [ref: src/routes/users.ts:20-45]
  "If a user submits a registration form with an email that already exists, what happens?"
  key_points: ["validation passes", "service layer checks uniqueness", "409 Conflict returned"]
  hint: "Follow the request from the route handler."
```

## Answer Evaluation Guidelines

- Evaluate generously — partial credit for showing understanding
- Look for key concepts, not exact wording
- A half-right answer that shows reasoning is better than wrong
- Scoring: correct (full), partial (shows some understanding), incorrect
- Always provide constructive feedback, never just "wrong"

## Quiz Narration Style

- **Questions:** read slowly and clearly, pause after each question
- **Correct answers:** encouraging tone — "That's right. And to add to that..."
- **Partial answers:** acknowledge what's right — "You're on the right track. The key piece you're missing is..."
- **Incorrect:** gentle redirect — "Not quite. The reason is actually..."
- Always reference the specific code in feedback: "If you look back at auth dot ts line 42..."

## Re-showing Code

If the user's answer references something no longer visible, re-display the relevant snippet before giving feedback. Use the Read tool with the file and line range from the question's `ref` field.

## Team Mode

In team mode, each domain specialist asks questions about their domain. The lead can ask cross-domain questions that connect multiple areas.
