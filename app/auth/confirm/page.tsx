'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

/**
 * Magic Link のクライアントサイド認証処理ページです。
 * implicit flow（URL hash）・PKCE flow（code）・token_hash の全パターンに対応します。
 */
export default function AuthConfirmPage() {
  const router = useRouter();
  const [message, setMessage] = useState('認証中...');

  useEffect(() => {
    const supabase = createClient();

    async function handleAuth() {
      // ① URL hash fragment（implicit flow）: #access_token=...&refresh_token=...
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (!error) {
            router.replace('/account');
            return;
          }
        }
      }

      // ② PKCE flow: ?code=...（ブラウザクライアントで処理。サーバーへのリダイレクト不可）
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.replace('/account');
          return;
        }
        setMessage('認証に失敗しました。もう一度お試しください。');
        setTimeout(() => router.replace('/auth/login'), 2000);
        return;
      }

      // ③ token_hash flow: ?token_hash=...&type=...
      const token_hash = url.searchParams.get('token_hash');
      const type = url.searchParams.get('type');
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'email' | 'magiclink' | 'recovery' | 'invite',
        });
        if (!error) {
          router.replace('/account');
          return;
        }
      }

      // ④ すでにセッションがある場合
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/account');
        return;
      }

      // どれも該当しない → エラー
      setMessage('認証に失敗しました。もう一度お試しください。');
      setTimeout(() => router.replace('/auth/login'), 2000);
    }

    handleAuth();
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="mt-4 text-base text-slate-200">{message}</p>
      </div>
    </div>
  );
}
