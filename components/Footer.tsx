import Link from 'next/link';

import { CONTACT_FORM_URL, OWNER_GITHUB_URL, SITE_NAME } from '@/lib/site';

/**
 * 共通フッターです。
 * SNS の具体 URL は依頼資料からは確定できないため、GitHub のみリンクし SNS は注記に留めます。
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="text-base font-semibold text-white">{SITE_NAME}</p>
            <p className="mt-2 text-base leading-relaxed text-slate-200/90">
              個人開発アプリの紹介と、今後追加予定のマーケットプレイス（準備中）をまとめるサイトです。
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
              SNS リンクは準備中です。
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href={OWNER_GITHUB_URL}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub（Kodama-1205）
            </Link>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-200/90 sm:justify-end">
              <Link className="underline-offset-4 hover:underline" href="/legal/terms">
                利用規約
              </Link>
              <Link className="underline-offset-4 hover:underline" href="/legal/privacy">
                プライバシーポリシー
              </Link>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-400">© {year} {SITE_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
