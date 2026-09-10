#!/usr/bin/env python3
"""Gmail reply-check fallback when Gmail MCP is unavailable in Cloud Agent runs."""

from __future__ import annotations

import base64
import json
import os
import re
import sys
from datetime import datetime, timezone
from email.utils import parseaddr
from pathlib import Path
from typing import Any

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

OWNER_EMAIL = os.environ.get("GMAIL_OWNER_EMAIL", "m.kanbara@genai.co.jp")
NOTIFIED_THREADS_PATH = Path(
    os.environ.get(
        "GMAIL_NOTIFIED_THREADS_PATH",
        "/cursor/stores/automation/memories/notified-threads.json",
    )
)
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

NO_REPLY_PATTERNS = [
    r"noreply",
    r"no-reply",
    r"donotreply",
    r"do-not-reply",
    r"mailer-daemon",
    r"notifications?@",
    r"newsletter",
    r"marketing",
    r"promo(tion)?@",
    r"bounce@",
    r"unsubscribe",
]

AUTOMATED_SUBJECT_PATTERNS = [
    r"\[自動通知\]",
    r"automatic notification",
    r"security alert",
    r"sign[- ]in",
    r"verification code",
    r"パスワード",
    r"認証コード",
]

REQUEST_HINT_PATTERNS = [
    r"\?",
    r"確認",
    r"教えて",
    r"お願い",
    r"依頼",
    r"承認",
    r"ご確認",
    r"いかがでしょうか",
    r"可能でしょうか",
    r"deadline",
    r"期限",
    r"までに",
    r"please",
    r"could you",
    r"can you",
    r"would you",
    r"approval",
    r"review",
    r"feedback",
]


def load_credentials() -> Credentials:
    client_id = os.environ.get("GMAIL_CLIENT_ID")
    client_secret = os.environ.get("GMAIL_CLIENT_SECRET")
    refresh_token = os.environ.get("GMAIL_REFRESH_TOKEN")

    missing = [
        name
        for name, value in [
            ("GMAIL_CLIENT_ID", client_id),
            ("GMAIL_CLIENT_SECRET", client_secret),
            ("GMAIL_REFRESH_TOKEN", refresh_token),
        ]
        if not value
    ]
    if missing:
        raise RuntimeError(
            "Missing Gmail API credentials: "
            + ", ".join(missing)
            + ". Run scripts/gmail-reply-check/auth_setup.py once and add secrets to the environment."
        )

    creds = Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret,
        scopes=SCOPES,
    )
    creds.refresh(Request())
    return creds


def load_notified_threads() -> set[str]:
    if not NOTIFIED_THREADS_PATH.exists():
        return set()
    try:
        data = json.loads(NOTIFIED_THREADS_PATH.read_text(encoding="utf-8"))
        return set(data.get("thread_ids", []))
    except (json.JSONDecodeError, OSError):
        return set()


def save_notified_threads(thread_ids: set[str]) -> None:
    NOTIFIED_THREADS_PATH.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "thread_ids": sorted(thread_ids),
    }
    NOTIFIED_THREADS_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def header_value(headers: list[dict[str, str]], name: str) -> str:
    for header in headers:
        if header.get("name", "").lower() == name.lower():
            return header.get("value", "")
    return ""


def decode_body(payload: dict[str, Any]) -> str:
    if "body" in payload and payload["body"].get("data"):
        return base64.urlsafe_b64decode(payload["body"]["data"]).decode(
            "utf-8", errors="replace"
        )

    for part in payload.get("parts", []):
        mime_type = part.get("mimeType", "")
        if mime_type == "text/plain" and part.get("body", {}).get("data"):
            return base64.urlsafe_b64decode(part["body"]["data"]).decode(
                "utf-8", errors="replace"
            )
        if part.get("parts"):
            nested = decode_body(part)
            if nested:
                return nested
    return ""


def matches_any(text: str, patterns: list[str]) -> bool:
    lowered = text.lower()
    return any(re.search(pattern, lowered, re.IGNORECASE) for pattern in patterns)


def extract_email_address(value: str) -> str:
    _, email = parseaddr(value)
    return email.lower()


