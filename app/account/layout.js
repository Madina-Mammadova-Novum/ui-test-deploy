import { AccountLayout } from '@/layouts';

export default function RootLayout(props) {
  const { children } = props;
  return <AccountLayout>{children}</AccountLayout>;
}
