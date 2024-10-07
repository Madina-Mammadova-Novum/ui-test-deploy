import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkPropTypes, mediaPropTypes } from '@/lib/types';

// import { DermTestedCta } from '@/assets';
import {
  // AnimatedTitleText,
  NextLink,
} from '@/elements';
import { getStrapiMedia } from '@/utils';

const HeroAnimatedTitle = ({
  title = '',
  shortDescription = '',
  coverImage = {},
  button = {},
  changeableTitles = [],
}) => {
  return (
    <section className="relative mb-28 sm:mb-44 2xl:mb-64">
      <div className="grid grid-cols-1 gap-y-10 sm:gap-y-[82px] md:grid-cols-2 md:gap-x-5">
        <div className="relative col-span-1">
          {title && (
            <h1 className="mb-4 text-3xl font-bold text-black sm:mb-10 sm:text-6xl 2xl:mb-16 2xl:text-7xl">
              {title}
              {changeableTitles}
              {/* <AnimatedTitleText titles={changeableTitles} /> */}
            </h1>
          )}
          <div className="sm:ml-auto sm:max-w-[340px] md:max-w-[413px] 2xl:max-w-[556px]">
            {shortDescription && <p className="mb-6 text-sm text-gray sm:text-base 2xl:text-lg">{shortDescription}</p>}
            {button && (
              <NextLink
                label={button.label}
                href={button.path}
                type={button.linkOptions.style}
                customStyles="max-w-[254px] whitespace-nowrap"
              />
            )}
          </div>
          {/* <div className="hidden absolute h-[110px] w-[110px] sm:block sm:bottom-0 sm:left-0 2xl:h-[140px] 2xl:w-[140px]"> */}
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
              className="h-full w-full overflow-hidden object-cover object-center md:block group-hover:md:hidden"
              quality={75}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeroAnimatedTitle.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  button: linkPropTypes,
  changeableTitles: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }),
  coverImage: mediaPropTypes,
};

export default HeroAnimatedTitle;
