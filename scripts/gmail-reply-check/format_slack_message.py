#!/usr/bin/env python3
"""Format Gmail reply-check JSON into a Slack message."""

import json
import sys
from datetime import datetime


def format_received_at(value: str | None) -> str:
    if not value:
        return "不明"
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return dt.astimezone().strftime("%Y-%m-%d %H:%M")
    except ValueError:
        return value


def main() -> int:
    payload = json.load(sys.stdin)
    items = payload.get("needs_reply", [])
    if not items:
        return 0

    lines = [f"*Gmail 返信が必要なメール ({len(items)}件)*", ""]
    for index, item in enumerate(items, start=1):
        deadline = item.get("suggested_deadline")
        deadline_text = f"\n   推奨返信期限: {deadline}" if deadline else ""
        lines.extend(
            [
                f"{index}. *{item.get('subject', '(件名なし)')}*",
                f"   送信者: {item.get('from', '不明')}",
                f"   受信: {format_received_at(item.get('received_at'))}",
                f"   要約: {item.get('summary', '')}{deadline_text}",
                f"   <{item.get('thread_url', '')}|Gmailで開く>",
                "",
            ]
        )
    print("\n".join(lines).rstrip())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
