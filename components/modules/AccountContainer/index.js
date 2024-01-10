'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AccountContainerPropTyes } from '@/lib/types';

import { chatNotificationService, notificationService } from '@/services/signalR';
import { getListOfChats } from '@/store/entities/chat/actions';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { getNotificationsDataSelector, getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const dispatch = useDispatch();

  const { collapsed } = useSelector(getSidebarSelector);
  const { filterParams } = useSelector(getNotificationsDataSelector);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPorts());
    dispatch(getListOfChats());
  }, []);

  useEffect(() => {
    chatNotificationService.initStatus();
    notificationService?.initNotifications();
  }, []);

  useEffect(() => {
    dispatch(fetchNotifications(filterParams));
  }, [filterParams]);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}

AccountContainer.propTypes = AccountContainerPropTyes;
