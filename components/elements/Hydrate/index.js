'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { PageLoader } from '../PageLoader';

const Hydrate = ({ children, loader = null }) => {
  const loaderType = {
    page: <PageLoader text="Uploading" />,
  };

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? children : loaderType[loader] || null;
};

Hydrate.propTypes = {
  loader: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

export default Hydrate;
