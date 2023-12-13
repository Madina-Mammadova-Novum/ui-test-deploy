'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';
import { errorToast } from '@/utils/hooks';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const getGeneralData = () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  const setUserData = ({ role = null }) => {
    dispatch(setRoleIdentity(role));
  };

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

export default ExtraDataManager;
