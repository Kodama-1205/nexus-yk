import { NextResponse } from 'next/server';

import { getDifyItemBySlug } from '@/lib/dify-data';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Plan } from '@/lib/supabase/types';

/**
 * Dify ファイルのダウンロード API です。
 * - 未ログイン → 401
 * - Pro専用ファイルを Freeユーザーが要求 → 403
 * - Supabase Storage からファイルを取得して返します。
 */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const item = await getDifyItemBySlug(params.slug);
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Pro専用ファイルの場合、ユーザーのプランを確認
  if (item.accessTier === 'pro') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    const isPro = (profile as { plan: Plan } | null)?.plan === 'pro';
    if (!isPro) {
      return NextResponse.json({ error: 'Pro plan required' }, { status: 403 });
    }
  }

  // Supabase Storage からファイルを取得
  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from('dify-files')
    .download(item.filePath);

  if (error || !data) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const filename = item.filePath.split('/').pop() ?? `${item.slug}.yml`;
  const arrayBuffer = await data.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
