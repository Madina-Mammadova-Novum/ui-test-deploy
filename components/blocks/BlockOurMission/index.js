import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { mediaPropTypes } from '@/utils/types';

import { Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const BlockOurMission = ({ title, coverImage, longDescription }) => {
  return (
    <section className="relative py-[100px]">
      {coverImage && (
        <div className="absolute w-full h-full inset-0 -z-10">
          <Image
            width={1440}
            height={352}
            alt={delve(coverImage, 'alternativeText')}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={100}
          />
        </div>
      )}
      <div className="max-w-[800px] mx-auto">
        {title && (
          <Title component="h1" className="text-white text-center mb-2.5">
            {title}
          </Title>
        )}
        {longDescription && <p className="text-white text-center">{longDescription}</p>}
      </div>
    </section>
  );
};

BlockOurMission.defaultProps = {
  title: '',
  longDescription: '',
};

BlockOurMission.propTypes = {
  title: PropTypes.string,
  longDescription: PropTypes.string,
  coverImage: PropTypes.shape(mediaPropTypes).isRequired,
};

export default BlockOurMission;
