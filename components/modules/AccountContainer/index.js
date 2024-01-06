'use client';

import { useSelector } from 'react-redux';

import { AccountContainerPropTyes } from '@/lib/types';

import { getSidebarSelector } from '@/store/selectors';

export default function AccountContainer({ children }) {
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
}

AccountContainer.propTypes = AccountContainerPropTyes;
