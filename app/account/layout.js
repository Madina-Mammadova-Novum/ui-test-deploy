import { getServerSession } from 'next-auth';

import { ExtraDataManager } from '@/common';
import { AccountLayout } from '@/layouts';
import { Chat } from '@/modules';
import Providers from '@/providers';
import { AUTHCONFIG } from '@/utils/auth';

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <Providers loader="page" session={session}>
      <AccountLayout session={session}>
        <ExtraDataManager session={session}>{children}</ExtraDataManager>
      </AccountLayout>
      <Chat isAuth={!session?.error && session?.accessToken} />
    </Providers>
  );
}
