'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { AuthManager, ExtraDataManager, StoreManager } from '@/common';
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
      <AuthManager>
        <StoreManager loader={loader}>
          <ExtraDataManager>{children}</ExtraDataManager>
        </StoreManager>
      </AuthManager>
    </Hydrate>
  );
};

Providers.propTypes = ProvidersPropTypes;

export default Providers;
