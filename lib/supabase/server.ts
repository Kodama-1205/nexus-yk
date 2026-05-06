import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * サーバーコンポーネント・Route Handler 用の Supabase クライアント。
 * cookie の読み書きを next/headers 経由で行います。
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component からの呼び出し時は set できない（読み取り専用）。
            // middleware でセッションが更新されるため実害なし。
          }
        },
      },
    },
  );
}
