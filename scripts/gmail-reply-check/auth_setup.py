#!/usr/bin/env python3
"""One-time OAuth helper to obtain GMAIL_REFRESH_TOKEN for the fallback checker."""

from __future__ import annotations

import json
import os

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def main() -> None:
    client_id = os.environ.get("GMAIL_CLIENT_ID")
    client_secret = os.environ.get("GMAIL_CLIENT_SECRET")
    if not client_id or not client_secret:
        raise SystemExit(
            "Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET before running this script."
        )

    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"],
        }
    }

    flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
    creds = flow.run_local_server(port=0)

    print("Add these values to the Cloud Agent environment secrets:")
    print(json.dumps({"GMAIL_REFRESH_TOKEN": creds.refresh_token}, indent=2))


if __name__ == "__main__":
    main()
