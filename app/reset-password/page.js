'use client';

import React from 'react';

import AuthLayout from '@/layouts/AuthLayout';
import { ResetPasswordBlock } from '@/modules';

const ResetPassword = () => {
  return (
    <AuthLayout>
      <ResetPasswordBlock
        title="Reset your password"
        subtitle="Pick and set a new password for your account and you’re good to go!"
      />
    </AuthLayout>
  );
};

export default ResetPassword;
