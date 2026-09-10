import Link from 'next/link';

export const metadata = {
  title: 'Marketplace',
  description: 'Dify / n8n ワークフローのダウンロード販売（準備中）の予告ページです。',
};

/**
 * マーケットプレイス（Phase 1 は準備中の案内のみ）。
 * Phase 2 以降で Stripe 決済や商品詳細（`app/marketplace/[slug]/page.tsx`）を追加する余地を残します。
 */
export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Marketplace</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-100/90 sm:text-lg">
        Dify / n8n のワークフローをダウンロード販売できる場所（予定）です。
      </p>

      <div className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-950/25 p-6 text-amber-50 ring-1 ring-amber-300/25">
        <p className="text-lg font-bold text-yellow-200">Coming Soon</p>
        <p className="mt-3 text-base leading-relaxed">
          Phase 1 では決済・認証・DB を実装しません。商品一覧、価格、購入フローは後続フェーズで追加します。
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white">予定している拡張</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-100/90">
          <li>ワークフロー商品の詳細ページ（例: `app/marketplace/[slug]/page.tsx`）</li>
          <li>Stripe 決済（購入後のダウンロード）</li>
          <li>Supabase 認証（購入履歴・保存枠の管理）</li>
        </ul>
      </div>

      <div className="mt-10">
        <Link
          href="/apps"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          アプリ一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
