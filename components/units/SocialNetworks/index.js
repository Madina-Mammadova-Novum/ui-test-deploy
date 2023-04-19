'use client';

import React, { useEffect, useState } from 'react';

import delve from 'dlv';

import { linkImageAdapter } from '@/adapters/global';
import { HoverableIcon, NextImage, NextLink } from '@/elements';
import { getSingleType } from '@/services/singleType';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const SocialNetworks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const fetchData = async () => {
    const { socials } = await getSingleType('social-network', 'en');
    const socialLinksArray = socials ? socials.map((socialLink) => linkImageAdapter(socialLink)) : [];
    setSocialLinks(socialLinksArray);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!socialLinks.length) return null;
  return (
    <div className="flex gap-x-2.5">
      {socialLinks.map((socialLink) => {
        return (
          <NextLink key={makeId()} href={delve(socialLink, 'path')} title={delve(socialLink, 'title')}>
            <HoverableIcon
              className="border border-gray-darker rounded-md"
              icon={
                <NextImage
                  alt={delve(socialLink, 'title')}
                  src={getStrapiMedia(delve(socialLink, 'coverImage.format.original.url'), '')}
                  height={20}
                  width={20}
                />
              }
            />
          </NextLink>
        );
      })}
    </div>
  );
};

export default SocialNetworks;
