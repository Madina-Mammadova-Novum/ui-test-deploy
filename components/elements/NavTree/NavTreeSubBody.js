'use client';

import { useRouter } from 'next/navigation';

import { NavTreeSubBodyPropTypes } from '@/lib/types';

import { Divider } from '@/elements';
import { useSidebarActiveColor } from '@/utils/hooks';

const NavTreeSubBody = ({ data, onClick, collapsed = false, isSecondToLast = false }) => {
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
    <>
      <li
        aria-hidden
        onMouseEnter={handlePrefetch}
        onClick={handleRedirect}
        className={`${
          isActive ? 'bg-blue text-white' : 'hover:bg-blue-dark'
        } relative my-2 flex flex-col whitespace-nowrap rounded-base px-5 py-1.5 text-gray`}
      >
        {label && (
          <span className={`font-bold uppercase ${isActive ? 'text-white' : 'text-gray'} text-xxs`}>{label}</span>
        )}
        <p className="text-xsm font-semibold text-white">{title ?? 'No Data'}</p>

        {!collapsed && (
          <div className="absolute -left-3 -top-9 h-14 w-px rotate-180 bg-blue-dark">
            <Divider className="absolute right-0 h-px w-2.5 border-none !bg-blue-dark" />
          </div>
        )}
      </li>
      {isSecondToLast && <Divider className="my-2" />}
    </>
  );
};

NavTreeSubBody.propTypes = NavTreeSubBodyPropTypes;

export default NavTreeSubBody;
