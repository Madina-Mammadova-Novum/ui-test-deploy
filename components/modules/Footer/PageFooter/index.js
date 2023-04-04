'use client';

import { ExternalLinkAltIcon } from '@/assets/icons';
import FacebookSVG from '@/assets/images/facebook.svg';
import LinkedinSVG from '@/assets/images/linkedin.svg';
import Logo from '@/assets/images/logo.svg';
import OtakoyiLogo from '@/assets/images/otakoyi.svg';
import TwitterSVG from '@/assets/images/twitter.svg';
import { HoverableIcon, LinkAsButton, NextLink, Title } from '@/elements';

const PageFooter = () => {
  return (
    <footer className="py-[30px]">
      <div className="container mx-auto  px-[54px] max-w-[1258px] ">
        <NextLink href="/">
          <Logo className="fill-black" />
        </NextLink>
        <div className="flex mt-[30px] gap-x-10">
          <div className="w-40">
            <Title level="5" className="title-main text-gray mb-4">
              Company
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <NextLink href="#" className="text-xsm">
                  About Us
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  Contact Us
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  FAQ
                </NextLink>
              </li>
            </ul>
          </div>
          <div className="w-40">
            <Title level="5" className="title-main text-gray mb-4">
              LEGAL
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <NextLink href="#" className="text-xsm">
                  Privacy Policy
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  Terms of Use
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  Cookie Statement
                </NextLink>
              </li>
            </ul>
          </div>
          <div className="w-40">
            <Title level="5" className="title-main text-gray mb-4">
              Address
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <p className="text-xsm">1981 Broadway, New York, NY 10023, United States</p>
              </li>
              <li>
                {/* todo: create small-btn element */}
                <LinkAsButton
                  href="/"
                  buttonProps={{
                    variant: 'tertiary',
                    size: 'small',
                  }}
                  customStyles="!py-0 !px-0 font-medium h-auto w-[fit-content] gap-x-1"
                >
                  View on Google Maps
                  <ExternalLinkAltIcon />
                </LinkAsButton>
              </li>
            </ul>
          </div>
          <div className="text-black ml-auto w-40">
            <Title level="5" className="title-main text-gray mb-4">
              contacts
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <NextLink href="#" className="text-xsm">
                  + 1 212-444-3400
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  + 1 212-444-3400
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="text-xsm">
                  hello@ship.link.com
                </NextLink>
              </li>
            </ul>
            <div className="flex gap-x-2.5 my-4">
              <NextLink href="/">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<LinkedinSVG />} />
              </NextLink>
              <NextLink href="/">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<TwitterSVG />} />
              </NextLink>
              <NextLink href="/">
                <HoverableIcon className="border border-gray-darker rounded-md" icon={<FacebookSVG />} />
              </NextLink>
            </div>
          </div>
        </div>
        <div className="pt-4 text-xsm flex justify-between text-gray border-grey-darker border-t">
          <p>Copyright © 2021 Ship.link. All rights reserved</p>
          <OtakoyiLogo />
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
