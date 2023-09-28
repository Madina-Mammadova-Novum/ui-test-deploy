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
import { useMediaQuery, useRoleNavigation } from '@/utils/hooks';

const Sidebar = ({ containerStyles }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useRoleNavigation();

  const { collapsed } = useSelector(getSidebarSelector);

  const lgScreen = useMediaQuery(SCREENS.LG);
  const mdScreen = useMediaQuery(SCREENS.MD);
  const smScreen = useMediaQuery(SCREENS.SM);

  const isNotXLView = lgScreen || mdScreen || smScreen;

  const url = pathname + searchParams.toString();
  const currentPage = data?.filter((item) => item.path === url)[0];

  const setCollapse = useCallback((value) => dispatch(handleCollapse(value)), [dispatch]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isNotXLView && url !== currentPage?.path && collapsed) setCollapse(true);
    if (isNotXLView && !collapsed) {
      return () => {
        setCollapse(true);
      };
    }
  }, [collapsed, currentPage?.path, setCollapse, url, isNotXLView]);

  return (
    <aside
      className={`${containerStyles} flex flex-col items-stretch px-3.5 py-5 gap-2 bg-black text-white 
      ${collapsed ? 'w-16' : 'w-64'}`}
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
