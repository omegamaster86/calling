# mouretsu-standardization
猛烈テンプレートリポジトリ

<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-Ruby-CC342D.svg?logo=ruby&style=for-the-badge">
  <!-- バックエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Rails-CC0000.svg?logo=rails&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-20232A.svg?logo=docker&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

猛烈スタンダードリポジトリ

<!-- プロジェクトについて -->

## プロジェクトについて

猛烈内で開発する際に、このリポジトリをクローンして開発を進めるスタンダードリポジトリ


## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク     | バージョン |
| ----------------------| ---------- |
| React                 | 18.2.0     |
| Next.js               | 14.0.4     |
| Ruby                  | 3.2.2      |
| Rails                 | 7.2.3      |
| Docker                | 24.0.7     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください


## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
<!-- まだファイル構成は未完成です -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
<pre>
.
├── .github
│   ├── workflows
│       └── actionlint.yml
│       └── ai-pr-reviewer.yml
├── backend
│   ├── app
│   │   └── channels/application_cable
│   │   └── controllers
│   │   └── jobs
│   │   └── mailers
│   │   └── models
│   │   └── views/layouts
│   ├── bin
│   │   └── bundle
│   │   └── rails
│   │   └── rake
│   │   └── setup
│   ├── config
│   │   └── [アプリケーションの設定ファイル]
│   ├── db
│   │   └── Schemafile
│   │   └── schema.rb
│   ├── lib/tasks
│   │   └── .keep
│   ├── log
│   │   └── .keep
│   ├── public
│   │   └── robots.txt
│   ├── spec
│   │   ├── controllers
│   │   │   └── healthcheck_controller_spec.rb
│   │   ├── rails_helper.rb
│   │   └── spec_helper.rb
│   ├── storage
│   │   └── [アップロードされたファイルのストレージ]
│   ├── test
│   │   ├── channels/application_cable
│   │   ├── controllers
│   │   │   └── healthcheck_controller_test.rb
│   │   ├── fixtures/files
│   │   ├── integration
│   │   ├── mailers
│   │   ├── models
│   │   └── test_helper.rb
│   ├── tmp
│   │   └── [一時ファイル]
│   ├── vendor
│   │   └── [サードパーティのコード]
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .rspec
│   ├── .rubocop.yaml
│   ├── .ruby-version
│   ├── Dockerfile
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── README.md
│   ├── Rakefile
│   └── config.ru
│   └── entrypoint.sh
├── frontend
│   ├── node_modules
│   │   └── [依存関係のライブラリ]
│   ├── public
│   │   └── favicon.ico
│   │   └── next.svg
│   │   └── vercel.svg
│   ├── src
│   │   ├── components
│   │   │   └── CreateTodoForm.tsx
│   │   │   └── DeleteTodoButton.tsx
│   │   │   └── EditTodoForm.tsx
│   │   │   └── Todo.tsx
│   │   │   └── Todos.tsx
│   │   ├── pages
│   │   │   └── _app.tsx
│   │   │   └── _document.tsx
│   │   │   ├── api
│   │   │   │   ├── auth
│   │   │   │   │   └── [...nextauth].ts
│   │   │   │   └── hello.ts
│   │   │   ├── todos
│   │   │   │   ├── [id]
│   │   │   │   │   └── edit.tsx
│   │   │   │   │   └── index.tsx
│   │   │   └── index.tsx
│   │   │   └── login.tsx
│   │   ├── styles
│   │   │   └── globals.css
│   │   │   └── Home.module.css
│   │   ├── types
│   │   │   └── Todo.ts
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── yarn.lock
├── .gitignore
├── README.md
└── docker-compose.yml
</pre>



## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

以下のショートカットでサーバを停止することができます

 MacBook: control + C<br/>
 Windows: ctrl + Q

### コマンド一覧

| Make                            | 実行する処理                                                            |                                                                                
| ------------------------------- | ----------------------------------------------------------------------- | 
| `docker-compose up --build`     | Dockerコンテナでサーバの立ち上げ                                       |
| `docker exec -it mouretsu_backend /bin/bash`  | mouretsu_backend コンテナに入る                                         |
| `docker exec -it mouretsu_frontend /bin/sh`   | mouretsu_frontend コンテナに入る                                        |
| `docker exec -it mouretsu_db bash`            | mouretsu_db コンテナに入る                                              |
| `docker-compose down`           | 全てのサービスを停止し、コンテナを削除                                       |

テーブル定義書のリンク

Figmaのリンク