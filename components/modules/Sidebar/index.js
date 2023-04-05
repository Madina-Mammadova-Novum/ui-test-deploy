'use client';

import { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import SidebarSm from './SidebarSm';
import SidebarXl from './SidebarXl';

const Sidebar = ({ data, containerStyles }) => {
  const [sidebarState, setSidebarState] = useState({
    opened: false,
    resized: false,
  });

  const { opened, resized } = sidebarState;

  const handleChange = (key, val) => {
    setSidebarState((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleResize = useCallback(() => handleChange('resized', !resized), [resized]);

  return (
    <aside
      className={`${containerStyles} flex flex-col items-stretch px-3.5 py-5 gap-2 bg-black text-white 
      ${resized ? 'w-16' : 'w-64'}`}
    >
      {resized ? (
        <SidebarSm data={data} opened={opened} isResized={resized} onChange={handleChange} onResize={handleResize} />
      ) : (
        <SidebarXl data={data} opened={opened} isResized={resized} onChange={handleChange} onResize={handleResize} />
      )}
    </aside>
  );
};

Sidebar.defaultProps = {
  containerStyles: '',
};

Sidebar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  containerStyles: PropTypes.string,
};

export default Sidebar;
