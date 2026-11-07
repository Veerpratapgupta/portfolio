#!/usr/bin/env python3
"""
herdr_bridge.py — Facilitates multi-agent dialogue inside Herdr multiplexer.
Coordinates two coding agents (e.g. Architect and Developer) by relaying
messages back and forth, logging the conversation, and recording transcripts.
"""

import sys
import os
import time
import json
import sqlite3
import argparse
import subprocess
from datetime import datetime

# ANSI Color codes
BOLD = "\033[1m"
RESET = "\033[0m"
CYAN = "\033[36m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
MAGENTA = "\033[35m"
BLUE = "\033[34m"
DIM = "\033[2m"

DB_PATH = os.path.expanduser("~/.local/share/opencode/opencode.db")

def run_cmd(cmd: list[str], timeout: int | None = None) -> tuple[int, str, str]:
    try:
        proc = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
        )
        return proc.returncode, proc.stdout, proc.stderr
    except subprocess.TimeoutExpired:
        return -1, "", "Command timed out"
    except Exception as e:
        return -1, "", str(e)

def get_agent_info(agent_name: str) -> dict | None:
    code, stdout, _ = run_cmd(["herdr", "agent", "get", agent_name])
    if code == 0:
        try:
            data = json.loads(stdout)
            return data.get("result", {}).get("agent", {})
        except json.JSONDecodeError:
            pass
    return None

def get_last_assistant_text_from_db(session_id: str, after_timestamp_ms: int = 0) -> str | None:
    if not os.path.exists(DB_PATH):
        return None
    try:
        conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
        cur = conn.cursor()
        cur.execute(
            """
            SELECT id FROM message 
            WHERE session_id = ? 
              AND json_extract(data, '$.role') = 'assistant'
              AND time_created >= ?
            ORDER BY time_created DESC LIMIT 1;
            """,
            (session_id, after_timestamp_ms),
        )
        msg_row = cur.fetchone()
        if not msg_row:
            # Fallback to absolute latest
            cur.execute(
                """
                SELECT id FROM message 
                WHERE session_id = ? 
                  AND json_extract(data, '$.role') = 'assistant'
                ORDER BY time_created DESC LIMIT 1;
                """,
                (session_id,),
            )
            msg_row = cur.fetchone()
            if not msg_row:
                conn.close()
                return None

        message_id = msg_row[0]
        cur.execute(
            """
            SELECT json_extract(data, '$.text') 
            FROM part 
            WHERE message_id = ? 
              AND json_extract(data, '$.type') = 'text' 
            ORDER BY time_created ASC;
            """,
            (message_id,),
        )
        parts = cur.fetchall()
        conn.close()

        texts = [p[0] for p in parts if p[0]]
        if texts:
            return "\n\n".join(texts).strip()
    except Exception:
        pass
    return None

def get_response_from_pane(agent_name: str) -> str:
    code, stdout, _ = run_cmd(["herdr", "agent", "read", agent_name, "--source", "recent-unwrapped", "--lines", "60"])
    if code == 0 and stdout.strip():
        return stdout.strip()
    return "(No output received)"

