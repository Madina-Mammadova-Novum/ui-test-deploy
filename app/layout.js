import { AuthManager } from '@/common';

export const metadata = {
  title: {
    default: 'Shiplink',
    template: '%s | Shiplink',
  },
};

export default function RootLayout({ children }) {
  return <AuthManager>{children}</AuthManager>;
}
