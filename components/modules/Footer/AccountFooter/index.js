import React from 'react';

import { linkImageAdapter } from '@/adapters/global';
import { NextLink } from '@/elements';
import { getSingleType } from '@/services/singleType';
import { SocialNetworks } from '@/units';

const AccountFooter = async () => {
  const { socials } = await getSingleType('social-network', 'en');
  const socialLinks = socials ? socials.map((socialLink) => linkImageAdapter(socialLink)) : [];
  return (
    <footer className="shadow-xmd flex items-center px-5 justify-between py-2.5">
      <SocialNetworks socialLinks={socialLinks} />

      <div className="flex gap-x-5 text-black">
        <NextLink href="#" className="underline">
          Privacy Policy
        </NextLink>
        <NextLink href="#" className="underline">
          Terms of Use
        </NextLink>
        <NextLink href="#" className="underline">
          Cookie Statement
        </NextLink>
      </div>

      <span className="text-xs-sm text-gray">Copyright © 2021 Ship.link. All rights reserved</span>
    </footer>
  );
};

export default AccountFooter;
