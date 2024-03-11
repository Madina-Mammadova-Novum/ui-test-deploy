'use client';

import { useSelector } from 'react-redux';

import { getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
  const { collapsed } = useSelector(getSidebarSelector);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen grow ${collapsed ? 'ml-16' : 'ml-16 lg:ml-64'}`}
    >
      {children}
    </div>
  );
}
