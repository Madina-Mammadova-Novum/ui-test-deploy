'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { notificationService } from '@/services/signalR';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';
import { getNotificationsDataSelector } from '@/store/selectors';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const { filterParams } = useSelector(getNotificationsDataSelector);

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, [dispatch]);

  const setUserData = useCallback(
    ({ role = null, isValid = false }) => {
      dispatch(setRoleIdentity(role));
      dispatch(setIsAuthenticated(isValid));
    },
    [dispatch]
  );

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    await update({ ...refreshedData });
  }, [session?.refreshToken, update]);

  const resetUserParams = useCallback(() => {
    notificationService?.stop();
    setUserData({ role: null, isValid: false });
  }, [dispatch]);

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    if (session?.accessToken !== undefined) {
      setUserData({ role: session?.role, isValid: true });
      notificationService?.initNotifications();
      dispatch(fetchNotifications(filterParams));
    }

    if (session?.expires <= Date.now()) updateSession();

    return () => {
      resetUserParams();
    };
  }, [filterParams, session]);

  return children;
};

export default ExtraDataManager;
