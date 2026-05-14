import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://nexus-yk.vercel.app'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    // og:image と同じ画像を使用（Next.js が opengraph-image.tsx から自動生成）
  },
};

/**
 * ルートレイアウトです。
 * フォントは `globals.css` の Google Fonts `@import` で読み込みます。
 *
 * 補足:
 * `next/font/google` の `Noto_Sans_JP` は利用可能 subset の制約により、
 * このプロジェクトの Next.js 14.2.x では日本語向け subset を安定指定できないケースがありました。
 * そのため、日本語グリフを確実に扱える `@import` 方式に切り替えています。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh antialiased">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
