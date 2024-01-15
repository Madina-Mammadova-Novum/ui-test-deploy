'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import SidebarSm from './SidebarSm';
import SidebarXl from './SidebarXl';

import { chartererSidebarAdapter, ownerSidebarAdapter } from '@/adapters/sidebar';
import { SCREENS } from '@/lib/constants';
import { handleCollapse } from '@/store/entities/general/slice';
import { getSidebarSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const Sidebar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const xlScreen = useMediaQuery(SCREENS.XL);
  const { collapsed, role } = useSelector(getSidebarSelector);

  const setCollapse = (value) => dispatch(handleCollapse(value));

  useEffect(() => {
    if (!xlScreen && !collapsed) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  }, [pathname, xlScreen]);

  const data = {
    owner: ownerSidebarAdapter({ role }),
    charterer: chartererSidebarAdapter({ role }),
  };

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col transition-all duration-75 items-stretch px-3.5 py-5 gap-2 bg-black text-white z-50 fixed top-0 left-0 h-screen  
    `}
    >
      {collapsed ? (
        <SidebarSm data={data[role]} isResized={collapsed} onResize={() => setCollapse(!collapsed)} />
      ) : (
        <SidebarXl data={data[role]} isResized={collapsed} onResize={() => setCollapse(!collapsed)} />
      )}
    </aside>
  );
};

export default Sidebar;
