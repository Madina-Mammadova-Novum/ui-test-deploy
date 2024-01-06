'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { setRoleIdentity } from '@/store/entities/user/slice';

export default function AccountTemplate({ children }) {
  const { data } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());

    if (data?.role) {
      dispatch(setRoleIdentity(data?.role));
    }
  }, [dispatch]);

  return children;
}
