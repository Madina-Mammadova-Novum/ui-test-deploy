'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AccountContainerPropTyes } from '@/lib/types';

import { chatNotificationService, globalNotificationService } from '@/services/signalR';
import { getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const { collapsed } = useSelector(getSidebarSelector);

  useEffect(() => {
    chatNotificationService.init();
    globalNotificationService.init();
  }, []);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}

AccountContainer.propTypes = AccountContainerPropTyes;
