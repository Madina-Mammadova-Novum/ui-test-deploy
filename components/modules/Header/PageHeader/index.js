import React from 'react';

import Logo from '@/assets/images/logo.svg';
import { LinkAsButton, NavButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const PageHeader = () => {
  return (
    <header className="absolute w-full z-10">
      <div className="container mx-auto  px-[54px] max-w-[1258px] ">
        <div className="py-2.5 flex align-center justify-between border-white/10 border-b">
          <NextLink href="/">
            <Logo className="fill-white" />
          </NextLink>
          <nav className="flex items-center gap-x-10">
            <ul className="flex gap-x-5 items-center">
              <li>
                <NavButton href="/" isActive>
                  Home
                </NavButton>
              </li>
              <li>
                <NavButton href="/"> About Us</NavButton>
              </li>
              <li>
                <NavButton href="/"> Contact us</NavButton>
              </li>
            </ul>
            <ul className="flex gap-x-2.5">
              <li>
                <LinkAsButton
                  href={ROUTES.LOGIN}
                  buttonProps={{
                    variant: 'tertiary',
                    size: 'large',
                  }}
                  customStyles="max-w-[115px] mx-auto"
                >
                  Log in
                </LinkAsButton>
              </li>
              <li>
                <LinkAsButton
                  href={ROUTES.SIGNUP}
                  buttonProps={{
                    variant: 'primary',
                    size: 'large',
                  }}
                  customStyles="max-w-[115px] mx-auto"
                >
                  Registration
                </LinkAsButton>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
