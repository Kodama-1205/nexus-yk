# Nexus-YK

児玉勇輝（静岡県三島市拠点）の個人ポートフォリオ兼アプリ集約サイト（Phase 1）です。

## セットアップ手順

前提:

- Node.js 18 以上（推奨: 20 以上）
- npm

手順:

1. 依存関係のインストール

```bash
npm install
```

2. 開発サーバー起動

```bash
npm run dev
```

3. ブラウザで `http://localhost:3000` を開く

### 環境変数（Phase 1）

Phase 1 では **アプリ本体は環境変数を参照しません**（認証・決済・DB なし）。

将来の拡張用に `.env.example` のみ置いています。ローカルで値を試す場合は `.env.local` を作成してください（`.gitignore` で除外されます）。

## ディレクトリ説明（主要）

- `app/`: Next.js App Router のページ・レイアウト
  - `app/page.tsx`: トップ（ヒーロー＋注目アプリ）
  - `app/apps/page.tsx`: アプリ一覧（カテゴリフィルタはクライアント）
  - `app/apps/[slug]/page.tsx`: アプリ詳細（SSG）
  - `app/marketplace/page.tsx`: マーケットプレイス（準備中）
  - `app/legal/*`: 法務ページ雛形
- `components/`: 再利用 UI（Header / Footer / Hero / Card / Badge / 一覧クライアント）
- `lib/types.ts`: アプリ情報の型
- `lib/apps-data.ts`: アプリ情報の静的データと取得関数
- `public/apps/`: スクリーンショット（現状は SVG プレースホルダ）

## 品質チェック

```bash
npm run lint
npm run build
```

## Vercel デプロイ（前提）

1. GitHub にリポジトリを作成して push
2. Vercel で Import（Framework: Next.js）
3. 当面の URL 例: `https://nexus-yk.vercel.app/`

Phase 1 は環境変数設定なしでもデプロイ可能な想定です。

## Phase 2 以降の拡張ポイント（実装方針）

- **Supabase 化**: `lib/apps-data.ts` の `getAllApps()` / `getAppBySlug()` を DB クエリに差し替え（型 `AppItem` は維持）
- **認証**: `components/Header.tsx` にログイン導線を追加（UI の余白は確保済み）
- **Stripe 決済**: `app/marketplace/[slug]/page.tsx` を追加し、商品詳細と購入フローを実装
- **保存機能（無料枠・買い切り）**: `app/dashboard/` など新規ルートを追加

## ライセンス

リポジトリ管理者の方針に従ってください（未設定の場合は後で追記）。
