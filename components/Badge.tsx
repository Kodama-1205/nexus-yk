import type { AppCategory, AppStatus } from '@/lib/types';

type BadgeProps =
  | {
      kind: 'category';
      value: AppCategory;
    }
  | {
      kind: 'status';
      value: AppStatus;
    };

/**
 * カテゴリ／ステータス表示用の小さなバッジです。
 * コントラストと可読性を優先し、背景は落ち着いたトーンに寄せています。
 */
export function Badge(props: BadgeProps) {
  const baseClass =
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold leading-none ring-1 ring-inset';

  if (props.kind === 'category') {
    const categoryClass =
      'bg-sky-500/15 text-sky-100 ring-sky-400/30 sm:text-sm sm:px-3 sm:py-1.5';
    return (
      <span className={`${baseClass} ${categoryClass}`} aria-label={`カテゴリ: ${props.value}`}>
        {props.value}
      </span>
    );
  }

  const statusStyles: Record<AppStatus, string> = {
    公開: 'bg-emerald-500/15 text-emerald-100 ring-emerald-400/30',
    ベータ: 'bg-amber-500/15 text-amber-100 ring-amber-400/30',
    準備中: 'bg-white/10 text-slate-100 ring-white/15',
  };

  return (
    <span
      className={`${baseClass} ${statusStyles[props.value]} sm:text-sm sm:px-3 sm:py-1.5`}
      aria-label={`ステータス: ${props.value}`}
    >
      {props.value}
    </span>
  );
}
