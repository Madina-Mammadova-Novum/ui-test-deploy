'use client';

import { signOut } from 'next-auth/react';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  return (
    <Button
      customStyles={className}
      buttonProps={{ text, variant, icon: { before: icon }, size: 'large' }}
      onClick={() => signOut()}
    />
  );
};

LogoutButton.propTypes = LogoutButtonPropTypes;

export default LogoutButton;
