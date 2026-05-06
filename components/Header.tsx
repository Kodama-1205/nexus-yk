import Link from 'next/link';

import { createClient } from '@/lib/supabase/server';
import { SITE_NAME } from '@/lib/site';

import { HeaderAuthButton } from '@/components/HeaderAuthButton';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/apps', label: 'Apps' },
  { href: '/marketplace', label: 'Marketplace' },
] as const;

/**
 * 共通ヘッダーです。
 * ログイン状態をサーバーで確認し、HeaderAuthButton に渡します。
 */
export async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          aria-label={`${SITE_NAME} のトップへ`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-sky-500/20 ring-1 ring-cyan-300/30">
            <span className="text-sm font-black tracking-tight text-white">YK</span>
          </span>
          <span className="text-base font-bold tracking-tight text-white sm:text-lg">{SITE_NAME}</span>
        </Link>

        <nav aria-label="主要ナビゲーション" className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-semibold text-slate-100/90 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:px-4 sm:text-base"
            >
              {item.label}
            </Link>
          ))}

          <HeaderAuthButton user={user} />
        </nav>
      </div>
    </header>
  );
}
