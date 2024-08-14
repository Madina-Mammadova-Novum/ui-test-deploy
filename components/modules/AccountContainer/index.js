'use client';

import { useSelector } from 'react-redux';

import { getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const { collapsed } = useSelector(getSidebarSelector);

  return (
    <div
      className={`max-w-screen flex min-h-screen grow flex-col bg-gray-light ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}
