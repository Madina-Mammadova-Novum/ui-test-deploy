import { AccountLayout } from '@/layouts';
import Providers from '@/providers';

export default function RootLayout({ children }) {
  return (
    <Providers>
      <AccountLayout>{children}</AccountLayout>
    </Providers>
  );
}
