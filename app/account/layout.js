import { getServerSession } from 'next-auth';

import { AccountLayout } from '@/layouts';
import Providers from '@/providers';
import { AUTHCONFIG } from '@/utils/auth';

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <Providers loader="page">
      <AccountLayout session={session}>{children}</AccountLayout>
    </Providers>
  );
}
