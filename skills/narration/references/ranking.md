# Importance Ranking Criteria

## For Diff Review (`/diff-review`)

Rank changes from most to least important (1 = highest priority to review first):

| Rank | Category | What to look for |
|------|----------|-----------------|
| 1 | Core business logic | Changes to critical algorithms, business rules, data processing |
| 2 | Breaking API/interface changes | Modified public APIs, changed function signatures, removed methods |
| 3 | Data model/schema changes | Database migrations, model field changes, data structure modifications |
| 4 | Non-breaking API additions | New endpoints, new optional parameters, additive interface changes |
| 5 | Utility/helper changes | Logging, formatting, validation helpers, shared utilities |
| 6 | Test changes | New or modified tests |
| 7 | Config/build/dependency | package.json, tsconfig, CI config, README, formatting |

### Boost factors (move up 1 rank):
- Contains security-related keywords: auth, password, token, permission, encryption
- Contains "BREAKING", "deprecated", "removed" in comments or commit message
- Large refactors (200+ lines changed)
- Touches entry points (main, index, app initialization)

### Reduce factors (move down 1 rank):
- Purely additive test files with no deletions
- Formatting-only or whitespace changes
- Auto-generated code (lockfiles, snapshots)
- Documentation-only changes

## For Walkthrough (`/walkthrough`)

Sections are presented in a fixed pedagogical order (overview first, build/deploy last) but files within sections are ranked:

| Priority | File type | Rationale |
|----------|-----------|-----------|
| Highest | Entry points (main, index, app) | Starting point for understanding |
| High | Core services / business logic | Where the "real work" happens |
| High | Primary routes / controllers | How the outside world interacts |
| Medium | Models / schemas / types | Data structures shape everything |
| Medium | Key middleware / interceptors | Cross-cutting behavior |
| Lower | Utility functions | Supporting cast |
| Lower | Configuration files | Context but not core |
| Lowest | Generated / boilerplate | Skip unless specifically asked |

### Scope filtering
- When scoped to a directory: only rank files within that directory
- When scoped to a topic: rank by relevance to the topic (grep match density)
- Quick mode: only show top 3-5 files per section

## Grouping Algorithm for Diffs

When grouping changed files into logical sections:

1. **By feature**: Files that change together for a single feature (detect via shared symbols, directory proximity, naming patterns like `user.ts` + `user.test.ts`)
2. **By layer**: If not feature-grouped, group by architectural layer (routes together, services together, etc.)
3. **By type**: Last resort grouping — all tests together, all configs together

Prefer feature grouping when possible. It tells a better story.
