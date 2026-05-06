import { ImageResponse } from 'next/og';

import { SITE_NAME } from '@/lib/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 右上の光彩 */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)',
          }}
        />
        {/* 左下の光彩 */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-60px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
          }}
        />

        {/* ロゴバッジ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background:
                'linear-gradient(135deg, rgba(34,211,238,0.30), rgba(56,189,248,0.18))',
              border: '1px solid rgba(34,211,238,0.35)',
            }}
          >
            <span
              style={{ color: 'white', fontSize: '18px', fontWeight: 900 }}
            >
              YK
            </span>
          </div>
          <span
            style={{
              color: 'rgba(226,232,240,0.85)',
              fontSize: '26px',
              fontWeight: 700,
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        {/* メインコピー */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              color: 'white',
              fontSize: '76px',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-1px',
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              color: 'rgba(226,232,240,0.80)',
              fontSize: '34px',
              fontWeight: 400,
            }}
          >
            Portfolio &amp; App Showcase
          </div>
        </div>

        {/* ボトム情報 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                color: 'rgba(34,211,238,0.95)',
                fontSize: '20px',
                fontWeight: 600,
                padding: '8px 22px',
                borderRadius: '100px',
                border: '1px solid rgba(34,211,238,0.35)',
                background: 'rgba(34,211,238,0.10)',
              }}
            >
              Freelance Engineer
            </div>
            <span
              style={{
                color: 'rgba(148,163,184,0.70)',
                fontSize: '20px',
              }}
            >
              Mishima, Shizuoka
            </span>
          </div>
          <span
            style={{
              color: 'rgba(148,163,184,0.50)',
              fontSize: '18px',
            }}
          >
            nexus-yk.vercel.app
          </span>
        </div>
      </div>
    ),
    size,
  );
}
