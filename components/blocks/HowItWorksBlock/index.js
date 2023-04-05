import React from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import { mediaPropTypes, valuesPropTypes } from '@/utils/types';

import { NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const Step = ({ item, index }) => {
  return (
    <div key={makeId()} className="step relative flex justify-start md:justify-between gap-x-[27px] sm:gap-x-[56px]">
      <div className="relative col-span-2 min-w-[32px] sm:col-span-1 md:min-w-[40px] lg:col-span-2 dotted-step-how-it-works">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center h-8 w-8 border border-black rounded-full md:h-10 md:w-10">
          {index + 1}
        </div>
      </div>
      <div className=" w-full col-span-10 bg-secondary-light pt-1 pb-5 px-1 rounded-[10px] sm:col-span-11 sm:flex sm:py-1 sm:pl-1 sm:pr-4 lg:col-span-10 md:max-w-[631px] 2lg:max-w-[848px]">
        {item.coverImage && (
          <div className="h-[192px] rounded-lg overflow-hidden sm:min-w-[256px] sm:min-h-[208px] md:min-w-[288px] 2lg:min-w-[320px] 2lg:min-h-[280px]">
            <NextImage
              src={getStrapiMedia(delve(item.coverImage, 'format.original.url'), '?format=webp')}
              alt={delve(item.coverImage, 'alternativeText')}
              className="h-full w-full object-cover object-center"
              quality={75}
              width={320}
              height={280}
            />
          </div>
        )}
        <div className="pt-5 px-4 sm:flex sm:flex-col sm:justify-center">
          {item.title && (
            <h3 className="text-black text-base leading-6 font-bold mb-1 sm:mb-3 2lg:text-xl">{item.title}</h3>
          )}
          {item.shortDescription && <p className="text-gray text-sm leading-5">{item.shortDescription}</p>}
          {item.subTitle && <p className="text-gray text-sm leading-5">{item.subTitle}</p>}
        </div>
      </div>
    </div>
  );
};

Step.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    coverImage: mediaPropTypes,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
const BlockHowItWorks = ({ title, shortDescription, subTitle, values }) => {
  return (
    <section id="how-it-works" className="mb-28 sm:mb-44 2lg:mb-64">
      <div className="relative flex flex-col md:flex-row md:justify-between lg:mt-14 2lg:mt-16">
        <div className="md:sticky md:top-0 md:self-start md:min-w-[521px]">
          {title && <Title level="1">{title}</Title>}
          {shortDescription && shortDescription}
          {subTitle && subTitle}
        </div>
        <div className="md:col-span-1" />
        <div className="mt-10 flex flex-col gap-y-3 md:mt-0">
          {values.map((item, index) => {
            return <Step key={makeId()} item={item} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

BlockHowItWorks.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  values: valuesPropTypes.isRequired,
};

export default BlockHowItWorks;
