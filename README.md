# My Bookmarks

## 概要
Googleアカウントでログインして、お気に入りのWebサイトを管理できるブックマークアプリ。
URLとメモを保存し、カテゴリ別に整理・検索できます。

## 技術スタック

### フロントエンド
- **Next.js 16** - Reactフレームワーク（App Router）
- **React 19** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **shadcn/ui** - 再利用可能なUIコンポーネント

### バックエンド・認証
- **Supabase** - BaaS（Backend as a Service）
  - PostgreSQL データベース
  - Google OAuth認証
  - Row Level Security (RLS)

### デプロイ
- **Vercel** - ホスティング・CI/CD

## データベース設計

### bookmarks テーブル
| カラム名 | 型 | 説明 |
|---------|-----|------|
| id | UUID | 主キー |
| user_id | UUID | ユーザーID（外部キー） |
| title | TEXT | ブックマークのタイトル |
| url | TEXT | ブックマークのURL |
| description | TEXT | メモ・説明 |
| category | TEXT | カテゴリ |
| created_at | TIMESTAMPTZ | 作成日時 |
| updated_at | TIMESTAMPTZ | 更新日時 |

### RLSポリシー
- ユーザーは自分のブックマークのみ閲覧・編集・削除可能
- 認証されていないユーザーはアクセス不可

## 環境変数

`.env.local` を作成し、以下の変数を設定してください。

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | SupabaseプロジェクトのURL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabaseの匿名公開キー |

Supabaseダッシュボード → Project Settings → API から取得できます。

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/<your-username>/my-bookmarks.git
cd my-bookmarks

# 依存パッケージをインストール
npm install

# 環境変数ファイルを作成
cp .env.local.example .env.local
# .env.local を編集して Supabase の URL と ANON_KEY を設定

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 開発コマンド

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動（Turbopack使用） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLintを実行 |

> **注意（Next.js 16）**: `next build` はデフォルトでlintを自動実行しません。デプロイ前に必ず `npm run lint` を別途実行してください。

## ディレクトリ構成（予定）

```
my-bookmarks/
├── app/                    # App Router ページ・レイアウト
│   ├── (auth)/             # 認証関連ページ
│   └── (dashboard)/        # 認証後ページ
├── components/             # 再利用可能なUIコンポーネント
├── lib/
│   └── supabase/           # Supabaseクライアント（Server/Client/Middleware）
├── types/                  # TypeScript型定義
├── middleware.ts            # 認証ミドルウェア
└── .claude/                # Claude向け開発ドキュメント
```

## 機能一覧

- [x] Googleアカウントでのログイン・ログアウト
- [x] ブックマークの追加（URL・タイトル・メモ・カテゴリ）
- [x] ブックマーク一覧表示
- [x] ブックマークの編集・削除
- [x] カテゴリによるフィルタリング
- [x] キーワード検索
- [ ] Vercelへのデプロイ