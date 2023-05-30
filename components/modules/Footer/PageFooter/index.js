import React from 'react';

import delve from 'dlv';

import { linkAdapter } from '@/adapters/global';
import ExternalLinkAltSVG from '@/assets/images/externalLinkAlt.svg';
import Logo from '@/assets/images/logo.svg';
import OtakoyiLogo from '@/assets/images/otakoyi.svg';
import { Copyright, NextLink, Title } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';
import { FooterNavBlock, SocialNetworks } from '@/units';
import { makeId } from '@/utils/helpers';

const PageFooter = async () => {
  const footerData = await getSingleType('footer', 'en');
  const navigationSlug = delve(footerData, 'data.navigation');
  const navigationData = await getNavigation(navigationSlug, 'en');
  const navigation = delve(navigationData, 'data');

  const contactInfoData = await getSingleType('contact-information', 'en');
  const address = delve(contactInfoData, 'data.address');
  const phones = delve(contactInfoData, 'data.phones');
  const emails = delve(contactInfoData, 'data.emails');
  const link = delve(contactInfoData, 'data.link');
  const mapLink = linkAdapter(link);

  const legalNavigationData = await getNavigation('legal-navigation', 'en');
  const legalNavigation = delve(legalNavigationData, 'data');

  return (
    <footer className="py-[30px] bg-white">
      <div className="container mx-auto  px-[54px] max-w-[1258px] ">
        <NextLink href="/">
          <Logo className="fill-black" />
        </NextLink>
        <div className="flex mt-[30px] gap-x-10">
          {navigation.length > 0 &&
            navigation.map(({ title, items }) => {
              return <FooterNavBlock key={makeId()} items={items} title={title} />;
            })}
          {legalNavigation.length > 0 && <FooterNavBlock items={legalNavigation} title="Legal" />}
          <div className="w-[166px]">
            <Title level={5} className="title-main text-gray mb-4">
              Address
            </Title>
            <ul className="space-y-2 text-black">
              <li>
                <p className="text-xsm">{address}</p>
              </li>
              <li>
                {mapLink && (
                  <NextLink
                    label={mapLink.label}
                    href={mapLink.path}
                    target={mapLink.target}
                    className="font-medium text-xsm flex gap-x-1 whitespace-nowrap"
                  >
                    {mapLink.label}
                    <ExternalLinkAltSVG viewBox="0 0 24 24" className="fill-black w-4 h-4" />
                  </NextLink>
                )}
              </li>
            </ul>
          </div>
          <div className="ml-auto w-40">
            <Title level={5} className="title-main text-gray mb-4">
              contacts
            </Title>
            <ul className="space-y-2 text-black">
              {phones &&
                phones.map(({ Phone }) => (
                  <li key={makeId()}>
                    <NextLink href={`tel:${Phone}`} className="text-xsm">
                      {Phone}
                    </NextLink>
                  </li>
                ))}
              {emails &&
                emails.map(({ Email }) => (
                  <li key={makeId()}>
                    <NextLink href={`mailto:${Email}`} className="text-xsm">
                      {Email}
                    </NextLink>
                  </li>
                ))}
            </ul>
            <div className="flex gap-x-2.5 my-4">
              <SocialNetworks />
            </div>
          </div>
        </div>
        <div className="pt-5 text-xsm flex justify-between border-grey-darker border-t">
          <Copyright />
          <div className="flex items-center gap-x-2">
            <p className="text-gray text-xsm">Development by</p>
            <NextLink href="https://otakoyi.software/" target="_blank">
              <OtakoyiLogo />
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
