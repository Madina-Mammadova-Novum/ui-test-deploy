import { getServerSession } from 'next-auth';

import { AuthManager, ClientSidePackages, StoreManager } from '@/common';
import { BaseLayout } from '@/layouts';
import { AUTHCONFIG } from '@/utils/auth';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export const revaliadte = 60;

export default async function RootLayout({ children }) {
  const session = await getServerSession(AUTHCONFIG);

  return (
    <BaseLayout>
      <AuthManager session={session}>
        <StoreManager>
          {children}
          <ClientSidePackages />
        </StoreManager>
      </AuthManager>
    </BaseLayout>
  );
}
