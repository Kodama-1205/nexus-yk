import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createAdminClient } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

/**
 * Stripe Webhook を受け取り、決済完了時にユーザーを Pro にアップグレードします。
 * Stripe ダッシュボードで `checkout.session.completed` イベントを登録してください。
 */
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;

    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // profiles を pro に更新
    await supabase
      .from('profiles')
      .update({
        plan: 'pro',
        stripe_customer_id: session.customer as string | null,
        upgraded_at: new Date().toISOString(),
      })
      .eq('id', userId);

    // 決済記録を保存
    await supabase.from('stripe_orders').insert({
      user_id: userId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string | null,
      amount: session.amount_total ?? 0,
      status: 'completed',
    });
  }

  return NextResponse.json({ received: true });
}
