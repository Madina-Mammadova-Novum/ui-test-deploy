import React from 'react';

import { metaData } from '@/adapters/metaData';
import { AuthWrapper, Signup } from '@/modules';

export async function generateMetadata({ params }) {
  // eslint-disable-next-line no-console
  console.log({ params });
  return metaData({
    data: {
      seo: {
        metaTitle: 'Sign Up',
      },
    },
  });
}

export default function SignUp() {
  return (
    <AuthWrapper title="Registration" subtitle="Here can be some registration text">
      <Signup />
    </AuthWrapper>
  );
}
