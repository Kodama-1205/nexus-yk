'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

type Props = {
  user: User | null;
};

/**
 * ヘッダー右端のログイン/ログアウトボタンです（クライアントコンポーネント）。
 * user が null のときはログインボタン、ログイン済みはマイページ + ログアウトを表示します。
 */
export function HeaderAuthButton({ user }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:px-5 sm:text-base"
      >
        ログイン
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:px-5 sm:text-base"
      >
        マイページ
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100/80 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:text-base"
      >
        ログアウト
      </button>
    </div>
  );
}
