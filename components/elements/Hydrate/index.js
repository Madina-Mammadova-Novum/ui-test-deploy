'use client';

import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
export const Hydrate = ({ children, loader = null }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : loader || null;
};
