import { ImageResponse } from 'next/og';

import { getAllApps, getAppBySlug } from '@/lib/apps-data';
import { SITE_NAME } from '@/lib/site';
import type { AppStatus } from '@/lib/types';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** OGP 画像内はラテン文字のみ使用するため、ステータスを英語にマッピング */
const STATUS_EN: Record<AppStatus, string> = {
  公開: 'Live',
  ベータ: 'Beta',
  準備中: 'Coming Soon',
};

/** SSG: 有効な slug を事前列挙 */
export async function generateStaticParams() {
  const apps = await getAllApps();
  return apps.map((app) => ({ slug: app.slug }));
}

type Props = {
  params: { slug: string };
};

export default async function Image({ params }: Props) {
  const app = await getAppBySlug(params.slug);
  const title = app?.name ?? SITE_NAME;
  const statusLabel = app ? STATUS_EN[app.status] : null;
  const isLive = app?.status === '公開';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #031b3a 55%, #042f4a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 右上の光彩 */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '440px',
            height: '440px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 70%)',
          }}
        />

        {/* ヘッダー: サイトブランド */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.28), rgba(56,189,248,0.16))',
              border: '1px solid rgba(34,211,238,0.30)',
            }}
          >
            <span
              style={{ color: 'white', fontSize: '15px', fontWeight: 900 }}
            >
              YK
            </span>
          </div>
          <span
            style={{
              color: 'rgba(226,232,240,0.75)',
              fontSize: '22px',
              fontWeight: 700,
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        {/* アプリ情報 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {statusLabel ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                padding: '7px 20px',
                borderRadius: '100px',
                background: isLive
                  ? 'rgba(16,185,129,0.15)'
                  : 'rgba(255,255,255,0.08)',
                border: isLive
                  ? '1px solid rgba(16,185,129,0.35)'
                  : '1px solid rgba(255,255,255,0.15)',
                color: isLive ? 'rgba(167,243,208,0.95)' : 'rgba(226,232,240,0.80)',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {statusLabel}
            </div>
          ) : null}

          <div
            style={{
              color: 'white',
              fontSize: '68px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </div>
        </div>

        {/* フッター */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: 'rgba(34,211,238,0.80)',
              fontSize: '20px',
              fontWeight: 600,
              padding: '7px 20px',
              borderRadius: '100px',
              border: '1px solid rgba(34,211,238,0.25)',
              background: 'rgba(34,211,238,0.08)',
            }}
          >
            Apps / {SITE_NAME}
          </div>
          <span style={{ color: 'rgba(148,163,184,0.50)', fontSize: '18px' }}>
            nexus-yk.vercel.app
          </span>
        </div>
      </div>
    ),
    size,
  );
}
