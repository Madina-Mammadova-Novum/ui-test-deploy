import { metaData } from '@/adapters/metaData';
import { NewAuthLayout } from '@/layouts';
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
    <NewAuthLayout
      navigation={navigation}
      containerClass="flex flex-col items-center w-full py-16 md:pb-20 md:pt-12 3md:pb-24 3md:pt-14"
    >
      {children}
    </NewAuthLayout>
  );
}
