import { metaData } from '@/adapters/metaData';
import { NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { AuthWrapper, LoginForm } from '@/modules';

export async function generateMetadata({ params }) {
  // eslint-disable-next-line no-console
  console.log({ temp: params });
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
      <NextLink href={ROUTES.FORGOT_PASSWORD} className="text-blue underline text-xsm">
        Forgot your password
      </NextLink>
    </AuthWrapper>
  );
};

export default LoginPage;
