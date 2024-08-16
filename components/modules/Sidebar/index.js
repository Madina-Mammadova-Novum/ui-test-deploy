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
      className={`fixed left-0 top-0 z-50 h-screen ${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col items-stretch gap-2 bg-black px-3.5 py-5 text-white transition-all duration-75`}
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
