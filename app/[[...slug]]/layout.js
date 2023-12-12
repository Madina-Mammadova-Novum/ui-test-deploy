import { getServerSession } from 'next-auth';

import { PageLayout } from '@/layouts';
import { Chat } from '@/modules';
import Providers from '@/providers';
import { AUTHCONFIG } from '@/utils/auth';

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <PageLayout>
      <Providers loader="page">
        {children}
        <Chat isAuth={Boolean(session?.accessToken)} />
      </Providers>
    </PageLayout>
  );
}
