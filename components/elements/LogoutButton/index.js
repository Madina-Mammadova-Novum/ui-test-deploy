'use client';

import { useRouter } from 'next/navigation';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { removeCookie } from '@/utils/helpers';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const router = useRouter();

  const handleSignOut = () => {
    removeCookie('session-user-role');
    removeCookie('session-access-token');
    removeCookie('session-refresh-token');
    localStorage.clear();
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
