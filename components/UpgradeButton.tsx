'use client';

import { useState } from 'react';

/**
 * Pro プランへのアップグレードボタンです。
 * クリックで /api/stripe/checkout を呼び出し、Stripe Checkout にリダイレクトします。
 */
export function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpgrade() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'エラーが発生しました');
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('通信エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-5 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
      >
        {loading ? '処理中…' : 'Pro にアップグレード（買い切り）'}
      </button>
      {error && (
        <p className="text-sm text-red-300">{error}</p>
      )}
    </div>
  );
}
