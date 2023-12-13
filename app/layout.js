import { ClientSidePackages } from '@/common';
import { BaseLayout } from '@/layouts';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default async function RootLayout({ children }) {
  return (
    <BaseLayout>
      {children}
      <ClientSidePackages />
    </BaseLayout>
  );
}
