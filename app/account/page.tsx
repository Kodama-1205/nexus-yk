import { redirect } from 'next/navigation';

import { UpgradeButton } from '@/components/UpgradeButton';
import { createClient } from '@/lib/supabase/server';
import type { Plan } from '@/lib/supabase/types';

export const metadata = {
  title: 'マイページ',
  description: 'プランの確認・保存済みアイテムの管理ができます。',
};

const FREE_SAVE_LIMIT = 2;

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 未ログインはログインページへ
  if (!user) {
    redirect('/auth/login?next=/account');
  }

  // プロフィール取得
  const { data: profileData } = await supabase
    .from('profiles')
    .select('plan, upgraded_at')
    .eq('id', user.id)
    .single();

  const profile = profileData as { plan: Plan; upgraded_at: string | null } | null;
  const plan: Plan = profile?.plan ?? 'free';
  const isPro = plan === 'pro';

  // 保存済みアイテム取得
  const { data: savesData } = await supabase
    .from('user_saves')
    .select('id, saved_at, marketplace_items(id, slug, title, category)')
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false });

  type SaveRow = {
    id: string;
    saved_at: string;
    marketplace_items: { id: string; slug: string; title: string; category: string } | null;
  };
  const saves = savesData as SaveRow[] | null;

  const saveCount = saves?.length ?? 0;
  const remaining = isPro ? null : Math.max(0, FREE_SAVE_LIMIT - saveCount);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">マイページ</h1>

      {/* アカウント情報 */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-lg font-bold text-white">アカウント情報</h2>
        <dl className="mt-4 space-y-3 text-base">
          <div className="flex flex-wrap items-center gap-3">
            <dt className="w-28 text-slate-400">メール</dt>
            <dd className="font-semibold text-slate-100">{user.email}</dd>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <dt className="w-28 text-slate-400">プラン</dt>
            <dd>
              {isPro ? (
                <span className="inline-flex items-center rounded-full bg-yellow-400/15 px-3 py-1 text-sm font-bold text-yellow-200 ring-1 ring-yellow-400/30">
                  Pro（無制限）
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-slate-200 ring-1 ring-white/15">
                  Free（最大 {FREE_SAVE_LIMIT} 件）
                </span>
              )}
            </dd>
          </div>
        </dl>

        {/* Pro アップグレード誘導 */}
        {!isPro && (
          <div className="mt-6 rounded-xl border border-yellow-400/20 bg-yellow-950/20 p-5">
            <p className="text-base font-semibold text-yellow-200">Pro プランにアップグレード</p>
            <p className="mt-2 text-sm leading-relaxed text-yellow-100/80">
              買い切り（一回払い）で Marketplace のアイテムを無制限に保存できます。
              現在は残り <strong>{remaining} 件</strong> 保存可能です。
            </p>
            <UpgradeButton />
          </div>
        )}
      </section>

      {/* 保存済みアイテム */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            保存済みアイテム
            <span className="ml-2 text-base font-normal text-slate-400">
              {saveCount} 件{!isPro && ` / ${FREE_SAVE_LIMIT} 件`}
            </span>
          </h2>
        </div>

        {saveCount === 0 ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur">
            <p className="text-base text-slate-300">まだアイテムを保存していません。</p>
            <a
              href="/marketplace"
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Marketplace を見る
            </a>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {saves?.map((save) => {
              const item = save.marketplace_items;
              if (!item) return null;
              return (
                <li
                  key={save.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur"
                >
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.category}</p>
                  </div>
                  <SaveDeleteButton saveId={save.id} />
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

/** 保存削除ボタン（クライアントコンポーネントとして切り出し） */
function SaveDeleteButton({ saveId }: { saveId: string }) {
  // Server Component 内に inline で配置（削除は別途 API Route 経由で実装）
  return (
    <form action={`/api/saves/${saveId}`} method="POST">
      <input type="hidden" name="_method" value="DELETE" />
      <button
        type="submit"
        className="rounded-lg border border-red-400/20 bg-red-950/20 px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-950/40"
      >
        削除
      </button>
    </form>
  );
}
