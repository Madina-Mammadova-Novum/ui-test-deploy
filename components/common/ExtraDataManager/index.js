'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session, update } = useSession();

  const isExpired = Date.now() >= session?.expires;
  const isValid = Boolean(session?.accessToken);

  const getGeneralData = () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  const setUserData = ({ role = null }) => {
    dispatch(setRoleIdentity(role));
  };

  const updateSession = async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    await update({ ...refreshedData });
  };

  const sessionWatcher = async () => {
    if (isExpired) {
      await updateSession();
    }

    if (isValid) setUserData({ role: session?.role, isValid });
    else setUserData({ role: null, isValid: false });
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    sessionWatcher();
  }, [isExpired, isValid]);

  return children;
};

export default ExtraDataManager;
