'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { AuthManager, ClientSidePackages, ExtraDataManager, StoreManager, TailwindIndicator } from '@/common';
import { Hydrate } from '@/elements';
import { PageLoader } from '@/elements/PageLoader';
import { SearchLoader } from '@/elements/Skeletons';

const Providers = ({ children, loader }) => {
  const loaderType = {
    component: <SearchLoader />,
    page: <PageLoader text="Uploading..." />,
  };

  return (
    <Hydrate loader={loaderType[loader]}>
      <StoreManager loader={loader}>
        <AuthManager>
          <ExtraDataManager>{children}</ExtraDataManager>
          <ClientSidePackages />
          <TailwindIndicator />
        </AuthManager>
      </StoreManager>
    </Hydrate>
  );
};

Providers.propTypes = ProvidersPropTypes;

export default Providers;
