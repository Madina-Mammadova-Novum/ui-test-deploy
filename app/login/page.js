import { metaData } from '@/adapters/metaData';
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
    </AuthWrapper>
  );
};

export default LoginPage;
