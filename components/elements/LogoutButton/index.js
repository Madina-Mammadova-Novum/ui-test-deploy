'use client';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { LogoutButtonPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ROUTES } from '@/lib';
import { clearSession } from '@/store/entities/auth/slice';
import { resetUser } from '@/store/entities/chat/slice';
import { resetNotificationData } from '@/store/entities/notifications/slice';

const LogoutButton = ({ text = 'Log out', variant = 'tertiary', className = '!border-none', icon }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearSession());
    dispatch(resetNotificationData());
    dispatch(resetUser());
    router.replace(ROUTES.LOGIN);
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
