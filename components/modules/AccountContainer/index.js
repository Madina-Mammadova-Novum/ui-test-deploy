'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import { chatNotificationService, globalNotificationService } from '@/services/signalR';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { getNotificationsDataSelector, getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { collapsed } = useSelector(getSidebarSelector);
  const { filterParams } = useSelector(getNotificationsDataSelector);

  useEffect(() => {
    chatNotificationService.init();
    globalNotificationService.init();
  }, []);

  useEffect(() => {
    dispatch(fetchNotifications(filterParams));
  }, [filterParams, pathname]);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}
