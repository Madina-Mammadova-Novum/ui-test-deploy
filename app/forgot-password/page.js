'use client';

import React from 'react';

import AuthLayout from '@/layouts/AuthLayout';
import { ForgotPasswordBlock } from '@/modules';

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordBlock
        title="Forgot your password?"
        subtitle="Enter your email address and you will receive an email with password reset link"
      />
    </AuthLayout>
  );
};

export default ForgotPassword;