def send_prompt_and_wait(agent_name: str, message: str, timeout_ms: int = 180000) -> str:
    start_time_ms = int(time.time() * 1000)
    agent_info = get_agent_info(agent_name)
    session_id = None
    if agent_info:
        session_id = agent_info.get("agent_session", {}).get("value")

    # herdr agent prompt <TARGET> <TEXT> --wait --timeout <MS>
    prompt_cmd = [
        "herdr", "agent", "prompt", agent_name, message,
        "--wait",
        "--timeout", str(timeout_ms)
    ]
    code, stdout, stderr = run_cmd(prompt_cmd, timeout=(timeout_ms // 1000) + 15)
    
    if code != 0:
        print(f"{YELLOW}[Warning]{RESET} herdr agent prompt exited with code {code}: {stderr.strip() or stdout.strip()}")

    # Small settle buffer
    time.sleep(1.5)

    # 1. Try DB first if session_id is available
    if session_id:
        text = get_last_assistant_text_from_db(session_id, after_timestamp_ms=start_time_ms - 2000)
        if text:
            return text

    # 2. Fallback to pane read
    return get_response_from_pane(agent_name)

def main():
    parser = argparse.ArgumentParser(description="Multi-agent conversation runner in Herdr.")
    parser.add_argument("--agent-a", default="architect", help="Name of first agent (default: architect)")
    parser.add_argument("--agent-b", default="developer", help="Name of second agent (default: developer)")
    parser.add_argument("--topic", default="", help="Initial conversation prompt or topic")
    parser.add_argument("--turns", type=int, default=4, help="Total turns of dialogue (default: 4)")
    parser.add_argument("--timeout", type=int, default=180000, help="Per-turn timeout in milliseconds")
    parser.add_argument("--log", default="dialogue_transcript.md", help="Path to markdown transcript file")
    args = parser.parse_args()

    agent_a = args.agent_a
    agent_b = args.agent_b
    turns = args.turns
    timeout_ms = args.timeout

    print(f"\n{BOLD}{CYAN}=== Herdr Multi-Agent Dialogue Runner ==={RESET}")
    print(f"{BLUE}Agent A:{RESET} {agent_a}")
    print(f"{GREEN}Agent B:{RESET} {agent_b}")
    print(f"{YELLOW}Planned turns:{RESET} {turns}")
    print(f"{MAGENTA}Transcript output:{RESET} {args.log}\n")

    # Verify both agents exist
    info_a = get_agent_info(agent_a)
    info_b = get_agent_info(agent_b)
    if not info_a:
        print(f"Error: Agent '{agent_a}' not found in Herdr. Run 'herdr agent list' to verify.")
        sys.exit(1)
    if not info_b:
        print(f"Error: Agent '{agent_b}' not found in Herdr. Run 'herdr agent list' to verify.")
        sys.exit(1)

    initial_topic = args.topic.strip()
    if not initial_topic:
        initial_topic = (
            "We are building a clean, modern developer portfolio website in this workspace (`/home/veer/projects/portfolio`). "
            "As the Architect, please propose the project architecture, tech stack (e.g. lightweight HTML/CSS/modern JS or Vite/React), "
            "key components (Hero, About, Projects, Tech Stack, Contact), and provide the first concrete specification for the Developer."
        )

    # Prepare markdown transcript
    with open(args.log, "w", encoding="utf-8") as f:
        f.write(f"# Herdr Multi-Agent Dialogue Transcript\n\n")
        f.write(f"- **Date**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"- **Agent A**: `{agent_a}`\n")
        f.write(f"- **Agent B**: `{agent_b}`\n\n")
        f.write(f"## Initial Topic\n\n> {initial_topic}\n\n---\n\n")

    current_speaker = agent_a
    next_speaker = agent_b
    current_prompt = initial_topic

    try:
        for turn in range(1, turns + 1):
            color = BLUE if current_speaker == agent_a else GREEN
            print(f"{BOLD}{color}[Turn {turn}/{turns}] {current_speaker.upper()} is thinking...{RESET}")
            
            response = send_prompt_and_wait(current_speaker, current_prompt, timeout_ms=timeout_ms)
            
            print(f"\n{BOLD}{color}[{current_speaker.upper()}]:{RESET}\n{response}\n")
            print(f"{DIM}{'-' * 60}{RESET}\n")

            # Write to transcript
            with open(args.log, "a", encoding="utf-8") as f:
                f.write(f"### Turn {turn}: {current_speaker.capitalize()}\n\n")
                f.write(f"{response}\n\n---\n\n")

            # Next speaker prompt
            current_prompt = (
                f"Your peer ({current_speaker}) responded:\n\n"
                f"\"{response}\"\n\n"
                f"Please reply to {current_speaker}. Share your feedback, implementation details, or next steps."
            )
            current_speaker, next_speaker = next_speaker, current_speaker

        print(f"\n{BOLD}{GREEN}✓ Dialogue completed successfully!{RESET}")
        print(f"Transcript saved to: {args.log}\n")

    except KeyboardInterrupt:
        print(f"\n{YELLOW}Dialogue paused by user (Ctrl+C). Transcript up to this point saved to {args.log}{RESET}")

if __name__ == "__main__":
    main()
