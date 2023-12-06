'use client';

import { useEffect, useState } from 'react';

const Hydrate = ({ children, loader = null }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : loader;
};

export default Hydrate;
