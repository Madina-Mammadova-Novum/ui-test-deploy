import React from 'react';

import { Copyright } from '@/elements';
import { LegalNavigation, SocialNetworks } from '@/units';

const AccountFooter = async () => {
  return (
    <footer className="shadow-xmd flex items-center px-5 justify-between py-2 text-xs-sm">
      <SocialNetworks />
      <LegalNavigation />
      <Copyright />
    </footer>
  );
};

export default AccountFooter;
