'use client';

import { useMemo } from 'react';

import { navBarPropTypes } from '@/lib/types';

import SmallLogo from '@/assets/images/logo-sm.svg';
import Logo from '@/assets/images/logo.svg';
import { LoginButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const NewNavbar = ({ placeholder, cta, path }) => {
  const printLink = useMemo(() => {
    switch (path) {
      case ROUTES.LOGIN:
        return (
          <LoginButton
            text={cta}
            variant="primary"
            className="z-20 whitespace-nowrap rounded-md bg-black px-5 py-2.5 text-xsm font-medium text-white"
          />
        );
      default:
        return (
          <NextLink
            href={path}
            className="z-20 inline-block h-10 whitespace-nowrap rounded-md bg-blue px-5 py-2.5 text-xsm font-medium text-white hover:bg-blue-darker"
          >
            {cta}
          </NextLink>
        );
    }
  }, [cta, path]);

  return (
    <nav className="z-50 flex w-full items-center justify-between border-b border-black/10 bg-white py-6 sm:flex-row 3md:py-5">
      <NextLink href="/">
        <Logo className="hidden h-10 fill-black md:block" />
        <SmallLogo className="fill-black md:hidden" />
      </NextLink>
      <ul className="xl:w-[calc(100% - 668px)] z-50 flex w-full items-center justify-end gap-3 bg-white 3md:w-7/12">
        <li className="hidden whitespace-nowrap text-xsm font-normal text-black md:block">
          <p>{placeholder}</p>
        </li>
        <li>{printLink}</li>
      </ul>
    </nav>
  );
};

NewNavbar.propTypes = navBarPropTypes;

export default NewNavbar;
