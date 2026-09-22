/**
 * アプリ情報の一元管理（Phase 1 は静的配列）。
 * Phase 2 で Supabase 等に移行する場合は、`getAllApps` / `getAppBySlug` の実装だけ差し替えます。
 */

import type { AppItem } from './types';

/**
 * 掲載アプリのマスターデータです。
 * README / package.json / 公開ページの metadata から確認できた事実のみ記載し、
 * 推測で埋めた項目は入れていません。
 */
const apps: AppItem[] = [
  {
    slug: 'design2code-studio',
    name: 'Design2Code Studio',
    shortDescription:
      'デザインデータ（Figma など）から HTML/CSS/JavaScript などのコードを生成する Web アプリ。',
    longDescription: [
      'Design2Code Studio は、デザインデータ（Figma など）から HTML/CSS/JavaScript などのコードを生成することを目的とした Web アプリケーションです。',
      'README に記載のある主な機能として、Figma URL を入力したコード生成（README 上は現状モックパイプラインとの記載）、結果画面でのプレビュー・コード・レポート・マッピング確認、生成ファイル一式の ZIP エクスポート、保存が有効な場合の再生成などが挙げられます。',
      'また Supabase が利用できない場合でも、生成・プレビュー・ZIP 出力は利用できるデモモードが README に記載されています。',
      '本ポートフォリオサイトでは README の範囲で要約しており、画面構成の細部や将来の仕様変更については各リポジトリの最新情報を優先してください。',
    ].join('\n\n'),
    category: 'その他',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Zod',
      'Playwright（playwright-core）',
      'Chromium（@sparticuz/chromium）',
      'Archiver',
      'Diff',
      'Pixelmatch',
      'pngjs',
    ],
    liveUrl: 'https://design2code-studio.vercel.app/',
    githubUrl: 'https://github.com/Kodama-1205/design2code-studio',
    screenshot: '/apps/design2code-studio.png',
    status: '公開',
    // README から正確な初回公開日は確認できなかったため、依頼者確認用の TODO を残します
    publishedAt: '2024-01-01T00:00:00.000Z', // TODO: 依頼者確認待ち（正確な公開日が不明）
  },
  {
    slug: 'ask-design',
    name: 'Ask Design',
    shortDescription:
      '目的と前提を入れるだけで、そのまま使える完成プロンプト（質問文）を生成する Web アプリ。',
    longDescription: [
      'Ask Design は、AI に「聞けばわかる」を設計するための Web アプリです（リポジトリ README の説明に基づく）。',
      'README によると、ユーザーの目的・状況・スタイルに応じて最適な質問文（プロンプト）を生成します。',
      '公開サイトの説明では、目的と前提を入れるだけで完成プロンプトを作成し、スキルレベルや使用ツールを反映して最適化する、と記載されています。',
      '公開サイトでは生成結果を Markdown で表示し、ワンクリックでコピーできる導線がある、と記載されています。',
      'README の Tech Stack には Next.js（App Router）、TypeScript、Tailwind CSS、Dify（API）が記載されています。package.json 上ではさらに Supabase、Prisma、Upstash、react-markdown 等の依存も確認できます。',
    ].join('\n\n'),
    category: 'AIワークフロー',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Dify',
      'Supabase',
      'Prisma',
      'Upstash',
      'react-markdown',
    ],
    liveUrl: 'https://ask-design-app.vercel.app/',
    githubUrl: 'https://github.com/Kodama-1205/ask-design-app',
    screenshot: '/apps/ask-design.png',
    status: '公開',
    // 正確な初回公開日はリポジトリ情報からは確認できなかったため、依頼者確認用の TODO を残します
    publishedAt: '2024-01-01T00:00:00.000Z', // TODO: 依頼者確認待ち（正確な公開日が不明）
  },
  {
    slug: 'text2flow',
    name: 'Text2Flow',
    shortDescription:
      '文章（箇条書き/手順/条件分岐）から業務フロー JSON を生成し、Mermaid でフロー図表示できる Web アプリ。',
    longDescription: [
      'Text2Flow は、文章（箇条書き/手順/条件分岐）から業務フロー JSON を生成し、Mermaid でフロー図を表示できる Web アプリです（README の説明に基づく）。',
      'Dify（Workflow）と連携し、最終出力 `flow_json_raw` を Web 側でパース/補正して表示する、という README の記載があります。',
      'README にあるルート例として `/input`（文章入力とオプション）と `/result`（フロー図や JSON、コピー、SVG ダウンロード等）が挙げられています。',
      'API キーをフロントに出さず Next.js API Route から Dify を呼び出す、という README の記載があります（本サイトでは実装しません）。',
      'README にある動作要件として Node.js 18 以上（推奨 20）が記載されています。',
    ].join('\n\n'),
    category: 'AIワークフロー',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Mermaid'],
    liveUrl: 'https://text2flow.vercel.app/',
    githubUrl: 'https://github.com/Kodama-1205/text2flow',
    screenshot: '/apps/text2flow.png',
    status: '公開',
    // README から正確な初回公開日は確認できなかったため、依頼者確認用の TODO を残します
    publishedAt: '2024-01-01T00:00:00.000Z', // TODO: 依頼者確認待ち（正確な公開日が不明）
  },
  {
    slug: 'ai-task-fit',
    name: 'AI Task Fit',
    shortDescription:
      'YES/NO だけで業務の自動化可否を診断し、最短の実装方針（Python / Dify / 手作業）を提示する Web アプリ。',
    longDescription: [
      'AI Task Fit は、業務自動化の可否診断を目的とした Web アプリです。',
      '公開ページの metadata によると、YES/NO だけで業務の自動化可否を診断し、最短の実装方針（Python / Dify / 手作業）を提示します。',
      '公開サイトの説明では、反復性・ルール化・例外・リスク・データ取り出し可否などの軸で診断し、現状ツール環境を踏まえた推奨ルート（主＋副）を返す、と記載されています。',
      'リポジトリ構成上、`/input`・`/diagnosis`・`/result` などのルートが確認できます（README はリポジトリ上で未確認でした）。',
      'package.json から確認できた依存関係は Next.js / React / TypeScript です（Tailwind 等の追加依存は package.json 上では確認できませんでした）。',
    ].join('\n\n'),
    category: 'AIワークフロー',
    techStack: ['Next.js', 'React', 'TypeScript'],
    liveUrl: 'https://ai-task-fit.vercel.app/',
    githubUrl: 'https://github.com/Kodama-1205/ai-task-fit',
    screenshot: '/apps/ai-task-fit.png',
    status: '公開',
    // 正確な初回公開日はリポジトリ情報からは確認できなかったため、依頼者確認用の TODO を残します
    publishedAt: '2024-01-01T00:00:00.000Z', // TODO: 依頼者確認待ち（正確な公開日が不明）
  },
];

/**
 * 全アプリを返します（一覧表示用）。
 * Phase 2 ではここを DB クエリに置き換える想定です。
 */
export function getAllApps(): AppItem[] {
  return apps;
}

/**
 * slug から 1 件取得します（詳細ページ用）。
 * 不正な slug は undefined を返します（呼び出し側で notFound 扱いにします）。
 */
export function getAppBySlug(slug: string): AppItem | undefined {
  const normalized = slug.trim();
  if (!normalized) {
    return undefined;
  }
  return apps.find((a) => a.slug === normalized);
}
