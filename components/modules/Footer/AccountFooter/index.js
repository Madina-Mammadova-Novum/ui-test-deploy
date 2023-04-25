import React from 'react';

import { Copyright, NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { SocialNetworks } from '@/units';

const AccountFooter = async () => {
  const legalNavigation = await getNavigation('legal-navigation', 'en');

  const printLink = ({ path, title }) => (
    <NextLink key={path} href={path} className="underline">
      {title}
    </NextLink>
  );

  return (
    <footer className="shadow-xmd flex items-center px-5 justify-between py-2 text-[12px]">
      <SocialNetworks />
      {legalNavigation.length > 0 && <div className="flex gap-x-5 text-black"> {legalNavigation.map(printLink)}</div>}
      <Copyright />
    </footer>
  );
};

export default AccountFooter;
