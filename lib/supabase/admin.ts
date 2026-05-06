import { createClient } from '@supabase/supabase-js';

/**
 * Service Role Key を使うサーバー専用クライアントです。
 * RLS をバイパスして直接 DB にアクセスできます。
 * - ビルド時（generateStaticParams 等）や Webhook など、
 *   リクエストスコープ外で使用します。
 * - クライアントサイドには絶対に渡さないでください。
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
