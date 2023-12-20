import { PageLayout } from '@/layouts';

export const revalidate = 0;

export default function RootLayout(props) {
  const { children } = props;
  return <PageLayout>{children}</PageLayout>;
}
