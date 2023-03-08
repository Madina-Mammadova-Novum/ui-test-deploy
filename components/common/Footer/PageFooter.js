'use client';

import FacebookSVG from '@/assets/images/facebook.svg';
import LinkedinSVG from '@/assets/images/linkedin.svg';
import TwitterSVG from '@/assets/images/twitter.svg';
import { HoverableIcon, NextLink } from '@/elements';
import { noSSR } from '@/utils/helpers';

const PageFooter = () => {
  return (
    <footer className="fixed right-0 bottom-0 h-10 w-[calc(100vw-256px)] shadow-xmd flex items-center px-5 justify-between">
      <div className="flex gap-x-2.5">
        <HoverableIcon customStyles="border border-gray-darker rounded-md p-1" icon={<LinkedinSVG />} />
        <HoverableIcon customStyles="border border-gray-darker rounded-md p-1" icon={<TwitterSVG />} />
        <HoverableIcon customStyles="border border-gray-darker rounded-md p-1" icon={<FacebookSVG />} />
      </div>

      <div className="flex gap-x-5">
        <NextLink href="#">Privacy Policy</NextLink>
        <NextLink href="#">Terms of Use</NextLink>
        <NextLink href="#">Cookie Statement</NextLink>
      </div>

      <div className="text-[12px] text-gray">Copyright © 2021 Ship.link. All rights reserved</div>
    </footer>
  );
};

export default noSSR(PageFooter);
