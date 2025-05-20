import NewAuthLayout from '@/layouts/NewAuthLayout';
import { ROUTES } from '@/lib';

export default async function RootLayout(props) {
  const { children } = props;
  const navigation = {
    placeholder: 'Don’t have an account?',
    contrasted: true,
    cta: 'Registration',
    path: ROUTES.SIGNUP,
  };
  return (
    <NewAuthLayout
      navigation={navigation}
      containerClass="flex flex-col items-center 3md:items-end w-full py-16 md:py-20 3md:py-24"
    >
      {children}
    </NewAuthLayout>
  );
}
