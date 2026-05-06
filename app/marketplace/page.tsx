import { redirect } from 'next/navigation';

/** /marketplace → /dify にリダイレクト */
export default function MarketplacePage() {
  redirect('/dify');
}
