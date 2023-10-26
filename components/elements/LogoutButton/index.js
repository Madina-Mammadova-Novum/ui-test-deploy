'use client';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { LogoutButtonPropTypes } from '@/lib/types';

import { signOutAdapter } from '@/adapters/user';
import { Button } from '@/elements';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const resetUserData = () => {
    dispatch(setRoleIdentity(null));
    dispatch(setIsAuthenticated(false));
  };

  const handleSignOut = async () => {
    const { url } = await signOut({ ...signOutAdapter() });
    router.replace(url ?? '/');
    resetUserData();
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
