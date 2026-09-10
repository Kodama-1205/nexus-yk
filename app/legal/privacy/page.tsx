export const metadata = {
  title: 'プライバシーポリシー（雛形）',
  description: 'プライバシーポリシー（雛形）。本文は後から差し替え可能です。',
};

/**
 * プライバシーポリシーの雛形ページです（Phase 1）。
 * 収集するデータが確定したタイミングで本文を更新してください。
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">プライバシーポリシー（雛形）</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-100/90">
        Phase 1 では認証・決済・DB を実装しない前提のため、個人情報の取り扱いは最小限です。将来の拡張に合わせて本文を更新します。
      </p>

      <section className="mt-10 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">1. 取得する情報</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成：アクセスログ等の扱いを追記）</p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">2. 利用目的</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成）</p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">3. 第三者提供</h2>
        <p className="text-base leading-relaxed text-slate-100/90">（本文未作成）</p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">4. お問い合わせ</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          {/* 連絡先は未確認のためプレースホルダに留めます。 */}
          （連絡先未設定） {/* TODO: 依頼者確認待ち */}
        </p>
      </section>
    </div>
  );
}
