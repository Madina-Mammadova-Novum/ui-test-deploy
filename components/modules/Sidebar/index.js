'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useSearchParams } from 'next/navigation';
import SidebarSm from './SidebarSm';
import SidebarXl from './SidebarXl';

import { SidebarPropTypes } from '@/lib/types';

import { SCREENS } from '@/lib/constants';
import { handleCollapse } from '@/store/entities/user/slice';
import { getSidebarSelector } from '@/store/selectors';
import { useMediaQuery } from '@/utils/hooks';

const Sidebar = ({ data, containerStyles }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = pathname + searchParams.toString();
  const currentPage = data.filter((item) => item.path === url)[0];

  const { collapsed } = useSelector(getSidebarSelector);

  const lgScreen = useMediaQuery(SCREENS.LG);

  const setCollapse = useCallback((value) => dispatch(handleCollapse(value)), [dispatch]);

  const handleResize = () => setCollapse(!collapsed);

  useEffect(() => {
    if (lgScreen || (lgScreen && url !== currentPage?.path)) setCollapse(true);
    else setCollapse(false);
  }, [currentPage?.path, data, lgScreen, setCollapse, url]);

  return (
    <aside
      className={`${containerStyles} flex flex-col items-stretch px-3.5 py-5 gap-2 bg-black text-white 
      ${collapsed ? 'w-16' : 'w-64'}`}
    >
      {collapsed ? (
        <SidebarSm data={data} isResized={collapsed} onResize={handleResize} />
      ) : (
        <SidebarXl data={data} isResized={collapsed} onResize={handleResize} />
      )}
    </aside>
  );
};

Sidebar.propTypes = SidebarPropTypes;

export default Sidebar;
