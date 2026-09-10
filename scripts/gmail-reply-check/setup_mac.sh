#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if [[ -z "${GMAIL_CLIENT_ID:-}" || -z "${GMAIL_CLIENT_SECRET:-}" ]]; then
  echo "Error: Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET first."
  echo ""
  echo "Example:"
  echo "  export GMAIL_CLIENT_ID=your-client-id"
  echo "  export GMAIL_CLIENT_SECRET=your-client-secret"
  echo "  ./setup_mac.sh"
  exit 1
fi

echo "Starting Gmail OAuth setup..."
python3 get_refresh_token.py
