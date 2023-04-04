import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

// import { DermTestedCta } from '@/assets';
import {
  // AnimatedTitleText,
  NextLink,
} from '@/elements';
import { getStrapiMedia } from '@/utils';

const HeroAnimatedTitle = ({ title, shortDescription, coverImage, button, changableTitles }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      <div className="grid grid-cols-1 gap-y-10 sm:gap-y-[82px] md:grid-cols-2 md:gap-x-5">
        <div className="relative col-span-1">
          {title && (
            <h1 className="text-black text-3xl font-bold mb-4 sm:text-6xl sm:mb-10 2lg:mb-16 2lg:text-7xl">
              {title}
              {changableTitles}
              {/* <AnimatedTitleText titles={changableTitles} /> */}
            </h1>
          )}
          <div className="sm:max-w-[340px] sm:ml-auto md:max-w-[413px] 2lg:max-w-[556px]">
            {shortDescription && <p className="text-gray text-sm mb-6 sm:text-base 2lg:text-lg">{shortDescription}</p>}
            {button && (
              <NextLink
                label={button.label}
                href={button.path}
                type={button.linkOptions.style}
                customStyles="max-w-[254px] whitespace-nowrap"
              />
            )}
          </div>
          {/* <div className="hidden absolute h-[110px] w-[110px] sm:block sm:bottom-0 sm:left-0 2lg:h-[140px] 2lg:w-[140px]"> */}
          {/*  <DermTestedCta /> */}
          {/* </div> */}
        </div>
        <div className="col-span-1">
          <div className="">
            <Image
              width={848}
              height={704}
              alt={delve(coverImage, 'alternativeText')}
              src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
              className="h-full w-full object-cover object-center overflow-hidden md:block group-hover:md:hidden"
              quality={75}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroAnimatedTitle.defaultProps = {
  title: '',
  shortDescription: '',
  button: {},
  changableTitles: [],
  coverImage: {},
};

HeroAnimatedTitle.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  button: linkPropTypes,
  changableTitles: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }),
  coverImage: mediaPropTypes,
};

export default HeroAnimatedTitle;
