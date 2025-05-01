import { ClientSidePackages } from '@/common';
import { BaseLayout } from '@/layouts';
import Providers from '@/providers';

export const metadata = {
  title: {
    default: 'Ship.Link',
    template: '%s | Ship.Link',
  },
};

export default function RootLayout({ children }) {
  return (
    <BaseLayout>
      <Providers loader="page">
        {children}
        <ClientSidePackages />
      </Providers>
    </BaseLayout>
  );
}
