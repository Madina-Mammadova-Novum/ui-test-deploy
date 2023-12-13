import { ProvidersPropTypes } from '@/lib/types';

import { AuthManager, StoreManager } from '@/common';
import { Hydrate } from '@/elements';
import { PageLoader } from '@/elements/PageLoader';
import { SearchLoader } from '@/elements/Skeletons';

const Providers = ({ children, loader, session }) => {
  const loaderType = {
    component: <SearchLoader />,
    page: <PageLoader text="Uploading..." />,
  };

  return (
    <Hydrate loader={loaderType[loader]} session={session}>
      <AuthManager session={session}>
        <StoreManager>{children}</StoreManager>
      </AuthManager>
    </Hydrate>
  );
};

Providers.propTypes = ProvidersPropTypes;

export default Providers;
