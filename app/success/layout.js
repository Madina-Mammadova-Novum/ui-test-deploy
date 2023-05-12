import AuthLayout from '@/layouts/AuthLayout';

export default async function RootLayout(props) {
  const { children } = props;
  const navigation = {
    placeholder: '',
    contrasted: true,
    cta: 'Return to Home page',
    path: '/',
  };
  return <AuthLayout navigation={navigation}>{children}</AuthLayout>;
}
