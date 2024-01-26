import { BaseLayout } from '@/layouts';
import Providers from '@/providers';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default function RootLayout({ children }) {
  return (
    <BaseLayout>
      <Providers loader="page">{children}</Providers>
    </BaseLayout>
  );
}
