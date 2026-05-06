import Link from 'next/link';

import { AppCard } from '@/components/AppCard';
import { HeroSection } from '@/components/HeroSection';

import { getAllApps } from '@/lib/apps-data';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

/**
 * トップページです。
 * ヒーロー、注目アプリ（最大3件）、一覧への導線を配置します。
 */
export default async function HomePage() {
  const apps = await getAllApps();
  const featured = apps.slice(0, 3);

  return (
    <div>
      <div className="border-b border-white/10 bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent">
        <HeroSection
          title={`${SITE_NAME} — アプリ集約サイト`}
          subtitle={SITE_DESCRIPTION}
          primaryHref="/apps"
          primaryLabel="アプリ一覧を見る"
          secondaryHref="/marketplace"
          secondaryLabel="Marketplace（準備中）"
        />
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">注目アプリ</h2>
            <p className="mt-2 text-base leading-relaxed text-slate-100/90 sm:text-lg">
              最近扱っているプロダクトを最大 3 件まで表示します（Phase 1 は配列先頭からの固定表示）。
            </p>
          </div>

          <Link
            href="/apps"
            className="inline-flex min-h-[44px] items-center justify-center self-start rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:self-auto"
          >
            すべて見る
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:gap-6">
          {featured.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
