import { AppsCatalogClient } from '@/components/AppsCatalogClient';

import { getAllApps } from '@/lib/apps-data';
import { createClient } from '@/lib/supabase/server';
import type { Plan } from '@/lib/supabase/types';

export const metadata = {
  title: 'Apps',
  description: 'Nexus-YK に掲載している自作アプリ一覧です。',
};

export default async function AppsIndexPage() {
  const [apps, supabase] = await Promise.all([getAllApps(), Promise.resolve(createClient())]);

  const { data: { user } } = await supabase.auth.getUser();

  let isPro = false;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();
    isPro = (data as { plan: Plan } | null)?.plan === 'pro';
  }

  return <AppsCatalogClient apps={apps} isPro={isPro} />;
}
