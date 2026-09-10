#!/usr/bin/env python3
"""Gmail reply-check fallback when Gmail MCP is unavailable in Cloud Agent."""

from __future__ import annotations

import base64
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from email.utils import parseaddr
from pathlib import Path

DEFAULT_OWNER = "m.kanbara@genai.co.jp"
NOTIFIED_PATH = Path("/cursor/stores/automation/memories/notified-threads.json")
HOURS_LOOKBACK = int(os.environ.get("GMAIL_LOOKBACK_HOURS", "24"))

NO_REPLY_PATTERNS = re.compile(
    r"(no[-_.]?reply|noreply|donotreply|do[-_.]?not[-_.]?reply|mailer-daemon|"
    r"newsletter|unsubscribe|marketing|notification@|notifications@|"
    r"alert@|alerts@|bounce@|postmaster@)",
    re.IGNORECASE,
)
AUTO_SUBJECT_PATTERNS = re.compile(
    r"(自動送信|配信専用|メルマガ|ニュースレター|promotional|unsubscribe|"
    r"your (order|receipt|invoice) has|password reset|verify your email)",
    re.IGNORECASE,
)
REQUEST_PATTERNS = re.compile(
    r"(\?|？|please|お願い|依頼|確認|承認|approve|review|feedback|"
    r"deadline|期限|まで|返信|ご連絡|教えて|可能ですか|いかがでしょう|"
    r"could you|can you|would you|let me know)",
    re.IGNORECASE,
)
DEADLINE_PATTERNS = [
    (re.compile(r"(\d{4}[/-]\d{1,2}[/-]\d{1,2})", re.IGNORECASE), "日付"),
    (re.compile(r"(\d{1,2}月\d{1,2}日)", re.IGNORECASE), "日付"),
    (re.compile(r"(by\s+(monday|tuesday|wednesday|thursday|friday|tomorrow|eod|end of day))", re.IGNORECASE), "期限"),
    (re.compile(r"(本日|明日|今週|来週|までに)", re.IGNORECASE), "期限"),
]


class ConfigError(Exception):
    pass


def load_notified_thread_ids() -> set[str]:
    if not NOTIFIED_PATH.exists():
        return set()
    try:
        data = json.loads(NOTIFIED_PATH.read_text(encoding="utf-8"))
        return set(data.get("thread_ids", []))
    except (json.JSONDecodeError, OSError):
        return set()


