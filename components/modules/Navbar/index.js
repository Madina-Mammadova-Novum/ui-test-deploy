'use client';

// todo: that must rendered on server side

import { useMemo } from 'react';

import { navBarPropTypes } from '@/lib/types';

import { Logo } from '@/assets/icons';
import { NextLink } from '@/elements';
import { SIZES } from '@/lib';
import { SCREENS } from '@/lib/constants';
import { useMediaQuery } from '@/utils/hooks';

const Navbar = ({ placeholder, cta, path, contrasted }) => {
  const lgScreen = useMediaQuery(SCREENS.lg);
  const logoColor = useMemo(() => (!lgScreen ? contrasted : !contrasted), [contrasted, lgScreen]);

  return (
    <nav className="flex w-full justify-between items-center z-50 bg-white 3sm:bg-transparent">
      <NextLink href="/">
        <Logo variant="xl" width={SIZES.LOGO.width} height={SIZES.LOGO.height} contrasted={logoColor} />
      </NextLink>
      <ul className="flex h-full items-center gap-5 bg-white w-full 3sm:w-1/2 justify-end z-50">
        <li className="text-xsm text-black font-normal">
          <p>{placeholder}</p>
        </li>
        <li>
          <NextLink
            href={path}
            className="px-5 py-2.5 z-20 text-xsm font-medium whitespace-nowrap bg-black text-white rounded-md"
          >
            {cta}
          </NextLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  contrasted: false,
};

Navbar.propTypes = navBarPropTypes;

export default Navbar;
