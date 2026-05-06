import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Magic Link のコールバック処理です。
 * メール内のリンクをクリックすると `code` パラメータ付きでここに遷移します。
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // エラー時はログインページに戻す
  return NextResponse.redirect(`${origin}/auth/login?error=callback_failed`);
}
