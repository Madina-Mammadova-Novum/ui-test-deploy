import { NavTreeSubBodyPropTypes } from '@/lib/types';

import { Divider, NextLink } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const NavTreeSubBody = ({ data, collapsed = false }) => {
  const { label, path, title } = data;

  const { isActive } = useSidebarActiveColor(data.path);

  return (
    <li
      aria-hidden
      onClick={(e) => e.stopPropagation()}
      className={`${
        isActive ? 'bg-blue text-white' : 'hover:bg-blue-dark'
      } flex flex-col text-gray my-2 px-5 py-1.5 rounded-base whitespace-nowrap relative`}
    >
      {label && (
        <span className={`uppercase font-bold ${isActive ? 'text-white' : 'text-gray'} text-xxs`}>{label}</span>
      )}
      <NextLink href={path ?? '/'} className="text-xsm text-white font-semibold">
        {title ?? 'No Data'}
      </NextLink>

      {!collapsed && (
        <div className="absolute -top-9 -left-3 w-px h-14 rotate-180 bg-blue-dark">
          <Divider className="absolute w-2.5 h-px border-none right-0 !bg-blue-dark" />
        </div>
      )}
    </li>
  );
};

NavTreeSubBody.propTypes = NavTreeSubBodyPropTypes;

export default NavTreeSubBody;
