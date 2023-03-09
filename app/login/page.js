'use client';

import { metaData } from '@/adapters/metaData';
import { FormManager } from '@/common';
import { AuthWrapper, LoginForm } from '@/modules';
import { loginOptions } from '@/utils/formOptions';

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
      <FormManager options={loginOptions()}>
        <LoginForm />
      </FormManager>
    </AuthWrapper>
  );
};

export default LoginPage;
