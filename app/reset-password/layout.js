import AuthLayout from '@/layouts/AuthLayout';
import { ROUTES } from '@/lib';

export default async function RootLayout(props) {
  const { children } = props;
  const navigation = {
    placeholder: 'Don’t have an account?',
    contrasted: true,
    cta: 'Registration',
    path: ROUTES.SIGNUP,
  };
  return <AuthLayout navigation={navigation}>{children}</AuthLayout>;
}
