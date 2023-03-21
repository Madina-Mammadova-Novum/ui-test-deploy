import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

import { NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';

const CtaImages = ({ items }) => {
  if (!items) return null;

  return (
    <section className="mb-28 sm:mb-44 2lg:mb-64">
      <div className="flex flex-col items-center gap-y-3 lg:flex-row lg:gap-x-5">
        {items.map(({ id, title, coverImage, button }) => {
          return (
            <div
              key={id}
              className="relative rounded-[10px] sm:rounded-[20px] sm:w-[692px] sm:h-[690px] lg:w-full lg:h-full lg:max-w-[848px] lg:max-h-[832px] overflow-hidden"
            >
              <div>
                <Image
                  width={848}
                  height={832}
                  alt={delve(coverImage, 'alternativeText')}
                  src={getStrapiMedia(delve(coverImage, 'format.original.url'), '?format=webp')}
                  className="h-full w-full object-cover object-center"
                  quality={75}
                />
              </div>
              <h4 className="absolute top-5 left-5 text-white text-base font-bold sm:top-7 sm:left-7 sm:text-4xl 2lg:top-10 2lg:left-10 2lg:text-5xl">
                {title}
              </h4>
              <NextLink
                label={button.label}
                href={button.path}
                type={button.linkOptions.style}
                customStyles="!absolute bottom-5 left-5 sm:top-[102px] sm:left-7 2lg:left-10 2lg:top-[130px]"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

CtaImages.propTypes = {
  items: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    coverImage: PropTypes.shape(mediaPropTypes),
    button: linkPropTypes,
  }).isRequired,
};

export default CtaImages;
