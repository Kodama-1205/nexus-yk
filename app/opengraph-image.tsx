import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nexus-YK';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0c1527 0%, #0f2040 50%, #1e293b 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景の装飾円 */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '30%',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* 上部のシアンライン */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '3px',
            background: 'linear-gradient(90deg, #0891b2, #38bdf8, transparent)',
            display: 'flex',
          }}
        />

        {/* N アイコン（右上） */}
        <div
          style={{
            position: 'absolute',
            top: '56px',
            right: '80px',
            width: '72px',
            height: '72px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0c1527, #1e293b)',
            border: '1.5px solid rgba(56,189,248,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: '#38bdf8',
              fontFamily: 'sans-serif',
              lineHeight: 1,
            }}
          >
            N
          </span>
        </div>

        {/* カテゴリバッジ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            background: 'rgba(6,182,212,0.15)',
            border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: '999px',
            padding: '8px 20px',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#7dd3fc',
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            AI × 個人開発
          </span>
        </div>

        {/* メインタイトル */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'sans-serif',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          Nexus-YK
        </div>

        {/* サブタイトル */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(186,230,253,0.85)',
            fontFamily: 'sans-serif',
            lineHeight: 1.5,
            display: 'flex',
          }}
        >
          個人開発アプリと Dify ワークフローを集約するサイト
        </div>

        {/* 下部のアクセントライン */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0891b2, #38bdf8, transparent)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
