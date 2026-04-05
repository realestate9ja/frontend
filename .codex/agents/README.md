@# Project Subagents

These project-local Codex subagents are scoped to this repo and override any global agent with the same name.

Current duty-name mapping used in this project:
- `mobile-layout-fixer` = `Ohm`
- `dashboard-ux-auditor` = `Faraday`
- `real-estate-content-modeler` = `Euclid`
- `search-index-maintainer` = `Darwin`
- `backend-contract-writer` = `Turing`
- `design-consistency-reviewer` = `Bernoulli`

Included:
- `frontend-implementation-specialist.toml`
- `dashboard-ux-auditor.toml`
- `mobile-layout-fixer.toml`
- `real-estate-content-modeler.toml`
- `search-index-maintainer.toml`
- `backend-contract-writer.toml`
- `design-consistency-reviewer.toml`

Use them when work is narrow and repeated:
- frontend implementation and UI refinement
- dashboard regressions
- mobile overflow
- landlord/provider role drift
- dashboard search indexing
- backend spec updates
- design consistency review

Project-local location:
- `.codex/agents/`

Global location if you want them everywhere:
- `~/.codex/agents/`
