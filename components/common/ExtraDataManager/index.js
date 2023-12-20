'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSession } from 'next-auth/react';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';

const ExtraDataManager = ({ children }) => {
  const dispatch = useDispatch();

  const getGeneralData = async () => {
    const session = await getSession();

    dispatch(fetchPorts());
    dispatch(fetchCountries());

    if (session?.role) {
      dispatch(setRoleIdentity(session.role));
    }
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  return children;
};

export default ExtraDataManager;
