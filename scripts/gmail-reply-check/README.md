# Gmail 返信確認（API フォールバック）

Cloud Agent の Gmail MCP が注入されない場合の代替手段です。

## 使い方（オートメーション実行時）

1. `GetDynamicTools` に `gmail` が無い場合、このスクリプトを使う
2. 実行:

```bash
python3 scripts/gmail-reply-check/check_replies.py
```

3. 出力 JSON の `needs_reply` を確認
4. 1件以上あれば Slack に通知
5. 通知後、`/cursor/stores/automation/memories/notified-threads.json` に `thread_id` を追記

## 初回セットアップ（1回だけ）

### 1. Google Cloud で OAuth クライアントを作成

1. [Google Cloud Console](https://console.cloud.google.com/) でプロジェクトを作成
2. Gmail API を有効化
3. OAuth 同意画面を設定（内部 or 外部）
4. OAuth クライアント ID（デスクトップアプリ）を作成

### 2. 環境シークレットを登録

Cloud Agent 環境に以下を追加:

| Secret | 内容 |
| --- | --- |
| `GMAIL_CLIENT_ID` | OAuth クライアント ID |
| `GMAIL_CLIENT_SECRET` | OAuth クライアントシークレット |
| `GMAIL_REFRESH_TOKEN` | 下記手順で取得 |
| `GMAIL_OWNER_EMAIL` | `m.kanbara@genai.co.jp`（任意） |

### 3. リフレッシュトークン取得

ローカル PC で:

```bash
export GMAIL_CLIENT_ID="..."
export GMAIL_CLIENT_SECRET="..."
pip install -r scripts/gmail-reply-check/requirements.txt
python3 scripts/gmail-reply-check/auth_setup.py
```

表示された `GMAIL_REFRESH_TOKEN` を環境シークレットに保存。
