/**
 * 外部 URL の扱いを安全側に寄せるための小さなユーティリティです。
 * （`javascript:` 等の想定外スキームを弾き、別タブ遷移の属性を統一します）
 */

/**
 * `http:` / `https:` のみ true を返します。
 */
export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
