'use client';

import { useRouter } from 'next/navigation';

import { LoginButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ROUTES } from '@/lib';

const LoginButton = ({ text = 'Log in', variant = 'tertiary', className = '' }) => {
  const router = useRouter();

  return (
    <Button
      customStyles={className}
      buttonProps={{ text, variant, size: 'large' }}
      onClick={() => router.push(ROUTES.LOGIN)}
    />
  );
};

LoginButton.propTypes = LoginButtonPropTypes;

export default LoginButton;
