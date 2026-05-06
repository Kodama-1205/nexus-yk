import Image from 'next/image';
import Link from 'next/link';

import type { AppItem } from '@/lib/types';

import { Badge } from '@/components/Badge';

type AppCardProps = {
  app: AppItem;
};

/**
 * アプリ一覧用のカードです（ガラスモーフィズム調）。
 * クリック領域はカード全体を `Link` で包み、モバイルでも押しやすくします。
 */
export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`/apps/${encodeURIComponent(app.slug)}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-slate-950/30 backdrop-blur-md transition hover:border-cyan-300/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:p-5"
      aria-label={`${app.name} の詳細へ`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative mx-auto h-40 w-full max-w-[360px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/40 sm:mx-0 sm:h-36 sm:w-44 sm:max-w-none sm:flex-none">
          {/*
            SVG プレースホルダは最適化対象外として `unoptimized` を付与します。
            将来 PNG 等に差し替える場合は `next.config.mjs` の画像設定と合わせて見直します。
          */}
          <Image
            src={app.screenshot}
            alt={`${app.name} のスクリーンショット（プレースホルダ）`}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 176px, 100vw"
            unoptimized
            priority={false}
          />
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
        </div>
      </div>
    </Link>
  );
}
