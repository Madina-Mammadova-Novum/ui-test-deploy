'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.getElementById('portal')) : null;
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Portal;
