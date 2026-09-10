#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RESULT_JSON="$(python3 "$SCRIPT_DIR/check_replies.py")"
echo "$RESULT_JSON"

if ! echo "$RESULT_JSON" | python3 -c 'import json,sys; d=json.load(sys.stdin); sys.exit(0 if d.get("ok") else 1)'; then
  exit 2
fi

COUNT=$(echo "$RESULT_JSON" | python3 -c 'import json,sys; print(len(json.load(sys.stdin).get("needs_reply", [])))')
if [ "$COUNT" -eq 0 ]; then
  exit 0
fi

echo "$RESULT_JSON" | python3 "$SCRIPT_DIR/format_slack_message.py"
