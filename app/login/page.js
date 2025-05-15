import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { LoginForm, NewAuthWrapper } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      route: ROUTES.LOGIN,
      seo: {
        metaTitle: 'Login',
      },
    },
  });
}

export default function LoginPage() {
  return (
    <NewAuthWrapper containerClass="flex flex-col w-full">
      <LoginForm />
      <NextLink
        href={ROUTES.FORGOT_PASSWORD}
        className="inline-flex items-center justify-center pt-2.5 text-xsm text-blue"
      >
        Forgot your password
      </NextLink>
    </NewAuthWrapper>
  );
}
