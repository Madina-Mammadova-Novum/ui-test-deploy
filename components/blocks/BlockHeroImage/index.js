import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { getStrapiMedia } from '@/utils';

const BlockHeroImage = ({ title, coverImage }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      {title && (
        <h1 className="text-black text-3xl font-bold mb-4 max-w-[993px] sm:text-5xl md:text-7xl sm:mb-10 2lg:mb-16">
          {title}
        </h1>
      )}
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
    </section>
  );
};

BlockHeroImage.defaultProps = {
  title: '',
};

BlockHeroImage.propTypes = {
  title: PropTypes.string,
  coverImage: PropTypes.shape(mediaPropTypes).isRequired,
};

export default BlockHeroImage;
