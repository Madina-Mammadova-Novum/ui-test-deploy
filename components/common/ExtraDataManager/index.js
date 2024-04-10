'use client';

import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setRoleIdentity } from '@/store/entities/user/slice';

const ExtraDataManager = ({ children, session }) => {
  const dispatch = useDispatch();

  const setUserData = useCallback(
    ({ role = null }) => {
      dispatch(setRoleIdentity(role));
    },
    [dispatch]
  );

  useEffect(() => {
    if (session?.role) {
      return setUserData({ role: session.role });
    }

    return setUserData({ role: null });
  }, [session?.role]);

  return children;
};

export default memo(ExtraDataManager);
