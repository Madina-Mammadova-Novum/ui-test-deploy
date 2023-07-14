/* eslint-disable no-return-await */

'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';

const ExtraDataManager = ({ children }) => {
  const { data: session, update } = useSession();
  const dispatch = useDispatch();

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    return await update({ ...refreshedData });
  }, [session, update]);

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    getGeneralData();
  }, []);

  useEffect(() => {
    if (Date.now() > session?.expires) {
      getGeneralData();
      updateSession();
    }
  }, [getGeneralData, session?.expires, updateSession]);

  return children;
};

export default ExtraDataManager;
