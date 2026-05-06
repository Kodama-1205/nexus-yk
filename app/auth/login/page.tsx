'use client';

import { useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { SITE_NAME } from '@/lib/site';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } else {
      setStatus('sent');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        {/* ロゴ */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-sky-500/20 ring-1 ring-cyan-300/30">
            <span className="text-sm font-black text-white">YK</span>
          </div>
          <span className="text-lg font-bold text-white">{SITE_NAME}</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-white">ログイン</h1>
        <p className="mt-2 text-base leading-relaxed text-slate-100/80">
          メールアドレスを入力すると、ログインリンクをお送りします。
          パスワードは不要です。
        </p>

        {status === 'sent' ? (
          <div className="mt-8 rounded-xl border border-emerald-400/25 bg-emerald-950/25 p-5">
            <p className="text-base font-semibold text-emerald-200">メールを送信しました</p>
            <p className="mt-2 text-sm leading-relaxed text-emerald-100/80">
              <strong>{email}</strong> 宛にログインリンクを送りました。
              メールボックスをご確認ください。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-100">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-h-[44px] rounded-xl border border-white/15 bg-slate-950/50 px-4 py-3 text-base text-white placeholder-slate-400 outline-none transition focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/30"
              />
            </div>

            {status === 'error' && (
              <p className="rounded-xl bg-red-950/30 p-3 text-sm text-red-200 ring-1 ring-red-400/25">
                {errorMessage || 'エラーが発生しました。もう一度お試しください。'}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
            >
              {status === 'loading' ? '送信中…' : 'ログインリンクを送る'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
