export const metadata = {
  title: '利用規約',
  description: 'Nexus-YK の利用規約です。',
};

import { CONTACT_FORM_URL } from '@/lib/site';

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">利用規約</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-100/90">
        本規約は、児玉勇輝（以下「当運営者」）が運営する本サイト（Nexus-YK、以下「本サイト」）の利用に関する条件を定めるものです。本サイトをご利用いただく場合、本規約に同意したものとみなします。
      </p>

      <section className="mt-10 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第1条（適用）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本規約は、本サイト上で提供するすべてのコンテンツおよびサービスの利用に適用されます。当運営者が別途定める個別規約・ガイドラインがある場合は、それらも本規約の一部を構成するものとします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第2条（禁止事項）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          利用者は、本サイトの利用にあたり、以下の行為を行ってはなりません。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-100/90">
          <li>法令または公序良俗に違反する行為</li>
          <li>当運営者または第三者の著作権・商標権その他の知的財産権を侵害する行為</li>
          <li>当運営者または第三者の名誉・信用を毀損する行為</li>
          <li>本サイトのサーバーまたはネットワークに過度な負荷をかける行為</li>
          <li>本サイトの運営を妨害するおそれのある行為</li>
          <li>不正アクセスまたはそれに類する行為</li>
          <li>その他、当運営者が不適切と判断する行為</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第3条（著作権・知的財産権）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本サイトに掲載されているテキスト・画像・デザインその他のコンテンツの著作権は、当運営者または正当な権利者に帰属します。私的使用の範囲を超えた複製・転載・改変・再配布等は、事前の書面による許可なく行うことはできません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          ただし、本サイトから外部公開しているオープンソースコード（GitHub リポジトリ）については、各リポジトリのライセンスに従うものとします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第4条（免責事項）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          当運営者は、本サイトに掲載する情報の正確性・完全性・最新性について最善を尽くしますが、これらを保証するものではありません。本サイトの利用によって生じた損害について、当運営者は一切の責任を負いません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          本サイトから遷移する外部リンク先（各アプリ・GitHub 等）のコンテンツおよびサービスについて、当運営者は管理・保証する立場になく、それらの利用に起因するいかなる損害についても責任を負いません。
        </p>
        <p className="text-base leading-relaxed text-slate-100/90">
          本サイトは、予告なくサービスの変更・停止・終了を行う場合があります。これにより生じた損害について、当運営者は責任を負いません。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第5条（規約の改訂）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          当運営者は、必要と判断した場合に本規約を改訂することがあります。改訂後の規約は本ページに掲載した時点で効力を生じるものとし、以降の利用をもって改訂内容に同意したものとみなします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第6条（準拠法）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本規約の解釈・適用は日本法に準拠するものとします。
        </p>
      </section>

      <section className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-white">第7条（お問い合わせ）</h2>
        <p className="text-base leading-relaxed text-slate-100/90">
          本規約に関するご質問・ご意見は、下記フォームよりお問い合わせください。
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
