'use client';

import classnames from 'classnames';
import { usePathname } from 'next/navigation';

import { NavButtonPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';

const NavButton = ({ children, path, customStyles, disabled = false, target = null, ...rest }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <NextLink
      href={path}
      className={classnames(
        'text-xsm whitespace-nowrap font-semibold',
        isActive ? 'text-blue' : 'text-white',
        disabled && 'opacity-50 pointer-events-none',
        customStyles
      )}
      target={target}
      {...rest}
    >
      {children}
    </NextLink>
  );
};

NavButton.propTypes = NavButtonPropTypes;

export default NavButton;
