import React from 'react';

import { Copyright } from '@/elements';
import { LegalNavigation, SocialNetworks } from '@/units';

const AccountFooter = async () => {
  return (
    <footer className="shadow-xmd items-center px-5 justify-between mt-12 py-2 text-xs-sm flex 3md:flex-nowrap flex-wrap gap-2.5 ">
      <SocialNetworks />
      <LegalNavigation />
      <div className="w-full text-center 3md:w-auto">
        <Copyright />
      </div>
    </footer>
  );
};

export default AccountFooter;
