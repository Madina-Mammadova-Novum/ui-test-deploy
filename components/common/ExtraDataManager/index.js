'use client';

import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';
import { errorToast } from '@/utils/hooks';

const ExtraDataManager = ({ children, session }) => {
  const dispatch = useDispatch();

  const getGeneralData = useCallback(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  }, [dispatch]);

  const setUserData = useCallback(
    ({ role = null }) => {
      dispatch(setRoleIdentity(role));
    },
    [dispatch]
  );

  useEffect(() => {
    getGeneralData();
  }, []);

  if (session?.error) {
    errorToast('Bad request ', session.error);
  }

  useEffect(() => {
    if (session?.role) {
      return setUserData({ role: session.role });
    }

    return setUserData({ role: null });
  }, [session?.role]);

  return children;
};

export default memo(ExtraDataManager);
