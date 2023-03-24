import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

import { LinkAsButton, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

const BlockCtaSingleImage = ({ title, shortDescription, coverImage, button }) => {
  return (
    <section className="relative py-24">
      {coverImage && (
        <div className="absolute w-full h-full inset-0 -z-10">
          <Image
            width={1440}
            height={410}
            alt={delve(coverImage, 'alternativeText')}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            className="h-full w-full object-cover object-center"
            quality={75}
          />
        </div>
      )}
      <div className="bg-white rounded-[10px] max-w-[500px] mx-auto py-8">
        {title && (
          <Title component="h1" className="text-black text-center mb-2.5">
            {title}
          </Title>
        )}
        <div className="max-w-[300px] mx-auto">
          {shortDescription && <p className="text-black text-xsm text-center mb-5">{shortDescription}</p>}
          {button && (
            <LinkAsButton
              href={button.path}
              buttonProps={{
                variant: 'primary',
                size: 'large',
              }}
              customStyles="max-w-[115px] mx-auto"
              target={button.linkOptions.target}
            >
              {button.label}
            </LinkAsButton>
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