def save_notified_thread_ids(thread_ids: set[str]) -> None:
    NOTIFIED_PATH.parent.mkdir(parents=True, exist_ok=True)
    NOTIFIED_PATH.write_text(
        json.dumps(
            {
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "thread_ids": sorted(thread_ids),
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise ConfigError(f"Missing required environment variable: {name}")
    return value


def get_access_token() -> str:
    client_id = require_env("GMAIL_CLIENT_ID")
    client_secret = require_env("GMAIL_CLIENT_SECRET")
    refresh_token = require_env("GMAIL_REFRESH_TOKEN")
    body = urllib.parse.urlencode(
        {
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        }
    ).encode("utf-8")
    request = urllib.request.Request(
        "https://oauth2.googleapis.com/token",
        data=body,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))
    token = payload.get("access_token")
    if not token:
        raise RuntimeError(f"Token refresh failed: {payload}")
    return token


def gmail_request(access_token: str, path: str, query: str | None = None) -> dict:
    url = f"https://gmail.googleapis.com/gmail/v1{path}"
    if query:
        url = f"{url}?{urllib.parse.urlencode(query)}"
    request = urllib.request.Request(
        url,
        headers={"Authorization": f"Bearer {access_token}"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def decode_header_value(value: str) -> str:
    return value or ""


def get_header(headers: list[dict], name: str) -> str:
    for header in headers:
        if header.get("name", "").lower() == name.lower():
            return decode_header_value(header.get("value", ""))
    return ""


def extract_body(payload: dict) -> str:
    mime_type = payload.get("mimeType", "")
    body_data = payload.get("body", {}).get("data")
    if body_data and mime_type in ("text/plain", "text/html"):
        try:
            return base64.urlsafe_b64decode(body_data + "==").decode("utf-8", errors="replace")
        except Exception:
            return ""
    parts = payload.get("parts", []) or []
    plain = ""
    html = ""
    for part in parts:
        part_type = part.get("mimeType", "")
        part_data = part.get("body", {}).get("data")
        if not part_data:
            nested = extract_body(part)
            if nested:
                return nested
            continue
        try:
            decoded = base64.urlsafe_b64decode(part_data + "==").decode("utf-8", errors="replace")
        except Exception:
            continue
        if part_type == "text/plain" and not plain:
            plain = decoded
        elif part_type == "text/html" and not html:
            html = decoded
    return plain or html


def normalize_email(value: str) -> str:
    _, email = parseaddr(value)
    return email.lower().strip()


def parse_internal_date(ms: str | int | None) -> datetime | None:
    if ms is None:
        return None
    try:
        return datetime.fromtimestamp(int(ms) / 1000, tz=timezone.utc)
    except (TypeError, ValueError):
        return None


def suggest_deadline(text: str) -> str | None:
    for pattern, label in DEADLINE_PATTERNS:
        match = pattern.search(text)
        if match:
            return f"{label}: {match.group(1)}"
    return None


def summarize(subject: str, body: str) -> str:
    cleaned = re.sub(r"\s+", " ", body).strip()
    cleaned = re.sub(r"<[^>]+>", " ", cleaned)
    snippet = cleaned[:240] if cleaned else subject
    if len(cleaned) > 240:
        snippet += "..."
    return snippet


def is_excluded_sender(from_header: str, owner_email: str) -> bool:
    sender = normalize_email(from_header)
    if not sender:
        return True
    if sender == owner_email.lower():
        return True
    if NO_REPLY_PATTERNS.search(sender):
        return True
    local = sender.split("@", 1)[0]
    if NO_REPLY_PATTERNS.search(local):
        return True
    return False


def looks_like_request(subject: str, body: str) -> bool:
    text = f"{subject}\n{body}"
    if AUTO_SUBJECT_PATTERNS.search(subject):
        return False
    if REQUEST_PATTERNS.search(text):
        return True
    return "?" in subject or "？" in subject


def thread_needs_reply(thread: dict, owner_email: str) -> dict | None:
    messages = sorted(thread.get("messages", []), key=lambda m: int(m.get("internalDate", 0)))
    if not messages:
        return None

    latest = messages[-1]
    latest_headers = latest.get("payload", {}).get("headers", [])
    from_header = get_header(latest_headers, "From")
    subject = get_header(latest_headers, "Subject") or "(件名なし)"
    to_header = get_header(latest_headers, "To")
    cc_header = get_header(latest_headers, "Cc")
    date = parse_internal_date(latest.get("internalDate"))
    body = extract_body(latest.get("payload", {}))
    labels = set(latest.get("labelIds", []) or [])

    if normalize_email(from_header) == owner_email.lower():
        return None
    if is_excluded_sender(from_header, owner_email):
        return None
    if "SPAM" in labels or "TRASH" in labels or "CATEGORY_PROMOTIONS" in labels:
        return None

    recipients = f"{to_header} {cc_header}".lower()
    owner_local = owner_email.split("@", 1)[0]
    if owner_email.lower() not in recipients and owner_local not in recipients:
        # still allow direct inbox messages where user is primary recipient via inbox label
        if "INBOX" not in labels:
            return None

    if not looks_like_request(subject, body):
        return None

    thread_id = thread.get("id", "")
    return {
        "thread_id": thread_id,
        "subject": subject,
        "from": from_header,
        "received_at": date.isoformat() if date else None,
        "summary": summarize(subject, body),
        "suggested_deadline": suggest_deadline(f"{subject}\n{body}"),
        "thread_url": f"https://mail.google.com/mail/u/0/#inbox/{thread_id}",
        "unread": "UNREAD" in labels,
    }


def fetch_candidate_threads(access_token: str) -> list[str]:
    query = f"in:inbox newer_than:{max(HOURS_LOOKBACK // 24, 1)}d"
    response = gmail_request(
        access_token,
        "/users/me/threads",
        {
            "q": query,
            "maxResults": "50",
        },
    )
    return [item["id"] for item in response.get("threads", []) if item.get("id")]


def main() -> int:
    owner_email = os.environ.get("GMAIL_OWNER_EMAIL", DEFAULT_OWNER).strip().lower()
    notified = load_notified_thread_ids()

    try:
        access_token = get_access_token()
    except ConfigError as exc:
        print(
            json.dumps(
                {
                    "ok": False,
                    "error": str(exc),
                    "needs_reply": [],
                    "hint": "Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN in Cloud Agent environment secrets.",
                },
                ensure_ascii=False,
            )
        )
        return 2
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(json.dumps({"ok": False, "error": f"OAuth failed: {body}", "needs_reply": []}, ensure_ascii=False))
        return 2

    needs_reply: list[dict] = []
    try:
        thread_ids = fetch_candidate_threads(access_token)
        for thread_id in thread_ids:
            if thread_id in notified:
                continue
            thread = gmail_request(
                access_token,
                f"/users/me/threads/{thread_id}",
                {"format": "full"},
            )
            item = thread_needs_reply(thread, owner_email)
            if item:
                needs_reply.append(item)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(json.dumps({"ok": False, "error": f"Gmail API failed: {body}", "needs_reply": []}, ensure_ascii=False))
        return 1

    result = {
        "ok": True,
        "owner_email": owner_email,
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "lookback_hours": HOURS_LOOKBACK,
        "needs_reply": needs_reply,
        "notified_excluded_count": len(notified),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
