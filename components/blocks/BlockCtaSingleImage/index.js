import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

import { NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';

const BlockCtaSingleImage = ({ title, shortDescription, coverImage, button }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      <div className="grid grid-cols-1 gap-y-10 sm:gap-y-[82px] md:grid-cols-2 md:gap-x-5">
        <div className="relative col-span-1">
          {title && (
            <h1 className="text-black text-3xl font-bold mb-4 sm:text-6xl sm:mb-10 2lg:mb-16 2lg:text-7xl">{title}</h1>
          )}
          <div className="sm:max-w-[340px] sm:ml-auto md:max-w-[413px] 2lg:max-w-[556px]">
            {shortDescription && <p className="text-gray text-sm mb-6 sm:text-base 2lg:text-lg">{shortDescription}</p>}
            {button && (
              <NextLink
                label={button.label}
                href={button.path}
                type={button.linkOptions.style}
                customStyles="max-w-[254px] whitespace-nowrap"
              >
                {' '}
                {button.label}
              </NextLink>
            )}
          </div>
        </div>
        <div className="col-span-1">
          {coverImage && (
            <div className="rounded-[10px] overflow-hidden h-[360px] md:min-h-[896px] md:w-full">
              <Image
                width={692}
                height={658}
                alt={delve(coverImage, 'alternativeText')}
                src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
                className="h-full w-full object-cover object-center"
                quality={75}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

BlockCtaSingleImage.defaultProps = {
  title: '',
  shortDescription: '',
  button: {},
  coverImage: {},
};

BlockCtaSingleImage.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  button: linkPropTypes,
  coverImage: mediaPropTypes,
};

export default BlockCtaSingleImage;
