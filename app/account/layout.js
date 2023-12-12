import { getServerSession } from 'next-auth';

import { AccountLayout } from '@/layouts';
import { Chat } from '@/modules';
import Providers from '@/providers';
import { AUTHCONFIG } from '@/utils/auth';

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <Providers loader="page">
      <AccountLayout session={session}>{children}</AccountLayout>
      <Chat isAuth={Boolean(session?.accessToken)} />
    </Providers>
  );
}
