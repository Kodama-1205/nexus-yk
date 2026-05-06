/**
 * Nexus-YK（Phase 1）で扱うアプリ情報の型定義です。
 * Phase 2 以降で Supabase 等に移行する際も、この型を境界として利用できるようにします。
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

/** 一覧フィルタに使用するカテゴリの固定リスト（URL クエリ検証にも利用） */
export const APP_CATEGORIES: AppCategory[] = [
  'AIワークフロー',
  'デザイン変換',
  'CAD',
  '子育て支援',
  'その他',
];

/** 1件分のアプリ情報（静的データ／将来のDB行の両方に対応） */
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
  /** `public/` 配下をルートから見たスクリーンショットパス（例: `/apps/foo.svg`） */
  screenshot: string;
  /** 公開状態 */
  status: AppStatus;
  /** 公開日時（ISO8601）。正確な日付が不明な場合はデータ側で TODO コメントを残します */
  publishedAt: string;
}
