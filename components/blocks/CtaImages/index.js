import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/lib/types';

import { NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const CtaImages = ({ items }) => {
  if (!items) return null;

  return (
    <section id="cta-images" className="bg-gray-medium py-16 md:py-20 3md:py-24">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-8 px-4 md:px-8 3md:gap-12 xl:px-0">
        {items.map(({ title, coverImage, button }) => {
          return (
            <div key={makeId()} className="flex flex-col items-center gap-8 3md:flex-row 3md:gap-12 xl:gap-16">
              <div className="w-4/5 md:w-1/2 3md:w-2/5">
                <Image
                  width={600}
                  height={450}
                  alt={delve(coverImage, 'alternativeText') || 'Feature image'}
                  src={getStrapiMedia(delve(coverImage, 'data.attributes.url'), '')}
                  className="h-full w-full object-cover transition-transform duration-300 3md:hover:scale-105"
                  quality={85}
                />
              </div>
              <div className="flex flex-col 3md:w-3/5 xl:w-1/2">
                <h2 className="text-center text-xl font-bold text-black md:text-2xl 3md:text-2.5xl">{title}</h2>
                {button && (
                  <div className="flex">
                    <NextLink
                      label={button.label}
                      href={button.path}
                      type={button.linkOptions.style}
                      customStyles="inline-flex items-center justify-center"
                    />
                  </div>
                )}
              </div>
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
