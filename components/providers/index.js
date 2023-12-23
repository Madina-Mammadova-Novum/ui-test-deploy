'use client';

import { ProvidersPropTypes } from '@/lib/types';

import { StoreManager } from '@/common';
import { Hydrate } from '@/elements';
import { PageLoader } from '@/elements/PageLoader';
import { SearchLoader } from '@/elements/Skeletons';

export default function Providers({ children, loader = null }) {
  const loaderType = {
    page: <PageLoader text="Updating..." />,
    search: <SearchLoader />,
  };

  return (
    <Hydrate loader={loaderType[loader]}>
      <StoreManager>{children}</StoreManager>
    </Hydrate>
  );
}

Providers.propTypes = ProvidersPropTypes;
