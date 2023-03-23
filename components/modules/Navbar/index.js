'use client';

import { navBarPropTypes } from '@/lib/types';

import Logo from '@/assets/images/logo.svg';
import { NextLink } from '@/elements';

const Navbar = ({ placeholder, cta, path }) => {
  return (
    <nav className="flex w-full justify-between items-center z-50 bg-white 3sm:bg-transparent">
      <NextLink href="/">
        <Logo className="3sm:fill-white fill-black" />
      </NextLink>
      <ul className="flex h-full items-center gap-5 w-full 3sm:w-1/2 justify-end z-50">
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
