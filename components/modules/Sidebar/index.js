'use client';

import { useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import SidebarSm from './SidebarSm';
import SidebarXl from './SidebarXl';

const Sidebar = ({ data, containerStyles }) => {
  const [sidebarState, setSidebarState] = useState({
    focus: false,
    opened: false,
    resized: false,
    active: null,
    searchValue: '',
  });

  const { opened, active, resized } = sidebarState;

  const handleChange = (key, val) => {
    setSidebarState((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleResize = useCallback(() => handleChange('resized', !resized), [resized]);

  const printSideBar = useMemo(() => {
    switch (resized) {
      case true:
        return (
          <SidebarSm
            data={data}
            active={active}
            opened={opened}
            isResized={resized}
            onChange={handleChange}
            onResize={handleResize}
          />
        );
      default:
        return (
          <SidebarXl
            data={data}
            active={active}
            opened={opened}
            isResized={resized}
            onChange={handleChange}
            onResize={handleResize}
          />
        );
    }
  }, [resized, active, opened, data, handleResize]);

  return (
    <aside
      className={`flex flex-col items-stretch px-3.5 py-5 gap-2 bg-black text-white ${containerStyles} ${
        resized ? 'w-16' : 'w-64'
      }`}
    >
      {printSideBar}
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
