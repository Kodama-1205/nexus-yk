-- ============================================================
-- Migration: access_tier + Ask Design + Ai Task Fit + Dify準備
-- Supabase ダッシュボード → SQL Editor で実行してください。
-- ============================================================

-- ① apps に access_tier 列を追加
ALTER TABLE public.apps
  ADD COLUMN IF NOT EXISTS access_tier text NOT NULL DEFAULT 'free'
  CHECK (access_tier IN ('free', 'pro'));

-- ② marketplace_items に access_tier 列を追加（Difyファイル用）
ALTER TABLE public.marketplace_items
  ADD COLUMN IF NOT EXISTS access_tier text NOT NULL DEFAULT 'free'
  CHECK (access_tier IN ('free', 'pro'));

-- ③ 新規アプリ追加
INSERT INTO public.apps (
  slug, name, short_description, long_description,
  category, tech_stack, live_url, github_url,
  screenshot, status, access_tier
)
VALUES
(
  'ask-design',
  'Ask Design',
  'デザインの改善点や疑問点を AI に質問し、具体的な改善案を受け取れる Web アプリ。',
  'Ask Design は、デザインの改善点・疑問点を AI に質問し、具体的な改善案をフィードバックとして受け取れる Web アプリケーションです。

デザイン画像や状況を入力することで、配色・レイアウト・フォント選択などの観点から AI がコメントを返します。デザイナーだけでなく、エンジニアや非デザイナーのメンバーが「このデザインで大丈夫か確認したい」という場面での活用を想定しています。

本ポートフォリオサイトでは README・公開情報の範囲で要約しており、画面構成の細部や将来の仕様変更については各リポジトリの最新情報を優先してください。',
  'デザイン変換',
  ARRAY['Next.js','React','TypeScript','Tailwind CSS','Supabase'],
  'https://ask-design-app.vercel.app/',
  NULL,
  '/apps/ask-design.svg',
  '公開',
  'free'
),
(
  'ai-task-fit',
  'Ai Task Fit',
  'タスク内容とチームメンバーのスキルセットを照合し、最適な担当者を AI が提案するアプリ。',
  'Ai Task Fit は、タスクの内容・要件とチームメンバーのスキルセットを照合し、最適な担当者を AI が提案する Web アプリケーションです。

タスク名・概要・必要スキルを入力すると、登録済みのメンバー情報と照合して適任者候補をスコア付きで提示します。プロジェクト管理のアサイン工数を削減し、スキル不一致によるリソース配分ミスを防ぐことを目的としています。

本ポートフォリオサイトでは README・公開情報の範囲で要約しており、画面構成の細部や将来の仕様変更については各リポジトリの最新情報を優先してください。',
  'AIワークフロー',
  ARRAY['Next.js','React','TypeScript','Tailwind CSS','Dify'],
  NULL,
  NULL,
  '/apps/ai-task-fit.svg',
  '準備中',
  'free'
)
ON CONFLICT (slug) DO NOTHING;
