import { AccountLayout } from '@/layouts';

export const revalidate = 0;

export default function RootLayout({ children }) {
  return <AccountLayout>{children}</AccountLayout>;
}
