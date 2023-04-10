import React from 'react';

import Logo from '@/assets/images/logo.svg';
import { LinkAsButton, NavButton, NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';

const PageHeader = async () => {
  const { navigation: navigationSlug, buttons } = await getSingleType('header', 'en');
  const navigation = await getNavigation(navigationSlug, 'en');
  return (
    <header className="absolute w-full z-10">
      <div className="container mx-auto  px-[54px] max-w-[1258px] ">
        <div className="py-2.5 flex align-center justify-between border-white/10 border-b">
          <NextLink href="/">
            <Logo className="fill-white" />
          </NextLink>
          <nav className="flex items-center gap-x-10">
            {navigation.length > 0 && (
              <ul className="flex gap-x-5 items-center">
                {navigation.map(({ path, title }) => {
                  return (
                    <li key={path}>
                      <NavButton href={path}>{title}</NavButton>
                    </li>
                  );
                })}
              </ul>
            )}
            {buttons.length > 0 && (
              <ul className="flex gap-x-2.5">
                {buttons.map(({ path, label, linkOptions }) => {
                  return (
                    <li key={path}>
                      <LinkAsButton
                        href={path}
                        target={linkOptions ? linkOptions.target : null}
                        buttonProps={{
                          variant: linkOptions ? linkOptions.style : 'tertiary',
                          size: 'large',
                        }}
                        customStyles="max-w-[115px] mx-auto"
                      >
                        {label}
                      </LinkAsButton>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