def is_direct_to_me(headers: list[dict[str, str]]) -> bool:
    to_header = header_value(headers, "To")
    cc_header = header_value(headers, "Cc")
    owner = OWNER_EMAIL.lower()
    return owner in to_header.lower() or owner in cc_header.lower()


def summarize_text(text: str, max_len: int = 180) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip()
    if len(cleaned) <= max_len:
        return cleaned
    return cleaned[: max_len - 1] + "…"


def infer_deadline(subject: str, body: str) -> str | None:
    combined = f"{subject}\n{body}"
    patterns = [
        r"(\d{4}[/-]\d{1,2}[/-]\d{1,2})",
        r"(\d{1,2}月\d{1,2}日)",
        r"(by\s+\w+\s+\d{1,2})",
        r"(期限[:：]\s*[^\n]+)",
        r"(までに)",
    ]
    for pattern in patterns:
        match = re.search(pattern, combined, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    return None


def thread_needs_reply(service: Any, thread: dict[str, Any]) -> dict[str, Any] | None:
    messages = thread.get("messages", [])
    if not messages:
        return None

    latest = messages[-1]
    headers = latest.get("payload", {}).get("headers", [])
    from_value = header_value(headers, "From")
    from_email = extract_email_address(from_value)
    subject = header_value(headers, "Subject") or "(件名なし)"
    date_header = header_value(headers, "Date")
    body = decode_body(latest.get("payload", {}))
    labels = set(latest.get("labelIds", []))

    if from_email == OWNER_EMAIL.lower():
        return None
    if "DRAFT" in labels:
        return None
    if not is_direct_to_me(headers):
        return None
    if matches_any(from_email, NO_REPLY_PATTERNS):
        return None
    if matches_any(subject, AUTOMATED_SUBJECT_PATTERNS):
        return None
    if matches_any(body[:500], AUTOMATED_SUBJECT_PATTERNS):
        return None

    needs_reply = (
        "UNREAD" in labels
        or matches_any(subject, REQUEST_HINT_PATTERNS)
        or matches_any(body[:1000], REQUEST_HINT_PATTERNS)
    )
    if not needs_reply:
        return None

    thread_id = thread.get("id", "")
    internal_date_ms = int(latest.get("internalDate", "0"))
    received_at = datetime.fromtimestamp(
        internal_date_ms / 1000, tz=timezone.utc
    ).isoformat()

    return {
        "thread_id": thread_id,
        "subject": subject,
        "from": from_value,
        "received_at": received_at,
        "received_at_display": date_header,
        "summary": summarize_text(body or subject),
        "deadline": infer_deadline(subject, body),
        "gmail_url": f"https://mail.google.com/mail/u/0/#inbox/{thread_id}",
        "unread": "UNREAD" in labels,
    }


def fetch_threads(service: Any, query: str, max_results: int = 20) -> list[dict[str, Any]]:
    response = (
        service.users()
        .threads()
        .list(userId="me", q=query, maxResults=max_results)
        .execute()
    )
    thread_ids = [item["id"] for item in response.get("threads", [])]
    threads: list[dict[str, Any]] = []
    for thread_id in thread_ids:
        thread = (
            service.users()
            .threads()
            .get(userId="me", id=thread_id, format="full")
            .execute()
        )
        threads.append(thread)
    return threads


def main() -> int:
    creds = load_credentials()
    service = build("gmail", "v1", credentials=creds, cache_discovery=False)
    notified = load_notified_threads()

    queries = [
        "in:inbox newer_than:1h",
        "in:inbox newer_than:1d",
    ]

    candidates: dict[str, dict[str, Any]] = {}
    for query in queries:
        for thread in fetch_threads(service, query):
            result = thread_needs_reply(service, thread)
            if not result:
                continue
            if result["thread_id"] in notified:
                continue
            candidates[result["thread_id"]] = result
        if candidates:
            break

    output = {
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "owner_email": OWNER_EMAIL,
        "method": "gmail_api_fallback",
        "needs_reply": list(candidates.values()),
        "notified_thread_count": len(notified),
    }
    print(json.dumps(output, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001
        print(
            json.dumps(
                {
                    "error": str(exc),
                    "method": "gmail_api_fallback",
                    "needs_reply": [],
                },
                ensure_ascii=False,
                indent=2,
            )
        )
        raise SystemExit(1)
