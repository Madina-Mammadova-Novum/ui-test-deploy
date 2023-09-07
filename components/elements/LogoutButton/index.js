'use client';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from 'next-auth/react';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const dispatch = useDispatch();

  const resetUserData = useCallback(() => {
    dispatch(setRoleIdentity(null));
    dispatch(setIsAuthenticated(false));
  }, [dispatch]);

  const handleSignOut = useCallback(async () => {
    await signOut().then(() => resetUserData());
  }, [resetUserData]);

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
