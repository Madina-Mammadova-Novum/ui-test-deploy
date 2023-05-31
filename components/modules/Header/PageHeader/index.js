import React from 'react';

import delve from 'dlv';

import Logo from '@/assets/images/logo.svg';
import { LinkAsButton, LoginButton, NavButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';

const PageHeader = async () => {
  const headerData = await getSingleType('header', 'en');
  const navigationSlug = delve(headerData, 'data.navigation');
  const buttons = delve(headerData, 'data.buttons');
  const navigationData = await getNavigation(navigationSlug, 'en');
  const navigation = delve(navigationData, 'data');
  return (
    <header className="absolute w-full z-10">
      <div className="container mx-auto px-6 3md:px-14 max-w-[1258px] mx-auto">
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
                      <NavButton path={path}>{title}</NavButton>
                    </li>
                  );
                })}
              </ul>
            )}
            {buttons.length > 0 && (
              <ul className="flex gap-x-2.5">
                {buttons.map(({ path, label, linkOptions }) => {
                  if (path === ROUTES.LOGIN)
                    return (
                      <li key={path}>
                        <LoginButton className="max-w-[115px] mx-auto" text={label} variant={linkOptions?.style} />
                      </li>
                    );
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
