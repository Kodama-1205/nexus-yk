import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getDifyItemBySlug } from '@/lib/dify-data';
import { createClient } from '@/lib/supabase/server';
import type { Plan } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

type DifyDetailPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: DifyDetailPageProps) {
  const item = await getDifyItemBySlug(params.slug);
  if (!item) return { title: 'ファイルが見つかりません' };
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function DifyDetailPage({ params }: DifyDetailPageProps) {
  const item = await getDifyItemBySlug(params.slug);
  if (!item) notFound();

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

  const locked = item.accessTier === 'pro' && !isPro;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* パンくず */}
      <nav className="text-sm text-slate-200/90" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link className="underline-offset-4 hover:underline" href="/">Home</Link></li>
          <li aria-hidden className="text-slate-400">/</li>
          <li><Link className="underline-offset-4 hover:underline" href="/dify">Dify</Link></li>
          <li aria-hidden className="text-slate-400">/</li>
          <li className="font-semibold text-white">{item.title}</li>
        </ol>
      </nav>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-100 ring-1 ring-sky-400/30">
            {item.category}
          </span>
          {item.accessTier === 'pro' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-bold text-yellow-200 ring-1 ring-yellow-400/40">
              <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1a3 3 0 0 0-3 3v1H3.5A1.5 1.5 0 0 0 2 6.5v7A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 5H11V4a3 3 0 0 0-3-3zm-1.5 4V4a1.5 1.5 0 0 1 3 0v1h-3z"/>
              </svg>
              Pro
            </span>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white [line-break:strict] sm:text-4xl">{item.title}</h1>
      </header>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-lg font-bold text-white">説明</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-100/90 [line-break:strict]">
          {item.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* ダウンロードエリア */}
      <section className="mt-6">
        {!user ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-950/20 p-6 text-center">
            <p className="text-base font-semibold text-cyan-100">ダウンロードするにはログインが必要です</p>
            <Link
              href="/auth/login"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950"
            >
              ログイン
            </Link>
          </div>
        ) : locked ? (
          <div className="rounded-2xl border border-yellow-400/20 bg-yellow-950/20 p-6 text-center">
            <p className="text-base font-semibold text-yellow-100">このファイルは Proプラン専用です</p>
            <p className="mt-2 text-sm text-yellow-100/70">買い切りで全ファイルにアクセスできます。</p>
            <Link
              href="/account"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950"
            >
              Proプランへアップグレード
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-950/20 p-6 text-center">
            <p className="text-base font-semibold text-emerald-100">ダウンロード可能です</p>
            <a
              href={`/api/dify/download/${encodeURIComponent(item.slug)}`}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950"
              download
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"/>
              </svg>
              ファイルをダウンロード
            </a>
          </div>
        )}
      </section>

      <div className="mt-8">
        <Link
          href="/dify"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
        >
          ← Dify 一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
