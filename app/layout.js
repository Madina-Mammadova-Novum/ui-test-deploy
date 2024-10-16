import { ClientSidePackages } from '@/common';
import { BaseLayout } from '@/layouts';
import Providers from '@/providers';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default function RootLayout({ children }) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  return (
    <BaseLayout>
      <Providers loader="page">
        {children}
        {!isMaintenanceMode && <ClientSidePackages />}
      </Providers>
    </BaseLayout>
  );
}
