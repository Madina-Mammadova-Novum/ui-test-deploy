/* eslint-disable no-return-await */

'use client';

import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import { refreshAccessToken } from '@/services';
import { getSidebarSelector } from '@/store/selectors';

const AccountContainer = ({ children }) => {
  const { data: session, update } = useSession();
  const { collapsed } = useSelector(getSidebarSelector);

  const updateSession = useCallback(async () => {
    const refreshedData = await refreshAccessToken({ token: session?.refreshToken });

    return await update({ ...refreshedData });
  }, [session, update]);

  useEffect(() => {
    if (Date.now() > session?.expires) updateSession();
  }, [session?.expires, updateSession]);

  return <div className={`flex flex-col grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}>{children}</div>;
};

export default AccountContainer;
