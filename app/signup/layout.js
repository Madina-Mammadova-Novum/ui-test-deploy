import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';

export default async function RootLayout(props) {
  const { children } = props;
  const navigation = {
    placeholder: 'Already have an account?',
    contrasted: true,
    cta: 'Log in',
    path: ROUTES.LOGIN,
  };
  return (
    <AuthLayout navigation={navigation} containerClass="grid grid-cols-1 xl:grid-cols-2">
      {children}
    </AuthLayout>
  );
}
