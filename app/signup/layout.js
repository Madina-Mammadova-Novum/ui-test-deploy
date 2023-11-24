import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';
import Providers from '@/providers';

export default async function RootLayout(props) {
  const { children } = props;
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
      <Providers>{children}</Providers>
    </AuthLayout>
  );
}
