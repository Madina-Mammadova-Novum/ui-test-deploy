'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import SidebarSm from './SidebarSm';
import SidebarXl from './SidebarXl';

import { SidebarPropTypes } from '@/lib/types';

import { SCREENS } from '@/lib/constants';
import { handleCollapse } from '@/store/entities/general/slice';
import { getSidebarSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const xlScreen = useMediaQuery(SCREENS.XL);
  const { collapsed } = useSelector(getSidebarSelector);

  const setCollapse = (value) => dispatch(handleCollapse(value));

  useEffect(() => {
    if (!xlScreen && !collapsed) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  }, [pathname, xlScreen]);

  return (
    <aside
      className={`z-50 fixed top-0 left-0 h-screen ${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col transition-all duration-75 items-stretch px-3.5 py-5 gap-2 bg-black text-white 
    `}
    >
      {collapsed ? (
        <SidebarSm data={data} isResized={collapsed} onResize={() => setCollapse(!collapsed)} />
      ) : (
        <SidebarXl data={data} isResized={collapsed} onResize={() => setCollapse(!collapsed)} />
      )}
    </aside>
  );
};

Sidebar.propTypes = SidebarPropTypes;

export default Sidebar;
