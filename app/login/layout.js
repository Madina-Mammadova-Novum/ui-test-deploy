import NewAuthLayout from '@/layouts/NewAuthLayout';
import { ROUTES } from '@/lib';

export default function LoginLayout({ children }) {
  const navigation = {
    placeholder: 'Don’t have an account?',
    contrasted: true,
    cta: 'Registration',
    path: ROUTES.SIGNUP,
  };

  return (
    <NewAuthLayout
      navigation={navigation}
      containerClass="flex flex-col items-center 3md:items-end w-full py-16 md:py-20 3md:pb-24 3md:pt-14"
    >
      {children}
    </NewAuthLayout>
  );
}
