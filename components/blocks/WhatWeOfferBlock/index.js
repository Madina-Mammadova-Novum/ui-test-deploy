import delve from 'dlv';
import PropTypes from 'prop-types';

import { mediaPropTypes, valuesPropTypes } from '@/lib/types';

import { NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const Offer = ({ item, index }) => {
  return (
    <div
      key={index}
      className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10 sm:even:flex-row-reverse xl:gap-14"
    >
      {item.coverImage && (
        <div className="size-72 shrink-0 rounded-base md:h-[350px] md:w-[380px]">
          <NextImage
            src={getStrapiMedia(delve(item.coverImage, 'format.original.url'), '?format=webp')}
            alt={delve(item.coverImage, 'alternativeText') || 'Tanker Image'}
            className="h-full w-full rounded-base object-cover object-center"
            quality={75}
            height={350}
            width={380}
          />
        </div>
      )}
      <div className="flex flex-col items-center">
        {item.title && (
          <Title level="2" className="mb-2.5 text-black">
            {item.title}
          </Title>
        )}
        {item.shortDescription && <p className="text-xsm text-black">{item.shortDescription}</p>}
      </div>
    </div>
  );
};

Offer.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    coverImage: mediaPropTypes,
    shortDescription: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

const WhatWeOfferBlock = ({ title, values }) => {
  return (
    <section id="what-we-offer" className="pt-[100px]">
      <div className="container mx-auto max-w-[960px]">
        {title && (
          <Title level="1" className="mb-5 text-center text-black">
            {title}
          </Title>
        )}
        <div className="space-y-4">
          {values.map((item, index) => {
            return <Offer key={makeId()} item={item} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

WhatWeOfferBlock.propTypes = {
  title: PropTypes.string,
  values: valuesPropTypes,
};

export default WhatWeOfferBlock;
