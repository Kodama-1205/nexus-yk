import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * Magic Link のコールバック処理です。
 * Vercel 環境では x-forwarded-host を優先して使用します。
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Vercel 等のロードバランサー経由の場合は x-forwarded-host を使用
      const forwardedHost = request.headers.get('x-forwarded-host');
      const baseUrl = forwardedHost ? `https://${forwardedHost}` : origin;
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`);
}
