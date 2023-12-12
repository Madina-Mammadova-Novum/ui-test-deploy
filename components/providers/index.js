'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { AuthManager, ClientSidePackages, StoreManager, TailwindIndicator } from '@/common';
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
        <StoreManager>{children}</StoreManager>
      </AuthManager>
      <ClientSidePackages />
      <TailwindIndicator />
    </Hydrate>
  );
};

Providers.propTypes = ProvidersPropTypes;

export default Providers;
