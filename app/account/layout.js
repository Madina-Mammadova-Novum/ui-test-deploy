import { PageLayout } from '@/layouts';

export default function RootLayout(props) {
  const { children } = props;
  return <PageLayout>{children}</PageLayout>;
}
