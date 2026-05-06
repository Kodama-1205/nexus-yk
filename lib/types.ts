/**
 * Nexus-YK で扱うデータ型定義です。
 */

/** アプリのカテゴリ（一覧フィルタやバッジ表示に使用） */
export type AppCategory =
  | 'AIワークフロー'
  | 'デザイン変換'
  | 'CAD'
  | '子育て支援'
  | 'その他';

/** 公開状態（バッジ表示・運用上の区別に使用） */
export type AppStatus = '公開' | 'ベータ' | '準備中';

/** アクセス権限（free: 誰でも利用可 / pro: Proプランのみ） */
export type AccessTier = 'free' | 'pro';

/** 一覧フィルタに使用するカテゴリの固定リスト（URL クエリ検証にも利用） */
export const APP_CATEGORIES: AppCategory[] = [
  'AIワークフロー',
  'デザイン変換',
  'CAD',
  '子育て支援',
  'その他',
];

/** 1件分のアプリ情報 */
export interface AppItem {
  /** URL 用の一意な識別子（英小文字・ハイフン推奨） */
  slug: string;
  /** 画面上の表示名 */
  name: string;
  /** カード等の一行説明 */
  shortDescription: string;
  /** 詳細ページ向けの説明文 */
  longDescription: string;
  /** カテゴリ */
  category: AppCategory;
  /** 使用技術のタグ（表示順は配列順） */
  techStack: string[];
  /** 本番公開 URL（無い場合は null） */
  liveUrl: string | null;
  /** GitHub リポジトリ URL（無い場合は null） */
  githubUrl: string | null;
  /** `public/` 配下をルートから見たスクリーンショットパス */
  screenshot: string;
  /** 公開状態 */
  status: AppStatus;
  /** 公開日時（ISO8601） */
  publishedAt: string;
  /** アクセス権限（free: 誰でも / pro: Proプランのみ） */
  accessTier: AccessTier;
}

/** 1件分の Dify ファイル情報 */
export interface DifyItem {
  /** DB の uuid */
  id: string;
  /** URL 用の一意な識別子 */
  slug: string;
  /** 表示タイトル */
  title: string;
  /** 説明文 */
  description: string;
  /** カテゴリ（例: 'ワークフロー', 'チャットボット'） */
  category: string;
  /** Supabase Storage のファイルパス */
  filePath: string;
  /** サムネイル画像パス（無い場合は null） */
  thumbnailPath: string | null;
  /** アクセス権限 */
  accessTier: AccessTier;
  /** 公開済みフラグ */
  isPublished: boolean;
  /** 作成日時（ISO8601） */
  createdAt: string;
}
