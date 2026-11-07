# Multi-Agent Workflow & Collaboration Guide (`docs/AGENTS.md`)

This document defines the agent architecture, communication protocols, roles, and context-preservation guidelines for developing the portfolio inside the **Herdr** terminal multiplexer.

---

## 1. Herdr Agent Topology

```
┌────────────────────────────────────────────────────────────────────────┐
│                              HERDR SESSION                             │
├────────────────────────────┬───────────────────────────────────────────┤
│                            │  [Pane w3:p2] architect (OpenCode)        │
│  [Pane w3:p1]              │  • System architecture & component specs  │
│  agy (Antigravity CLI)     │  • Design tokens & UX guidance            │
│  • Orchestration & QA      ├───────────────────────────────────────────┤
│  • Plan maintenance        │  [Pane w3:p3] developer (OpenCode)        │
│  • High-level coordination │  • Implementation & code scaffolding      │
│                            │  • Local builds & test verification       │
└────────────────────────────┴───────────────────────────────────────────┘
```

### Agent Registry

| Agent Name | Engine | Herdr Pane | Primary Role | Lifecycle State |
|---|---|---|---|---|
| **`agy`** | Antigravity CLI | `w3:p1` | **Orchestrator & QA Lead**: Manages global plan, tracks tasks, guides user, and oversees project quality. | `working` |
| **`architect`** | OpenCode | `w3:p2` | **System Architect**: Designs data structures, component contracts, CSS architecture, and technical specifications. | `idle` / `done` |
| **`developer`** | OpenCode | `w3:p3` | **Implementation Lead**: Writes production code, configures build pipelines, and runs local verification. | `idle` / `done` |

---

## 2. Context Preservation Protocol

To guarantee that agents **never lose context** between turns, sessions, or tool calls:

1. **Single Source of Truth (`PLAN.md`)**:
   - Every active milestone, task breakdown, and acceptance criterion is tracked in `PLAN.md`.
   - Before taking any action, an agent must read `PLAN.md` to identify the current active phase.
   - When a phase/task is finished, the agent or orchestrator marks `[x]` on that task.

2. **Persistent Documentation (`docs/`)**:
   - `docs/AGENTS.md`: Agent registry, roles, communication bridge, and recovery commands.
   - `docs/ARCHITECTURE.md`: Technical component tree, design tokens, and style conventions.

3. **Dialogue History (`dialogue_transcript.md`)**:
   - All collaborative discussions and agent-to-agent exchanges are automatically appended to `dialogue_transcript.md` with timestamps and speakers.

4. **Database State & Session Persistence**:
   - OpenCode sessions persist their conversation messages and tool executions in `~/.local/share/opencode/opencode.db`.
   - In case of terminal disconnects, sessions can be resumed or queried without losing prior thoughts.

---

## 3. Communication Bridge (`herdr_bridge.py`)

Agent communication is orchestrated via `herdr_bridge.py`, which leverages Herdr's API and OpenCode's SQLite store for high-speed, zero-loss message handoffs.

### Running Automated Exchanges
```bash
# Run N turns of collaborative dialogue on the active task
./herdr_bridge.py --turns 4

# Run dialogue with a specific directive or phase kickoff
./herdr_bridge.py --turns 2 --topic "Begin Phase 1: Scaffold package.json, vite.config.js, and tokens.css."

# Custom agent pairing or timeout
./herdr_bridge.py --agent-a architect --agent-b developer --turns 2 --timeout 180000
```

### Direct Herdr CLI Control
When manual inspection or single-message steering is needed:
```bash
# Check all live agents and their current statuses
herdr agent list

# Prompt a specific agent and wait for completion
herdr agent prompt architect "Review the current CSS tokens in src/styles/tokens.css" --wait

# Inspect an agent's terminal output
herdr agent read developer --source recent-unwrapped --lines 80

# Check pane layout and edges
herdr pane list
```

---

## 4. Agent Roles & Responsibilities

### 1. `architect` (System Architect)
- **Inputs:** High-level project requirements from `PLAN.md` or user prompts.
- **Responsibilities:**
  - Define folder conventions, file boundaries, and component interfaces.
  - Establish styling architecture (custom properties, responsive breakpoints, accessible focus states).
  - Draft concrete specifications for `developer` with clear acceptance criteria.
  - Review `developer` output against design standards and accessibility guidelines.

### 2. `developer` (Implementation Engineer)
- **Inputs:** Specifications and task lists from `architect`.
- **Responsibilities:**
  - Scaffold files and write clean, modular, dependency-free code.
  - Maintain data-first architecture in `src/data/`.
  - Execute build commands (`npm install`, `npm run dev`, `npm run build`) and verify zero errors.
  - Report implementation status, edge cases, and completed tasks back to `architect` and `agy`.

### 3. `agy` (Antigravity Orchestrator)
- **Inputs:** User requests and project goals.
- **Responsibilities:**
  - Coordinate the multi-agent relay between `architect` and `developer`.
  - Maintain and update `PLAN.md` checklists as progress is confirmed.
  - Keep the user informed with clear, actionable summaries and links to project artifacts.

---

## 5. Handoff & Quality Gates

Before any phase is marked as completed in `PLAN.md`:

1. **Build Gate:** `npm run build` exits with code 0 and produces optimized output in `dist/`.
2. **Lint/Error Gate:** Dev tools console must be free of errors and warnings.
3. **Responsiveness Gate:** Layout holds cleanly at `375px`, `768px`, and `1440px`.
4. **Theme Gate:** Dark and Light modes both satisfy contrast ratios; preference persists in `localStorage`.
5. **No-JS Resilience:** Core copy and navigation remain readable even if JavaScript is disabled.

---

## 6. Recovery & Troubleshooting

If an agent or pane is accidentally closed or stalls:

1. **Check pane status:**
   ```bash
   herdr pane list
   herdr agent list
   ```
2. **Split a new pane if needed:**
   ```bash
   herdr pane split --pane w3:p2 --direction down --cwd "/home/veer/projects/portfolio" --no-focus
   ```
3. **Restart the agent:**
   ```bash
   herdr agent start developer --kind opencode --pane <pane-id>
   ```
4. **Re-attach and resume:**
   The agent will read `PLAN.md` and `docs/AGENTS.md` and immediately resume the current phase without loss of project context.
