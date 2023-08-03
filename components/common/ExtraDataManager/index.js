/* eslint-disable no-return-await */

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
  const { data: session, update } = useSession();

  const dispatch = useDispatch();

  const { filterParams } = useSelector(getNotificationsDataSelector);

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    return await update({ ...refreshedData });
  }, [session, update]);

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
    dispatch(fetchNotifications(filterParams));
  }, [dispatch, filterParams]);

  const setUserData = useCallback(
    ({ role = null, isValid = false }) => {
      dispatch(setRoleIdentity(role));
      dispatch(setIsAuthenticated(isValid));
    },
    [dispatch]
  );

  useEffect(() => {
    notificationService.start();
    getGeneralData();

    return () => {
      notificationService.stop();
    };
  }, [getGeneralData]);

  useEffect(() => {
    if (session?.accessToken) setUserData({ role: session?.role, isValid: true });
    else setUserData({ role: null, isValid: false });
  }, [session?.accessToken, session?.role, setUserData]);

  useEffect(() => {
    if (Date.now() > session?.expires) updateSession();
  }, [session?.expires, updateSession]);

  return children;
};

export default ExtraDataManager;
