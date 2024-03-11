import { ProvidersPropTypes } from '@/lib/types';

import { StoreManager } from '@/common';
import Hydrate from '@/elements/Hydrate';

export default function Providers({ children }) {
  return (
    <Hydrate loader="page">
      <StoreManager>{children}</StoreManager>
    </Hydrate>
  );
}

Providers.propTypes = ProvidersPropTypes;
