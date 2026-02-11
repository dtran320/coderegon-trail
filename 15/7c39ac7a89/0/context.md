# Session Context

## User Prompts

### Prompt 1

Please analyze this codebase and create a CLAUDE.md file, which will be given to future instances of Claude Code to operate in this repository.

What to add:
1. Commands that will be commonly used, such as how to build, lint, and run tests. Include the necessary commands to develop in this codebase, such as how to run a single test.
2. High-level code architecture and structure so that future instances can be productive more quickly. Focus on the "big picture" architecture that requires reading ...

### Prompt 2

Merge in the Claude.md from the latest main branch and fix conflicts

### Prompt 3

Commit and push this code, and if we're on a feature branch and there's not already a PR against dev, create one. If we're on the default (main or dev) branch, ask for confirmation before pushing:

### Prompt 4

Great, can you summarize that PR

### Prompt 5

Okay, can we implement the elevenlabs-tts?

### Prompt 6

[Request interrupted by user for tool use]

