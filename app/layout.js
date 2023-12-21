import { getServerSession } from 'next-auth';

import { AuthManager, ClientSidePackages } from '@/common';
import { BaseLayout } from '@/layouts';
import Providers from '@/providers';
import { AUTHCONFIG } from '@/utils/auth';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <BaseLayout>
      <AuthManager session={session} loader="page">
        <Providers>{children}</Providers>
      </AuthManager>
      <ClientSidePackages />
    </BaseLayout>
  );
}
