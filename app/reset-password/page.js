import React from 'react';

import { metaData } from '@/adapters/metaData';
import { AuthWrapper, ResetPasswordForm } from '@/modules';

export async function generateMetadata({ params }) {
  // eslint-disable-next-line no-console
  console.log({ params });
  return metaData({
    data: {
      seo: {
        metaTitle: 'Reset Password',
      },
    },
  });
}

const ResetPasswordPage = () => {
  return (
    <AuthWrapper
      title="Reset your password"
      subtitle="Pick and set a new password for your account and you’re good to go!"
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
