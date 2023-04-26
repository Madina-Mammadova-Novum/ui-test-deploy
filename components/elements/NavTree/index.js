'use client';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import NavTreeSm from './NavTreeSm';
import NavTreeXl from './NavTreeXl';

import { useSidebarActiveColor } from '@/utils/hooks';

const NavTree = ({ data, variant, opened, onChange }) => {
  const { isActive } = useSidebarActiveColor(data.path);

  const printNavTree = useMemo(() => {
    switch (variant) {
      case 'collapsed':
        return <NavTreeSm data={data} active={isActive} onChange={onChange} />;
      default:
        return <NavTreeXl opened={opened} data={data} active={isActive} onChange={onChange} />;
    }
  }, [isActive, data, onChange, opened, variant]);

  return printNavTree;
};

NavTree.propTypes = {
  opened: PropTypes.bool,
  onChange: PropTypes.func,
  variant: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};
export default NavTree;
