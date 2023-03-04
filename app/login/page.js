import React from 'react';

import { metaData } from '@/adapters/metaData';

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

const ForgotPasswordPage = () => {
  return <h1>Login page content</h1>;
};

export default ForgotPasswordPage;
