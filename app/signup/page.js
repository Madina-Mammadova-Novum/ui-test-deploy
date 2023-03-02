'use client';

import React from 'react';

import AuthLayout from '@/layouts/AuthLayout';
import { Signup } from '@/modules';

export default function SignUp() {
  return (
    <AuthLayout>
      <Signup containerClass="col-start-2 mt-11" />
    </AuthLayout>
  );
}
