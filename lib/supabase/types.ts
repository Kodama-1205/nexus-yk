/**
 * Supabase のテーブル型定義です。
 * `supabase gen types typescript` で自動生成することもできますが、
 * Phase 2 初期はスキーマが安定していないため手動管理します。
 */

export type Plan = 'free' | 'pro';
export type AppStatus = '公開' | 'ベータ' | '準備中';
export type OrderStatus = 'pending' | 'completed' | 'failed';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          plan: Plan;
          stripe_customer_id: string | null;
          upgraded_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          plan?: Plan;
          stripe_customer_id?: string | null;
          upgraded_at?: string | null;
          created_at?: string;
        };
        Update: {
          plan?: Plan;
          stripe_customer_id?: string | null;
          upgraded_at?: string | null;
        };
      };
      apps: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_description: string;
          long_description: string;
          category: string;
          tech_stack: string[];
          live_url: string | null;
          github_url: string | null;
          screenshot: string;
          status: AppStatus;
          published_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['apps']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['apps']['Insert']>;
      };
      marketplace_items: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          category: string;
          file_path: string;
          thumbnail_path: string | null;
          is_published: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['marketplace_items']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['marketplace_items']['Insert']>;
      };
      user_saves: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          saved_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          saved_at?: string;
        };
        Update: never;
      };
      stripe_orders: {
        Row: {
          id: string;
          user_id: string;
          stripe_session_id: string;
          stripe_payment_intent_id: string | null;
          amount: number;
          status: OrderStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_session_id: string;
          stripe_payment_intent_id?: string | null;
          amount: number;
          status?: OrderStatus;
          created_at?: string;
        };
        Update: {
          stripe_payment_intent_id?: string | null;
          status?: OrderStatus;
        };
      };
    };
  };
}
