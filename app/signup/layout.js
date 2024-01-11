import { metaData } from '@/adapters/metaData';
import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.SIGNUP,
      seo: {
        metaTitle: 'Sign Up',
      },
    },
  });
}

export default function RootLayout({ children }) {
  const navigation = {
    placeholder: 'Already have an account?',
    contrasted: true,
    cta: 'Log in',
    path: ROUTES.LOGIN,
  };

  return (
    <AuthLayout
      navigation={navigation}
      containerClass="grid place-items-center 3md:place-items-start 3md:mr-20 xl:mr-40 grid-cols-1 3md:grid-cols-2"
    >
      {children}
    </AuthLayout>
  );
}
