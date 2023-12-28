'use client';

import { signOut } from 'next-auth/react';

import { LogoutButtonPropTypes } from '@/lib/types';

import { signOutAdapter } from '@/adapters/user';
import { Button } from '@/elements';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const reset = () => {
    localStorage.clear();
  };

  const handleSignOut = async () => {
    await signOut({ ...signOutAdapter() }).then(reset);
  };

  return (
    <Button
      customStyles={className}
      buttonProps={{ text, variant, icon: { before: icon }, size: 'large' }}
      onClick={handleSignOut}
    />
  );
};

LogoutButton.propTypes = LogoutButtonPropTypes;

export default LogoutButton;
