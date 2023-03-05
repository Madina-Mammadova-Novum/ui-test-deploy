import React from 'react';

import { metaData } from '@/adapters/metaData';
import { AuthWrapper, ForgotPasswordForm } from '@/modules';

export async function generateMetadata({ params }) {
  // eslint-disable-next-line no-console
  console.log({ params });
  return metaData({
    data: {
      seo: {
        metaTitle: 'Forgot Password',
      },
    },
  });
}

const ForgotPasswordPage = () => {
  return (
    <AuthWrapper
      title="Forgot your password?"
      subtitle="Enter your email address and you will receive an email with password reset link"
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
};

export default ForgotPasswordPage;
