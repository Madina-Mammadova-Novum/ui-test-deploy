'use client';

import { AuthManager, ClientSidePackages, ExtraDataManager, StoreManager, TailwindIndicator } from '@/common';

const Providers = ({ children }) => {
  return (
    <StoreManager>
      <AuthManager>
        <ExtraDataManager>{children}</ExtraDataManager>
        <ClientSidePackages />
        <TailwindIndicator />
      </AuthManager>
    </StoreManager>
  );
};

export default Providers;
