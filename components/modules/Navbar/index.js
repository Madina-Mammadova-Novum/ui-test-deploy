'use client';

import { useMemo } from 'react';

import { navBarPropTypes } from '@/lib/types';

import SmallLogo from '@/assets/images/logo-sm.svg';
import Logo from '@/assets/images/logo.svg';
import { LoginButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const Navbar = ({ placeholder, cta, path }) => {
  const printLink = useMemo(() => {
    switch (path) {
      case ROUTES.LOGIN:
        return (
          <LoginButton
            text={cta}
            variant="secondary"
            className="px-5 py-2.5 z-20 text-xsm font-medium whitespace-nowrap bg-black text-white rounded-md"
          />
        );
      default:
        return (
          <NextLink
            href={path}
            className="px-5 py-2.5 z-20 text-xsm font-medium whitespace-nowrap bg-black text-white rounded-md"
          >
            {cta}
          </NextLink>
        );
    }
  }, [cta, path]);

  return (
    <nav className="flex justify-between sm:flex-row flex-grow z-50 h-14 bg-white 3md:bg-transparent">
      <NextLink href="/" className="py-1">
        <Logo className="3md:fill-white fill-black hidden md:block" />
        <SmallLogo className="fill-black md:hidden" />
      </NextLink>
      <ul className="flex w-full 3md:w-7/12 xl:w-[calc(100% - 668px)] items-center gap-5 justify-end bg-white z-50 py-1 ">
        <li className="text-xsm text-black whitespace-nowrap font-normal hidden md:block">
          <p>{placeholder}</p>
        </li>
        <li>{printLink}</li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = navBarPropTypes;

export default Navbar;
