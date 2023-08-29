'use client';

import { useSelector } from 'react-redux';

import { getSidebarSelector } from '@/store/selectors';

const AccountContainer = ({ children }) => {
  const { collapsed } = useSelector(getSidebarSelector);

  return (
    <div
      className={`flex flex-col bg-gray-light min-h-screen max-w-screen-2xl grow ${
        collapsed ? 'ml-16' : 'ml-16 lg:ml-64'
      }`}
    >
      {children}
    </div>
  );
};

export default AccountContainer;
