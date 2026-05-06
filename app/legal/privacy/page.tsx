export const metadata = {
  title: 'プライバシーポリシー',
  description: 'Nexus-YK のプライバシーポリシーです。',
};

import { CONTACT_FORM_URL } from '@/lib/site';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        プライバシーポリシー
      </h1>
      <p className="mt-3 text-base leading-relaxed text-slate-100/90">
        児玉勇輝（以下「当運営者」）は、本サイト（Nexus-YK）における個人情報の取り扱いについて、以下のとおり定めます。
      </p>

      <section className="mt-10 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">1. 取得する情報</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本サイトは、現時点（Phase 1）において会員登録・ログイン・決済機能を提供していないため、氏名・メールアドレス・クレジットカード番号などの個人情報を直接収集することはありません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          ただし、ホスティングサービス（Vercel）の仕様により、アクセス日時・IPアドレス・ブラウザ情報などのアクセスログが自動的に記録される場合があります。これらのログはインフラ事業者（Vercel Inc.）が管理するものであり、当運営者が個人を特定する目的で使用することはありません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          また、本サイトはフォント読み込みに Google Fonts を利用しています。フォントのリクエストに際し、ご利用のブラウザから Google のサーバーへIPアドレス等の情報が送信される場合があります。詳細は Google のプライバシーポリシーをご確認ください。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">2. 利用目的</h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-100/90">
          <li>本サイトの正常な運営・障害対応</li>
          <li>不正アクセスの検知・セキュリティの維持</li>
          <li>サービス改善のための統計的分析（個人を特定しない形での利用に限ります）</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">3. 第三者提供</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          当運営者は、法令に基づく場合を除き、取得した情報を第三者へ提供・開示することはありません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          本サイトから外部サービス（各アプリの公開 URL・GitHub リポジトリ等）へのリンクを掲載していますが、リンク先のプライバシー保護については各サービスのポリシーが適用されます。当運営者は外部サービスの取り扱いについて責任を負いません。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">4. Cookie・解析ツール</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          現時点において、当運営者が独自に設定する Cookie やアクセス解析ツールは使用していません。将来的に導入する場合は、本ポリシーを改訂したうえで本サイト上でお知らせします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">5. ポリシーの改訂</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本ポリシーの内容は、法令の変更やサービスの拡張に伴い、予告なく改訂することがあります。改訂後のポリシーは本ページに掲載した時点で効力を生じるものとします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">6. お問い合わせ</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本ポリシーに関するご質問・ご意見は、下記フォームよりお問い合わせください。
        </p>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          お問い合わせフォーム（Google フォーム）
        </a>
      </section>
    </div>
  );
}
