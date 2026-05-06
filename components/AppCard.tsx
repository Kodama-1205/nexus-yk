import Image from 'next/image';
import Link from 'next/link';

import type { AppItem } from '@/lib/types';

import { Badge } from '@/components/Badge';

type AppCardProps = {
  app: AppItem;
  isPro?: boolean;
};

/**
 * アプリ一覧用のカードです（ガラスモーフィズム調）。
 * isPro=false かつ app.accessTier='pro' の場合、Proバッジとロックを表示します。
 */
export function AppCard({ app, isPro = false }: AppCardProps) {
  const locked = app.accessTier === 'pro' && !isPro;

  return (
    <Link
      href={`/apps/${encodeURIComponent(app.slug)}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/30 backdrop-blur-md transition hover:border-cyan-300/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:p-5"
      aria-label={`${app.name} の詳細へ`}
    >
      {/* Pro バッジ */}
      {app.accessTier === 'pro' && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-2.5 py-1 text-xs font-bold text-yellow-200 ring-1 ring-yellow-400/40">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a3 3 0 0 0-3 3v1H3.5A1.5 1.5 0 0 0 2 6.5v7A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 5H11V4a3 3 0 0 0-3-3zm-1.5 4V4a1.5 1.5 0 0 1 3 0v1h-3z"/>
          </svg>
          Pro
        </span>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className={`relative mx-auto h-40 w-full max-w-[360px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 sm:mx-0 sm:h-36 sm:w-44 sm:max-w-none sm:flex-none ${locked ? 'opacity-50' : ''}`}>
          <Image
            src={app.screenshot}
            alt={`${app.name} のスクリーンショット（プレースホルダ）`}
            fill
            className="object-cover object-left"
            sizes="(min-width: 640px) 176px, 100vw"
            unoptimized
            priority={false}
          />
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
              <svg className="h-10 w-10 text-yellow-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a5 5 0 0 0-5 5v2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5zm-3 7V7a3 3 0 0 1 6 0v2H9z"/>
              </svg>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
              {app.name}
            </h2>
            <Badge kind="status" value={app.status} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge kind="category" value={app.category} />
          </div>

          <p className="mt-3 text-base leading-relaxed text-slate-100/90">{app.shortDescription}</p>

          {locked ? (
            <p className="mt-4 text-sm font-semibold text-yellow-200">
              Proプランで利用できます →
            </p>
          ) : (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                {app.techStack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-slate-950/35 px-2 py-1 text-xs text-slate-100 ring-1 ring-white/10 sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
                {app.techStack.length > 6 ? (
                  <span className="rounded-md bg-slate-950/35 px-2 py-1 text-xs text-slate-200 ring-1 ring-white/10 sm:text-sm">
                    他 {app.techStack.length - 6} 件
                  </span>
                ) : null}
              </div>

              <div className="mt-4 text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                詳細を見る →
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
