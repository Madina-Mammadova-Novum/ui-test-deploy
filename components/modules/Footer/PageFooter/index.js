import React from 'react';

import delve from 'dlv';

import { linkAdapter, linkImageAdapter } from '@/adapters/global';
import { ExternalLinkAltIcon } from '@/assets/icons';
import Logo from '@/assets/images/logo.svg';
import OtakoyiLogo from '@/assets/images/otakoyi.svg';
import { HoverableIcon, NextImage, NextLink, Title } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';
import { FooterNavBlock } from '@/units';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const PageFooter = async () => {
  const { navigation: navigationSlug } = await getSingleType('footer', 'en');
  const contactInfo = await getSingleType('contact-information', 'en');
  const { socials } = await getSingleType('social-network', 'en');
  const socialLinks = socials.map((socialLink) => linkImageAdapter(socialLink));
  const { address, phones, emails, link } = contactInfo;
  const mapLink = linkAdapter(link);
  const navigation = await getNavigation(navigationSlug, 'en');
  return (
    <footer className="py-[30px] bg-white">
      <div className="container mx-auto  px-[54px] max-w-[1258px] ">
        <NextLink href="/">
          <Logo className="fill-black" />
        </NextLink>
        <div className="flex mt-[30px] gap-x-10">
          {navigation.length > 0 &&
            navigation.map(({ title, items }) => {
              return <FooterNavBlock items={items} title={title} />;
            })}
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
                    <ExternalLinkAltIcon width={16} height={16} className="fill-black" />
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
                  <li>
                    <NextLink href={`tel:${Phone}`} className="text-xsm">
                      {Phone}
                    </NextLink>
                  </li>
                ))}
              {emails &&
                emails.map(({ Email }) => (
                  <li>
                    <NextLink href={`mailto:${Email}`} className="text-xsm">
                      {Email}
                    </NextLink>
                  </li>
                ))}
            </ul>
            {socials && (
              <div className="flex gap-x-2.5 my-4">
                <div className="flex gap-x-2.5">
                  {socialLinks.map((socialLink) => {
                    return (
                      <NextLink key={makeId()} href={delve(socialLink, 'path')} title={delve(socialLink, 'title')}>
                        <HoverableIcon
                          className="border border-gray-darker rounded-md"
                          icon={
                            <NextImage
                              alt={delve(socialLink, 'title')}
                              src={getStrapiMedia(delve(socialLink, 'image.format.original.url'), '')}
                              height={20}
                              width={20}
                            />
                          }
                        />
                      </NextLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pt-5 text-xsm flex justify-between text-gray border-grey-darker border-t">
          <p>Copyright © 2021 Ship.link. All rights reserved</p>
          <OtakoyiLogo />
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
