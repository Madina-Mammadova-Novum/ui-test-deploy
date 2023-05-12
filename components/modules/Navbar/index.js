'use client';

import { navBarPropTypes } from '@/lib/types';

import Logo from '@/assets/images/logo.svg';
import { NextLink } from '@/elements';

const Navbar = ({ placeholder, cta, path }) => {
  return (
    <nav className="grid grid-cols-2 gap-20 flex-grow z-50 h-14 bg-white 3md:bg-transparent">
      <NextLink href="/">
        <Logo className="3md:fill-white fill-black" />
      </NextLink>
      <ul className="flex h-full items-center gap-5 w-full justify-end bg-white z-50">
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

Navbar.propTypes = navBarPropTypes;

export default Navbar;
