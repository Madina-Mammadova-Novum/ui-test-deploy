import FacebookSVG from '@/assets/images/facebook.svg';
import LinkedinSVG from '@/assets/images/linkedin.svg';
import TwitterSVG from '@/assets/images/twitter.svg';
import { HoverableIcon, NextLink } from '@/elements';

const AccountFooter = () => {
  return (
    <footer className="shadow-xmd flex items-center px-5 justify-between py-2.5">
      <div className="flex gap-x-2.5">
        <HoverableIcon className="border border-gray-darker rounded-md" icon={<LinkedinSVG />} />
        <HoverableIcon className="border border-gray-darker rounded-md" icon={<TwitterSVG />} />
        <HoverableIcon className="border border-gray-darker rounded-md" icon={<FacebookSVG />} />
      </div>

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
