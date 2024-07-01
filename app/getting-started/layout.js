import { metaData } from '@/adapters/metaData';
import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.GETTING_STARTED,
      seo: {
        metaTitle: 'Getting Started',
      },
    },
  });
}

export default function RootLayout({ children }) {
  const navigation = {
    placeholder: 'Welcome aboard!',
    contrasted: true,
    cta: 'Explore Now',
    path: ROUTES.ROOT,
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
