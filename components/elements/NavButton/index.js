'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import { NavButtonPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';

const NavButton = ({ children, path, customStyles, disabled = false, target = null, prefetch = true, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <NextLink
      href={path}
      className={classNames(
        'whitespace-nowrap text-xsm font-semibold',
        isActive ? 'text-blue' : 'text-white',
        disabled && 'pointer-events-none opacity-50',
        customStyles
      )}
      target={target}
      prefetch={prefetch}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

NavButton.propTypes = NavButtonPropTypes;

export default NavButton;
