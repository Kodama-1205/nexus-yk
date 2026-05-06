import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

/**
 * Pro プランの Stripe Checkout Session を生成します。
 * ログイン済みユーザーのみ利用可能です。
 */
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // すでに Pro の場合はスキップ
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single();

  if ((profile as { plan: string } | null)?.plan === 'pro') {
    return NextResponse.json({ error: 'Already Pro' }, { status: 400 });
  }

  const { origin } = new URL(request.url);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer_email: user.email,
    metadata: {
      user_id: user.id,
    },
    success_url: `${origin}/account?upgraded=1`,
    cancel_url: `${origin}/account`,
  });

  return NextResponse.json({ url: session.url });
}
