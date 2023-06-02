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
    <AuthWrapper title="Log in" containerClass="flex flex-col w-1/2 3md:w-1/3 3md:mx-32 lg:mx-40">
      <LoginForm />
      <NextLink
        href={ROUTES.FORGOT_PASSWORD}
        className="inline-flex justify-center items-center pt-2.5 text-blue text-xsm"
      >
        Forgot your password
      </NextLink>
    </AuthWrapper>
  );
};

export default LoginPage;
