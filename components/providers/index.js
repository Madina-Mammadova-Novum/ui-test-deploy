'use client';

import { AuthManager, ClientSidePackages, ExtraDataManager, StoreManager, TailwindIndicator } from '@/common';

const Providers = ({ children }) => {
  return (
    <AuthManager>
      <StoreManager>
        <ExtraDataManager>{children}</ExtraDataManager>
      </StoreManager>
      <ClientSidePackages />
      <TailwindIndicator />
    </AuthManager>
  );
};

export default Providers;
