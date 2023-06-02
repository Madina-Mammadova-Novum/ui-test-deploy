'use client';

import { useMemo } from 'react';

import { navBarPropTypes } from '@/lib/types';

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
    <nav className="flex justify-between flex-grow z-50 h-14 bg-white md:bg-transparent">
      <NextLink href="/" className="py-1">
        <Logo className="3md:fill-white fill-black" />
      </NextLink>
      <ul className="flex max-w-[46%] w-[calc(100%-732px)] lg:w-[calc(100%-772px)] items-center gap-5 justify-end bg-white z-50 py-1 ">
        <li className="text-xsm text-black whitespace-nowrap font-normal">
          <p>{placeholder}</p>
        </li>
        <li>{printLink}</li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = navBarPropTypes;

export default Navbar;
