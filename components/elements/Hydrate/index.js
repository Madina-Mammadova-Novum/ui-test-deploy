'use client';

import { useEffect, useState } from 'react';

const Hydrate = ({ children }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : null;
};

export default Hydrate;
