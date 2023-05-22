'use client';

import { signIn } from 'next-auth/react';

import { LoginButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const LoginButton = ({ text = 'Log in', variant = 'tertiary', className = '' }) => {
  return <Button customStyles={className} buttonProps={{ text, variant, size: 'large' }} onClick={() => signIn()} />;
};

LoginButton.propTypes = LoginButtonPropTypes;

export default LoginButton;
