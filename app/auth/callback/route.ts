import { NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';

/**
 * Magic Link のコールバック処理です。
 * PKCE フロー（code）と token_hash フローの両方に対応します。
 * Vercel 環境では x-forwarded-host を優先して使用します。
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/account';

  const forwardedHost = request.headers.get('x-forwarded-host');
  const baseUrl = forwardedHost ? `https://${forwardedHost}` : origin;

  const supabase = createClient();

  // PKCE フロー（code パラメータ）
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  // token_hash フロー（Magic Link / OTP）
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return NextResponse.redirect(`${baseUrl}${next}`);
    }
  }

  return NextResponse.redirect(`${baseUrl}/auth/login?error=callback_failed`);
}
