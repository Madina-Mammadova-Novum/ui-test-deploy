'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { fetchNotifications } from '@/store/entities/notifications/actions';
import { setIsAuthenticated, setRoleIdentity } from '@/store/entities/user/slice';
import { getNotificationsDataSelector } from '@/store/selectors';
import notificationService from '@/utils/signalr';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();
  const { filterParams } = useSelector(getNotificationsDataSelector);

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });
    const result = await update({ ...refreshedData });
    return result;
  }, [session, update]);

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

  useEffect(() => {
    getGeneralData();
  }, [getGeneralData]);

  useEffect(() => {
    if (session?.accessToken) setUserData({ role: session?.role, isValid: true });
    if (Date.now() > session?.expires) updateSession();

    return () => {
      setUserData({ role: null, isValid: false });
    };
  }, [session?.accessToken, session?.expires, session?.role, setUserData, updateSession]);

  useEffect(() => {
    if (session?.accessToken) {
      notificationService.start();
    } else {
      notificationService.stop();
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (session?.accessToken) dispatch(fetchNotifications(filterParams));
  }, [dispatch, filterParams, session?.accessToken]);

  return children;
};

export default ExtraDataManager;
