#!/usr/bin/env python3
"""One-time helper to obtain a Gmail API refresh token for automation secrets."""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer

SCOPES = "https://www.googleapis.com/auth/gmail.readonly"
REDIRECT_URI = "http://localhost:8765/oauth2callback"


class OAuthHandler(BaseHTTPRequestHandler):
    code: str | None = None

    def do_GET(self) -> None:  # noqa: N802
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != "/oauth2callback":
            self.send_response(404)
            self.end_headers()
            return
        query = urllib.parse.parse_qs(parsed.query)
        OAuthHandler.code = query.get("code", [None])[0]
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Authorization complete. You can close this tab.")

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        return


def build_auth_url(client_id: str) -> str:
    params = urllib.parse.urlencode(
        {
            "client_id": client_id,
            "redirect_uri": REDIRECT_URI,
            "response_type": "code",
            "scope": SCOPES,
            "access_type": "offline",
            "prompt": "consent",
        }
    )
    return f"https://accounts.google.com/o/oauth2/v2/auth?{params}"


def exchange_code(client_id: str, client_secret: str, code: str) -> dict:
    body = urllib.parse.urlencode(
        {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code",
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        "https://oauth2.googleapis.com/token",
        data=body,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def extract_code(value: str) -> str:
    value = value.strip()
    if "code=" in value:
        parsed = urllib.parse.urlparse(value)
        query = urllib.parse.parse_qs(parsed.query)
        code = query.get("code", [None])[0]
        if code:
            return code
    return value


def print_secrets(client_id: str, client_secret: str, refresh_token: str) -> None:
    print("\nAdd these to Cloud Agent environment secrets:")
    print(f"GMAIL_CLIENT_ID={client_id}")
    print(f"GMAIL_CLIENT_SECRET={client_secret}")
    print(f"GMAIL_REFRESH_TOKEN={refresh_token}")
    print(f"GMAIL_OWNER_EMAIL={os.environ.get('GMAIL_OWNER_EMAIL', 'm.kanbara@genai.co.jp')}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Obtain Gmail API refresh token")
    parser.add_argument(
        "--code",
        help="Authorization code or full redirect URL (skip local server)",
    )
    parser.add_argument(
        "--no-browser",
        action="store_true",
        help="Print auth URL only; do not open browser automatically",
    )
    args = parser.parse_args()

    client_id = os.environ.get("GMAIL_CLIENT_ID", "").strip()
    client_secret = os.environ.get("GMAIL_CLIENT_SECRET", "").strip()
    if not client_id or not client_secret:
        print(
            "Set GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET first.\n"
            "Create an OAuth client in Google Cloud Console (Desktop app).",
            file=sys.stderr,
        )
        return 1

    auth_url = build_auth_url(client_id)

    if args.code:
        code = extract_code(args.code)
    else:
        print("1. Open this URL in your browser and sign in:")
        print(auth_url)
        print("\n2. After approving access, the browser will redirect to localhost.")
        print("   If the page fails to load, copy the full URL from the address bar.")
        print("   Then run: python3 get_refresh_token.py --code 'PASTE_URL_HERE'\n")
        if not args.no_browser:
            webbrowser.open(auth_url)

        server = HTTPServer(("127.0.0.1", 8765), OAuthHandler)
        print("Waiting for authorization on http://localhost:8765 ...")
        server.handle_request()
        code = OAuthHandler.code
        if not code:
            print("No authorization code received.", file=sys.stderr)
            return 1

    payload = exchange_code(client_id, client_secret, code)
    refresh_token = payload.get("refresh_token")
    if not refresh_token:
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        print("No refresh_token returned. Re-run with prompt=consent.", file=sys.stderr)
        return 1

    print_secrets(client_id, client_secret, refresh_token)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
