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

    await update({ ...refreshedData });
  }, [session, update]);

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    getGeneralData();

    if (session.accessToken) {
      notificationService.start();
      dispatch(setRoleIdentity(session.role));
      dispatch(setIsAuthenticated(true));
      dispatch(fetchNotifications(filterParams));

      if (Date.now() > session.expires) updateSession();
    }

    return () => {
      notificationService.stop();
      dispatch(setIsAuthenticated(false));
      dispatch(setRoleIdentity(null));
    };
  }, [session, updateSession, dispatch, filterParams, getGeneralData]);

  return children;
};

export default ExtraDataManager;
