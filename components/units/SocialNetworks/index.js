import React from 'react';

import delve from 'dlv';
import PropTypes from "prop-types";

import { linkImagePropTypes } from "@/utils/types";

import { HoverableIcon, NextImage, NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const SocialNetworks = ({ socialLinks }) => {
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
  );
};

SocialNetworks.propTypes = {
  socialLinks: PropTypes.arrayOf(linkImagePropTypes)
};

export default SocialNetworks;
