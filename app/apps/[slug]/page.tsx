import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/Badge';

import { getAllApps, getAppBySlug } from '@/lib/apps-data';
import { isSafeHttpUrl } from '@/lib/url';

type AppDetailPageProps = {
  params: { slug: string };
};

/** 事前生成対象の slug 一覧です（SSG）。Supabase が使えない場合は空を返して動的生成にフォールバック。 */
export async function generateStaticParams() {
  try {
    const apps = await getAllApps();
    return apps.map((app) => ({ slug: app.slug }));
  } catch {
    return [];
  }
}

/** 詳細ページのメタデータです。 */
export async function generateMetadata({ params }: AppDetailPageProps) {
  const app = await getAppBySlug(params.slug);
  if (!app) {
    return { title: 'アプリが見つかりません' };
  }
  return {
    title: app.name,
    description: app.shortDescription,
  };
}

/** アプリ詳細ページです。 */
export default async function AppDetailPage({ params }: AppDetailPageProps) {
  const app = await getAppBySlug(params.slug);
  if (!app) {
    notFound();
  }

  const publishedLabel = (() => {
    try {
      const d = new Date(app.publishedAt);
      if (Number.isNaN(d.getTime())) {
        return '日付未設定';
      }
      return d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return '日付未設定';
    }
  })();

  const canOpenLive = Boolean(app.liveUrl) && isSafeHttpUrl(app.liveUrl as string);
  const canOpenGithub = Boolean(app.githubUrl) && isSafeHttpUrl(app.githubUrl as string);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-200/90" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="underline-offset-4 hover:underline" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">
            /
          </li>
          <li>
            <Link className="underline-offset-4 hover:underline" href="/apps">
              Apps
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">
            /
          </li>
          <li className="font-semibold text-white">{app.name}</li>
        </ol>
      </nav>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{app.name}</h1>
          <Badge kind="status" value={app.status} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge kind="category" value={app.category} />
          <p className="text-base text-slate-200/90 sm:text-lg">公開日: {publishedLabel}</p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-100/90 sm:text-lg">
          {app.shortDescription}
        </p>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-slate-950/30 backdrop-blur-md">
        <div className="relative aspect-[16/9] w-full bg-slate-950/40">
          <Image
            src={app.screenshot}
            alt={`${app.name} のスクリーンショット（プレースホルダ）`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1100px, 100vw"
            unoptimized
            priority
          />
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white sm:text-2xl">詳細</h2>
          <div className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-100/90 sm:text-lg">
            {app.longDescription}
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 backdrop-blur">
          <h2 className="text-lg font-bold text-white">技術スタック</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {app.techStack.map((tech) => (
              <li key={tech}>
                <span className="inline-flex min-h-[36px] items-center rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 sm:text-base">
                  {tech}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            {canOpenLive ? (
              <a
                href={app.liveUrl as string}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-5 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
                rel="noopener noreferrer"
                target="_blank"
              >
                アプリを開く
              </a>
            ) : (
              <p className="rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-slate-200 ring-1 ring-white/10">
                公開 URL が未設定、または安全ではない URL のため「アプリを開く」リンクを表示しません。
              </p>
            )}

            {canOpenGithub ? (
              <a
                href={app.githubUrl as string}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub を見る
              </a>
            ) : (
              <p className="rounded-xl bg-amber-950/30 p-4 text-sm leading-relaxed text-amber-100 ring-1 ring-amber-400/25">
                GitHub URL が未設定、または安全ではない URL のためリンクを表示しません。
              </p>
            )}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-slate-400">
            外部サイトへ移動します。各サービスの利用規約・プライバシーポリシーは先側をご確認ください。
          </p>
        </aside>
      </section>
    </div>
  );
}
