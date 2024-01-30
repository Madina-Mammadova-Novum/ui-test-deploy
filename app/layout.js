import { BaseLayout } from '@/layouts';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default function RootLayout({ children }) {
  return <BaseLayout>{children}</BaseLayout>;
}
