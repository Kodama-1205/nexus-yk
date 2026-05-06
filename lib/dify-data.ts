/**
 * Dify ファイル情報の取得（marketplace_items テーブルを使用）。
 */

import { createAdminClient } from '@/lib/supabase/admin';

import type { AccessTier, DifyItem } from './types';

/** DB の行型（snake_case） */
type DifyRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  file_path: string;
  thumbnail_path: string | null;
  access_tier: string;
  is_published: boolean;
  created_at: string;
};

/** DB 行 → DifyItem（camelCase）変換 */
function rowToDifyItem(row: DifyRow): DifyItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    filePath: row.file_path,
    thumbnailPath: row.thumbnail_path,
    accessTier: (row.access_tier ?? 'free') as AccessTier,
    isPublished: row.is_published,
    createdAt: row.created_at,
  };
}

/** 公開済み Dify ファイル一覧を返します。 */
export async function getAllDifyItems(): Promise<DifyItem[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('marketplace_items')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data as DifyRow[]).map(rowToDifyItem);
}

/** slug から 1 件取得します。不正な slug は undefined を返します。 */
export async function getDifyItemBySlug(slug: string): Promise<DifyItem | undefined> {
  const normalized = slug.trim();
  if (!normalized) return undefined;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('marketplace_items')
    .select('*')
    .eq('slug', normalized)
    .eq('is_published', true)
    .single();

  if (error || !data) return undefined;
  return rowToDifyItem(data as DifyRow);
}
