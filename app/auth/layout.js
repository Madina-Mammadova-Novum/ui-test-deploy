import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';

export default async function RootLayout(props) {
  const { children } = props;
  const navigation = {
    placeholder: 'Already have an account?',
    contrasted: true,
    cta: 'Log in',
    path: ROUTES.AUTH,
  };
  return (
    <AuthLayout navigation={navigation} containerClass="flex flex-col items-center 3md:items-end w-full">
      {children}
    </AuthLayout>
  );
}
