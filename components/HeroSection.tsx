import Link from 'next/link';

type HeroSectionProps = {
  /** メイン見出し */
  title: string;
  /** サブコピー */
  subtitle: string;
  /** メイン CTA のリンク先（内部リンク想定） */
  primaryHref: string;
  /** メイン CTA の文言 */
  primaryLabel: string;
  /** サブ CTA（任意） */
  secondaryHref?: string;
  secondaryLabel?: string;
};

/**
 * トップのヒーロー領域です（青系グラデーション＋光彩演出）。
 * メイン CTA は依頼要件どおり「黒背景＋黄色文字」にします。
 */
export function HeroSection({
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* 背景の光彩（装飾のみ。操作要素ではない） */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 right-[-120px] h-[420px] w-[420px] rounded-full bg-sky-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold tracking-wide text-cyan-200/90 sm:text-lg">
            フリーランスエンジニア / 静岡県三島市
          </p>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-100/90 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href={primaryHref}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-black px-6 py-3 text-base font-semibold text-yellow-300 ring-1 ring-yellow-300/40 transition hover:bg-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 sm:min-w-[220px] sm:text-lg"
            >
              {primaryLabel}
            </Link>

            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-slate-50 backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:min-w-[220px] sm:text-lg"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
