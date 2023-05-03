'use client';

import { useMemo } from 'react';

import NavTreeSm from './NavTreeSm';
import NavTreeXl from './NavTreeXl';

import { NavTreePropTypes } from '@/lib/types';

import { useSidebarActiveColor } from '@/utils/hooks';

const NavTree = ({ data, variant }) => {
  const { isActive } = useSidebarActiveColor(data.path);

  const printNavTree = useMemo(() => {
    switch (variant) {
      case 'collapsed':
        return <NavTreeSm data={data} active={isActive} />;
      default:
        return <NavTreeXl data={data} active={isActive} />;
    }
  }, [isActive, data, variant]);

  return printNavTree;
};

NavTree.propTypes = NavTreePropTypes;

export default NavTree;
