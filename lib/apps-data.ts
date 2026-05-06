/**
 * アプリ情報の取得（Phase 2: Supabase DB から取得）。
 * `getAllApps` / `getAppBySlug` のインターフェースは Phase 1 と同じため、
 * 呼び出し側は await を追加するだけで移行できます。
 */

import { createAdminClient } from '@/lib/supabase/admin';

import type { AccessTier, AppCategory, AppItem, AppStatus } from './types';

/** DB の行型（snake_case） */
type AppRow = {
  slug: string;
  name: string;
  short_description: string;
  long_description: string;
  category: string;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  screenshot: string;
  status: string;
  published_at: string | null;
  created_at: string;
  access_tier: string;
};

/** DB 行 → AppItem（camelCase）変換 */
function rowToAppItem(row: AppRow): AppItem {
  return {
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    category: row.category as AppCategory,
    techStack: row.tech_stack,
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    screenshot: row.screenshot,
    status: row.status as AppStatus,
    publishedAt: row.published_at ?? row.created_at,
    accessTier: (row.access_tier ?? 'free') as AccessTier,
  };
}

/** 全アプリを返します（一覧表示用）。 */
export async function getAllApps(): Promise<AppItem[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as AppRow[]).map(rowToAppItem);
}

/** slug から 1 件取得します（詳細ページ用）。不正な slug は undefined を返します。 */
export async function getAppBySlug(slug: string): Promise<AppItem | undefined> {
  const normalized = slug.trim();
  if (!normalized) return undefined;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', normalized)
    .single();

  if (error || !data) return undefined;
  return rowToAppItem(data as AppRow);
}
