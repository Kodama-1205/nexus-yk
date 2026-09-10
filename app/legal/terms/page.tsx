export const metadata = {
  title: '利用規約（雛形）',
  description: '利用規約（雛形）。本文は後から差し替え可能です。',
};

/**
 * 利用規約の雛形ページです（Phase 1）。
 * 法的文面の最終稿は依頼者・専門家の確認が必要です。
 */
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">利用規約（雛形）</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-100/90">
        このページは骨組みのみです。公開前に条文を作成し、必要に応じて専門家のレビューを受けてください。
      </p>

      <section className="mt-10 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第1条（適用）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成）</p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第2条（禁止事項）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成）</p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第3条（免責）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成）</p>
      </section>
    </div>
  );
}
