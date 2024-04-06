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
  <img src="https://camo.qiitausercontent.com/f7e5d6d8c1221de3bf6584e07eba39d4b9dbdffb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4d7953514c2d3434373941312e7376673f6c6f676f3d6d7973716c267374796c653d666f722d7468652d6261646765266c6f676f436f6c6f723d7768697465">
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
| MySQL                 | 8.0        |



## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
<!-- まだファイル構成は未完成です -->

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
| `docker-compose down`           | 全てのサービスを停止し、コンテナを削除                              　      |
| `docker-compose up front`       | フロントエンドのみ起動                              　　　　　　　　　　　　　　　　　　　　　　　　　　　      |
| `docker-compose up api`         | バックエンドのみ起動                              　　　　　　　　　　　　　　　　　　　　　　　　　　　      |
| `docker exec -it portfolio_front sh`     | フロントエンドのコンテナ内へ遷移                        　　　　     |
| `docker exec -it portfolio_api bash`     | バックエンドのコンテナ内へ遷移                        　　　　     |


## テーブル定義書のリンク
https://docs.google.com/spreadsheets/d/1jenMacEMAW08iC4_F8_qNn9_tZ8fSMJw2BFogfYH4nA/edit#gid=1195158703

## Figmaのリンク
https://www.figma.com/file/AD9a5VvgCeJNSPv0xaavGC/%E7%84%A1%E9%A1%8C?type=design&node-id=0%3A1&mode=design&t=LFzXkPFWACqmnHb1-1
