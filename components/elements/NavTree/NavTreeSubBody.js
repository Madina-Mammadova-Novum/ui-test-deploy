'use client';

import { useRouter } from 'next/navigation';

import { NavTreeSubBodyPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const NavTreeSubBody = ({ data, onClick, collapsed = false }) => {
  const router = useRouter();
  const { isActive } = useSidebarActiveColor(data.path);

  const { label, path, title } = data;

  const handlePrefetch = () => router.prefetch(path);

  const handleRedirect = (e) => {
    e.stopPropagation();

    if (collapsed) {
      router.push(path);
      onClick();
    }

    router.push(path);
  };

  return (
    <li
      aria-hidden
      onMouseEnter={handlePrefetch}
      onClick={handleRedirect}
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
    </li>
  );
};

NavTreeSubBody.propTypes = NavTreeSubBodyPropTypes;

export default NavTreeSubBody;
