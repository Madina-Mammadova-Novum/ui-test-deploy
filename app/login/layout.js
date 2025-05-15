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
    <NewAuthLayout navigation={navigation} containerClass="flex flex-col items-center 3md:items-end w-full">
      {children}
    </NewAuthLayout>
  );
}
