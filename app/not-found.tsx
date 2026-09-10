import Link from 'next/link';

/**
 * 404 ページです。
 * `notFound()` 呼び出し時に表示されます。
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold tracking-wide text-cyan-200">404</p>
      <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">ページが見つかりません</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-100/90">
        URL が間違っているか、ページが移動した可能性があります。
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] w-full max-w-xs items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:w-auto"
        >
          トップへ戻る
        </Link>
        <Link
          href="/apps"
          className="inline-flex min-h-[44px] w-full max-w-xs items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:w-auto"
        >
          アプリ一覧へ
        </Link>
      </div>
    </div>
  );
}
