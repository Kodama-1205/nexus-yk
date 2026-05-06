-- ============================================================
-- Nexus-YK Phase 2 スキーマ
-- Supabase ダッシュボード → SQL Editor で実行してください。
-- ============================================================

-- ① profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan            text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id text,
  upgraded_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: 本人のみ参照"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles: 本人のみ更新"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 新規ユーザー登録時にプロフィールを自動作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (new.id);
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ② apps
CREATE TABLE IF NOT EXISTS public.apps (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text NOT NULL UNIQUE,
  name              text NOT NULL,
  short_description text NOT NULL,
  long_description  text NOT NULL,
  category          text NOT NULL,
  tech_stack        text[] NOT NULL DEFAULT '{}',
  live_url          text,
  github_url        text,
  screenshot        text NOT NULL,
  status            text NOT NULL DEFAULT '準備中'
                      CHECK (status IN ('公開', 'ベータ', '準備中')),
  published_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "apps: 全員参照可"
  ON public.apps FOR SELECT USING (true);

-- シードデータ（既存の静的データを移行）
INSERT INTO public.apps (slug, name, short_description, long_description, category, tech_stack, live_url, github_url, screenshot, status)
VALUES
(
  'design2code-studio',
  'Design2Code Studio',
  'デザインデータ（Figma など）から HTML/CSS/JavaScript などのコードを生成する Web アプリ。',
  'Design2Code Studio は、デザインデータ（Figma など）から HTML/CSS/JavaScript などのコードを生成することを目的とした Web アプリケーションです。

README に記載のある主な機能として、Figma URL を入力したコード生成（README 上は現状モックパイプラインとの記載）、結果画面でのプレビュー・コード・レポート・マッピング確認、生成ファイル一式の ZIP エクスポート、保存が有効な場合の再生成などが挙げられます。

また Supabase が利用できない場合でも、生成・プレビュー・ZIP 出力は利用できるデモモードが README に記載されています。

本ポートフォリオサイトでは README の範囲で要約しており、画面構成の細部や将来の仕様変更については各リポジトリの最新情報を優先してください。',
  'デザイン変換',
  ARRAY['Next.js','React','TypeScript','Tailwind CSS','Supabase','Zod','Playwright（playwright-core）','Chromium（@sparticuz/chromium）','Archiver','Diff','Pixelmatch','pngjs'],
  'https://design2code-studio.vercel.app/',
  'https://github.com/Kodama-1205/design2code-studio',
  '/apps/design2code-studio.svg',
  '公開'
),
(
  'text2flow',
  'Text2Flow',
  '文章（箇条書き/手順/条件分岐）から業務フロー JSON を生成し、Mermaid でフロー図表示できる Web アプリ。',
  'Text2Flow は、文章（箇条書き/手順/条件分岐）から業務フロー JSON を生成し、Mermaid でフロー図を表示できる Web アプリです（README の説明に基づく）。

Dify（Workflow）と連携し、最終出力 `flow_json_raw` を Web 側でパース/補正して表示する、という README の記載があります。

README にあるルート例として `/input`（文章入力とオプション）と `/result`（フロー図や JSON、コピー、SVG ダウンロード等）が挙げられています。

API キーをフロントに出さず Next.js API Route から Dify を呼び出す、という README の記載があります（本サイトでは実装しません）。

README にある動作要件として Node.js 18 以上（推奨 20）が記載されています。',
  'AIワークフロー',
  ARRAY['Next.js','React','TypeScript','Tailwind CSS','Supabase','Mermaid'],
  'https://text2flow.vercel.app/',
  'https://github.com/Kodama-1205/text2flow',
  '/apps/text2flow.svg',
  '公開'
)
ON CONFLICT (slug) DO NOTHING;

-- ③ marketplace_items
CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text NOT NULL UNIQUE,
  title          text NOT NULL,
  description    text NOT NULL,
  category       text NOT NULL,
  file_path      text NOT NULL,
  thumbnail_path text,
  is_published   boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marketplace_items: 公開済みのみ参照可"
  ON public.marketplace_items FOR SELECT USING (is_published = true);

-- ④ user_saves
CREATE TABLE IF NOT EXISTS public.user_saves (
  id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id  uuid NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_id)
);

ALTER TABLE public.user_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_saves: 本人のみ参照"
  ON public.user_saves FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_saves: 本人のみ追加"
  ON public.user_saves FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_saves: 本人のみ削除"
  ON public.user_saves FOR DELETE USING (auth.uid() = user_id);

-- ⑤ stripe_orders
CREATE TABLE IF NOT EXISTS public.stripe_orders (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id        text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  amount                   integer NOT NULL,
  status                   text NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'completed', 'failed')),
  created_at               timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stripe_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stripe_orders: 本人のみ参照"
  ON public.stripe_orders FOR SELECT USING (auth.uid() = user_id);
