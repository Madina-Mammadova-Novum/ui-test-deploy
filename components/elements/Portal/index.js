'use client';

import { createPortal } from 'react-dom';

import { useMounted } from '@/utils/hooks';

const Portal = ({ children }) => {
  const mounted = useMounted();

  return mounted ? createPortal(children, document.getElementById('portal')) : null;
};

export default Portal;
