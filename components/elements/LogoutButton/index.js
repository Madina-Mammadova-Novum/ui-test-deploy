'use client';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { clearSession } from '@/store/entities/auth/slice';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearSession());
    router.refresh();
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
