'use client';

import { AccountContainerPropTyes } from '@/lib/types';

import { useExtraData } from '@/utils/hooks';

export default function AccountContainer({ children, role = null }) {
  const { collapsed } = useExtraData({ role });

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
