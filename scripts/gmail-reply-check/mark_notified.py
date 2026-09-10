#!/usr/bin/env python3
"""Append thread IDs to notified-threads.json after Slack notification."""

import json
import sys
from pathlib import Path

NOTIFIED_PATH = Path("/cursor/stores/automation/memories/notified-threads.json")


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: mark_notified.py <thread_id> [<thread_id> ...]", file=sys.stderr)
        return 1

    existing: set[str] = set()
    if NOTIFIED_PATH.exists():
        try:
            data = json.loads(NOTIFIED_PATH.read_text(encoding="utf-8"))
            existing = set(data.get("thread_ids", []))
        except (json.JSONDecodeError, OSError):
            existing = set()

    existing.update(sys.argv[1:])
    NOTIFIED_PATH.parent.mkdir(parents=True, exist_ok=True)
    from datetime import datetime, timezone

    NOTIFIED_PATH.write_text(
        json.dumps(
            {
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "thread_ids": sorted(existing),
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"updated": True, "count": len(existing)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
