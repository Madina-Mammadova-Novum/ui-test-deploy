import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { BlockShortDescription, BlockTitle, NextLink } from 'components/elements';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

import { getStrapiMedia } from '@/utils';

const BlockCtaFeatured = ({ title, shortDescription, button, images }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6">
        <div className="col-span-1">
          {title && <BlockTitle title={title} customStyles="lg:text-4xl 2lg:text-5xl" />}
          {shortDescription && (
            <BlockShortDescription
              shortDescription={shortDescription}
              customStyles="mb-6 text-sm sm:text-base md:!text-lg md:!max-w-[409px]"
            />
          )}
          {button && (
            <NextLink
              label={button.label}
              href={button.path}
              type={button.linkOptions.style}
              customStyles="max-w-[207px] whitespace-nowrap"
            />
          )}
        </div>
        {images && (
          <div className="col-span-1 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-3 md:col-span-2 md:gap-x-6">
            {images.map((image) => {
              return (
                <div className="col-span-1 max-h-[343px] rounded overflow-hidden sm:rounded-[10px] sm:max-h-[384px] md:max-h-[640px]">
                  <Image
                    width={558}
                    height={640}
                    alt={delve(image, 'alternativeText')}
                    src={getStrapiMedia(delve(image, 'format.original.url'), '')}
                    className="h-full w-full object-cover object-center overflow-hidden"
                    quality={75}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

BlockCtaFeatured.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  button: linkPropTypes.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape(mediaPropTypes)).isRequired,
};

export default BlockCtaFeatured;
