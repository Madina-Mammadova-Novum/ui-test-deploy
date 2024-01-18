'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';
import { getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const dispatch = useDispatch();
  const { collapsed } = useSelector(getSidebarSelector);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPorts());
  }, []);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}
