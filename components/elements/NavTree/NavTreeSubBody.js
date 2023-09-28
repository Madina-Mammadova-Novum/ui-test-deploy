'use client';

import { NavTreeSubBodyPropTypes } from '@/lib/types';

import { Divider, NextLink } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const NavTreeSubBody = ({ data, collapsed = false }) => {
  const { isActive } = useSidebarActiveColor(data.path);

  const { label, path, title } = data;

  return (
    <NextLink
      href={path}
      // onClick={(e) => e.stopPropagation()}
      aria-hidden
      className={`${
        isActive ? 'bg-blue text-white' : 'hover:bg-blue-dark'
      } flex flex-col text-gray my-2 px-5 py-1.5 rounded-base whitespace-nowrap relative`}
    >
      {label && (
        <span className={`uppercase font-bold ${isActive ? 'text-white' : 'text-gray'} text-xxs`}>{label}</span>
      )}
      <p className="text-xsm text-white font-semibold">{title ?? 'No Data'}</p>

      {!collapsed && (
        <div className="absolute -top-9 -left-3 w-px h-14 rotate-180 bg-blue-dark">
          <Divider className="absolute w-2.5 h-px border-none right-0 !bg-blue-dark" />
        </div>
      )}
    </NextLink>
  );
};

NavTreeSubBody.propTypes = NavTreeSubBodyPropTypes;

export default NavTreeSubBody;
