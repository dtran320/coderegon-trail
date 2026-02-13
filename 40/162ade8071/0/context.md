# Session Context

## User Prompts

### Prompt 1

Can we update the readme, CLAUDE.md and any other docs for this? We want can still have /walkthrough, but we want to mostly focus on the new oreorg-trail

### Prompt 2

Commit and push this code, and if we're on a feature branch and there's not already a PR against dev, create one. If we're on the default (main or dev) branch, ask for confirmation before pushing.

After creating a PR (or if one already exists), run `/code-review:code-review` on it.

### Prompt 3

Provide a code review for the given pull request.

To do this, follow these steps precisely:

1. Launch a haiku agent to check if any of the following are true:
   - The pull request is closed
   - The pull request is a draft
   - The pull request does not need code review (e.g. automated PR, trivial change that is obviously correct)
   - You have already submitted a code review on this pull request

   If any condition is true, stop and do not proceed.

Note: Still review Claude generated PR's....

