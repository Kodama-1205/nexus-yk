import { AppsCatalogClient } from '@/components/AppsCatalogClient';

import { getAllApps } from '@/lib/apps-data';

export const metadata = {
  title: 'Apps',
  description: 'Nexus-YK に掲載している自作アプリ一覧です。',
};

/**
 * アプリ一覧ページです。
 * グリッド表示とカテゴリフィルタ（クライアント）を提供します。
 */
export default async function AppsIndexPage() {
  const apps = await getAllApps();
  return <AppsCatalogClient apps={apps} />;
}
