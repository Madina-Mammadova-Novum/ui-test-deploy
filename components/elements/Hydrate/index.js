'use client';

import { useEffect, useState } from 'react';

import { PageLoader } from '../PageLoader';

const Hydrate = ({ children, loader = null }) => {
  const loaderType = {
    page: <PageLoader text="uploading..." />,
  };

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : loaderType[loader];
};

export default Hydrate;
