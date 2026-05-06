'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

/**
 * Magic Link のクライアントサイド認証処理ページです。
 * URL の hash fragment（implicit flow）と code（PKCE flow）両方に対応します。
 */
export default function AuthConfirmPage() {
  const router = useRouter();
  const [message, setMessage] = useState('認証中...');

  useEffect(() => {
    const supabase = createClient();

    // hash fragment の場合は onAuthStateChange で session を検知
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.replace('/account');
        return;
      }
    });

    // code パラメータ（PKCE）の場合はサーバー側の /auth/callback に処理を委譲
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      // code はそのまま /auth/callback に渡す
      const next = url.searchParams.get('next') ?? '/account';
      router.replace(`/auth/callback?code=${code}&next=${encodeURIComponent(next)}`);
      return;
    }

    // token_hash の場合（OTP 確認）
    const token_hash = url.searchParams.get('token_hash');
    const type = url.searchParams.get('type');
    if (token_hash && type) {
      supabase.auth
        .verifyOtp({ token_hash, type: type as 'email' | 'magiclink' | 'recovery' | 'invite' })
        .then(({ error }) => {
          if (error) {
            setMessage('認証に失敗しました。もう一度お試しください。');
            setTimeout(() => router.replace('/auth/login?error=callback_failed'), 2000);
          }
          // 成功時は onAuthStateChange が発火して /account にリダイレクト
        });
      return;
    }

    // どれも該当しない場合は少し待って session を確認
    setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/account');
      } else {
        setMessage('認証に失敗しました。もう一度お試しください。');
        setTimeout(() => router.replace('/auth/login?error=callback_failed'), 2000);
      }
    }, 1500);

    return () => subscription.unsubscribe();
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
