'use client';

import { useDispatch } from 'react-redux';

import { signOut } from 'next-auth/react';

import { LogoutButtonPropTypes } from '@/lib/types';

import { signOutAdapter } from '@/adapters/user';
import { Button } from '@/elements';
import { wssCleaner } from '@/services/signalR';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const dispatch = useDispatch();

  const reset = () => {
    wssCleaner();
    dispatch(setRoleIdentity(null));
    dispatch(setIsAuthenticated(false));
  };

  const handleSignOut = async () => {
    await signOut({ ...signOutAdapter() }).then(() => reset());

    return null;
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
