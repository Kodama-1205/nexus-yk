import Link from 'next/link';

import { getAllDifyItems } from '@/lib/dify-data';
import { createClient } from '@/lib/supabase/server';
import type { Plan } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dify',
  description: 'Dify で作成したワークフロー・チャットボットのファイル配布ページです。',
};

export default async function DifyIndexPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isPro = false;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();
    isPro = (data as { plan: Plan } | null)?.plan === 'pro';
  }

  const items = await getAllDifyItems();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dify</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-100/90 sm:text-lg">
          Dify で構築したワークフロー・チャットボットのファイルを配布しています。
          インポートするだけですぐに使えます。
        </p>
      </div>

      {/* プラン案内 */}
      {!user && (
        <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-950/20 px-5 py-4 text-sm text-cyan-100">
          <Link href="/auth/login" className="font-semibold underline underline-offset-4 hover:text-white">
            ログイン
          </Link>
          すると、Freeプランのファイルを無料でダウンロードできます。
        </div>
      )}
      {user && !isPro && (
        <div className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-950/20 px-5 py-4 text-sm text-yellow-100">
          <Link href="/account" className="font-semibold underline underline-offset-4 hover:text-white">
            Proプラン
          </Link>
          にアップグレードすると、すべてのファイルをダウンロードできます。
        </div>
      )}

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <p className="text-xl font-bold text-white">準備中</p>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            現在ファイルを整備中です。もうしばらくお待ちください。
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const locked = item.accessTier === 'pro' && !isPro;
            return (
              <Link
                key={item.slug}
                href={`/dify/${encodeURIComponent(item.slug)}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/30 backdrop-blur-md transition hover:border-cyan-300/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {/* Pro バッジ */}
                {item.accessTier === 'pro' && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-2.5 py-1 text-xs font-bold text-yellow-200 ring-1 ring-yellow-400/40">
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 1a3 3 0 0 0-3 3v1H3.5A1.5 1.5 0 0 0 2 6.5v7A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 5H11V4a3 3 0 0 0-3-3zm-1.5 4V4a1.5 1.5 0 0 1 3 0v1h-3z"/>
                    </svg>
                    Pro
                  </span>
                )}

                <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-100 ring-1 ring-sky-400/30">
                  {item.category}
                </span>

                <h2 className="mt-3 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-100/80 line-clamp-3">
                  {item.description}
                </p>

                <p className={`mt-4 text-sm font-semibold transition ${locked ? 'text-yellow-200' : 'text-cyan-200 group-hover:text-cyan-100'}`}>
                  {locked ? 'Proプランで利用できます →' : '詳細・ダウンロード →'}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
