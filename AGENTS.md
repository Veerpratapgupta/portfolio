# Agent Guidelines & Workflow (`AGENTS.md`)

This repository is developed using autonomous coding agents inside the **Herdr** terminal workspace multiplexer.

For comprehensive multi-agent topology, session recovery, and CLI bridge commands, see [`docs/AGENTS.md`](docs/AGENTS.md).

---

## Agent skills

### Issue tracker

Issues and specifications live in GitHub Issues (`Veerpratapgupta/portfolio`) using the `gh` CLI. See [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).

### Domain docs

Single-context layout (`GLOSSARY.md` at root and architecture decision records in `docs/adr/`). See [`docs/agents/domain.md`](docs/agents/domain.md).

---

## Active Skills Catalog (`.agents/skills/`)

The following specialized engineering & productivity skills are configured for this codebase:

| Skill | Description | Invocation / Usage |
|---|---|---|
| **`code-review`** | Review branch or working changes along Standards & Spec in parallel subagents. | Pre-PR review / commit audit |
| **`codebase-design`** | Deep module interface design and seam placement. | Architecture refinement |
| **`diagnosing-bugs`** | Hypothesis-driven diagnosis loop for tricky bugs and regressions. | Bugfixing |
| **`domain-modeling`** | Build and sharpen project vocabulary and ADRs. | Maintaining `GLOSSARY.md` |
| **`grilling`** | Stress-test decisions, plans, and architectural tradeoffs. | Design interviews |
| **`implement`** | Structured red-green implementation loop. | Feature implementation |
| **`prototype`** | Throwaway prototyping for rapid logic/UI validation. | Spiking features |
| **`research`** | High-trust primary source investigation and doc capture. | API & tool discovery |
| **`tdd`** | Test-driven development workflow. | Unit & integration tests |
| **`to-spec`** | Convert concepts and user requests into concrete specs. | Spec drafting |
| **`to-tickets`** | Break specifications into tracked GitHub issues. | Issue tracking |
| **`writing-for-agents`**| Crafting skills and system docs for AI agents. | Meta-documentation |

---

## Operating Principles
1. **Always consult [`PLAN.md`](PLAN.md)** before beginning work; update milestone checklists upon completion.
2. **Follow vocabulary in [`GLOSSARY.md`](GLOSSARY.md)** to prevent terminology drift.
3. **Run CodeRabbit review** (`coderabbit review --base main` or `coderabbit review --agent`) before pushing code.
