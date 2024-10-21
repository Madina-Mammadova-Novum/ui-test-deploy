'use client';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { useHandleLogout } from '@/utils/hooks';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const handleLogout = useHandleLogout();

  return (
    <Button
      customStyles={className}
      buttonProps={{ text, variant, icon: { before: icon }, size: 'large' }}
      onClick={handleLogout}
    />
  );
};

LogoutButton.propTypes = LogoutButtonPropTypes;

export default LogoutButton;
