'use client';

import { useEffect, useState } from 'react';

import { HydratePropTypes } from '@/lib/types';

import { errorToast } from '@/utils/hooks';

const Hydrate = ({ children, session, loader = null }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (hydrated && session?.error) {
    return (
      <>
        {children}
        {errorToast('Bad request', session.error)}
      </>
    );
  }

  return hydrated ? children : loader;
};

Hydrate.propTypes = HydratePropTypes;

export default Hydrate;
