# README
転職用リポジトリ

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

Calling

<!-- プロジェクトについて -->

## プロジェクトについて

転職用リポジトリ


## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク     | バージョン |
| ----------------------| ---------- |
| React                 | 18.2.0     |
| Next.js               | 14.0.4     |
| typescript            | ^5         |
| Ruby                  | 2.7.8      |
| Rails                 | 6.0.6      |
| Docker                | 24.0.6     |
| swr                   | ^2.2.4     |
| yup                   | ^1.3.3     |
| chakra-ui             | ^2.8.2     |
| axios                 | ^1.6.2     |
| biomejs               | ^1.6.1     |
| MySQL                 | 8.0        |



## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
<!-- まだファイル構成は未完成です -->

❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
<pre>
calling
│               
├── backend
│   ├── app
│   │   └── channels/application_cable
│   │   └── controllers
│   │       └── attack_logs_controller.rb
│   │       └── authentication_controller.rb
│   │       └── companies_controller.rb
│   │       └── dashbords_controller.rb
│   │       └── key_persons_controller.rb
│   │       └── spreadsheets_controller.rb
│   │       └── users_controller.rb
│   │   └── jobs
│   │   └── mailers
│   │   └── models
│   │       └── application_record.rb
│   │       └── attack_log.rb
│   │       └── company.rb
│   │       └── key_person.rb
│   │       └── user.rb
│   │   └── views/layouts
│   ├── bin
│   │   └── bundle
│   │   └── rails
│   │   └── rake
│   │   └── setup
│   ├── config
│   │   └── initializers
│   │      └── cors.rb 
│   │   └── routes.rb
│   ├── db
│   │   └── schema.rb
│   ├── lib
│   │   └── google
│   │       └── spreadsheets.rb
│   ├── log
│   │   └── development.log
│   ├── public
│   │   └── robots.txt
│   ├── spec
│   │   ├── controllers
│   │   │   └── healthcheck_controller_spec.rb
│   │   ├── rails_helper.rb
│   │   └── spec_helper.rb
│   ├── storage
│   │   └── .keep
│   ├── test
│   │   ├── channels/application_cable
│   │   ├── controllers
│   │   ├── fixtures/files
│   │   ├── integration
│   │   ├── mailers
│   │   ├── models
│   │   └── test_helper.rb
│   ├── tmp
│   │   └── [一時ファイル]
│   ├── vendor
│   │   └── .keep
│   ├── .ruby-version
│   ├── Dockerfile
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── README.md
│   ├── Rakefile
│   ├── config.ru
│   └── .env.local
├── frontend
│   ├── node_modules
│   │   └── [依存関係のライブラリ]
│   ├── public
│   │   └── favicon.ico
│   │   └── next.svg
│   │   └── vercel.svg
│   ├── .vscode
│   │   └── settings.json
│   ├── components
│   │   ├── components
│   │   │   └── AttackLog
│   │   │      └── AttackLogCallResult.tsx
│   │   │      └── AttackLogCompany.tsx
│   │   │      └── AttackLogInfo.tsx
│   │   │      └── AttackLogKeyPerson.tsx
│   │   │      └── AttackLogCallHistory
│   │   │         └── AttackLogCallHistory.tsx
│   │   │         └── useSWRAttackLog.tsx
│   │   │   └── CompanyList
│   │   │      └── CompanyList.tsx
│   │   │      └── useSWRCompanyList.tsx
│   │   │   └── FilterComponents
│   │   │      └── FilterCallingResult.tsx
│   │   │      └── FilterCompany.tsx
│   │   │      └── FilterCompanyIndustry.tsx
│   │   │      └── FilterCompanyNumber.tsx
│   │   │      └── FilterNextCallingDay.tsx
│   │   │      └── FilterSalesman.tsx
│   │   ├── Header.tsx
│   │   ├── Import.tsx
│   │   ├── Layout.tsx
│   │   ├── LoginInfo.tsx
│   │   ├── Logout.tsx
│   │   └── RegisterInfo.tsx
│   ├── pages
│   │   ├── api
│   │   │   └──auth
│   │   │      └── [...nextauth].ts
│   │   │      └── hello.ts
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── attacklog.tsx
│   │   ├── company-resister.tsx
│   │   ├── dashboard.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   └── interface.ts
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── biome.json
│   ├── tailwind.config.ts
│   ├── postcss.config
│   └── yarn.lock
├── .gitignore
├── README.md
├── er .drawio.png
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
