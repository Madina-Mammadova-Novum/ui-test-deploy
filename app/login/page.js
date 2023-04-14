import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, LoginForm } from '@/modules';

export function generateMetadata() {
  return metaData({
    data: {
      seo: {
        metaTitle: 'Login',
      },
    },
  });
}

const LoginPage = () => {
  return (
    <AuthWrapper title="Log in" containerClass="w-3/4">
      <LoginForm />
      <NextLink
        href={ROUTES.FORGOT_PASSWORD}
        className="inline-flex justify-center items-center w-full pt-2.5 text-blue underline text-xsm"
      >
        Forgot your password
      </NextLink>
    </AuthWrapper>
  );
};

export default LoginPage;
