'use client';

import { useMemo, useState } from 'react';

import type { AppCategory, AppItem } from '@/lib/types';
import { APP_CATEGORIES } from '@/lib/types';

import { AppCard } from '@/components/AppCard';

type AppsCatalogClientProps = {
  apps: AppItem[];
  isPro?: boolean;
};

/**
 * アプリ一覧のカテゴリフィルタ付きカタログです（クライアントコンポーネント）。
 * フィルタ状態は URL に依存せず、初期表示の体感速度を優先しています。
 */
export function AppsCatalogClient({ apps, isPro = false }: AppsCatalogClientProps) {
  const [category, setCategory] = useState<AppCategory | 'すべて'>('すべて');

  const filtered = useMemo(() => {
    if (category === 'すべて') {
      return apps;
    }
    return apps.filter((a) => a.category === category);
  }, [apps, category]);

  const chips: Array<AppCategory | 'すべて'> = ['すべて', ...APP_CATEGORIES];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Apps</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-100/90 sm:text-lg">
          公開中の自作アプリ一覧です。カテゴリで絞り込みできます。
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="カテゴリフィルタ">
        {chips.map((c) => {
          const selected = c === category;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(c)}
              className={[
                'min-h-[44px] rounded-xl px-4 text-base font-semibold ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
                selected
                  ? 'bg-gradient-to-r from-sky-500/25 to-cyan-400/20 text-white ring-cyan-300/40'
                  : 'bg-white/5 text-slate-100/90 ring-white/10 hover:bg-white/10',
              ].join(' ')}
            >
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-base text-slate-200" role="status">
          該当するアプリがありません。別のカテゴリを選択してください。
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 lg:gap-6">
          {filtered.map((app) => (
            <AppCard key={app.slug} app={app} isPro={isPro} />
          ))}
        </div>
      )}
    </div>
  );
}
