import { AccountLayout } from '@/layouts';
import Providers from '@/providers';

export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <Providers loader="page">
      <AccountLayout>{children}</AccountLayout>
    </Providers>
  );
}
