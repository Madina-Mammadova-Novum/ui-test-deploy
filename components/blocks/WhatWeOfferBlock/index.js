import delve from 'dlv';
import PropTypes from 'prop-types';

import { mediaPropTypes, valuesPropTypes } from '@/lib/types';

import { NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const Offer = ({ item, index }) => {
  return (
    <div key={index} className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10 sm:even:flex-row-reverse">
      {item.coverImage && (
        <div className="size-72 md:w-[380px] md:h-[350px] shrink-0 rounded-base">
          <NextImage
            src={getStrapiMedia(delve(item.coverImage, 'format.original.url'), '?format=webp')}
            alt={delve(item.coverImage, 'alternativeText')}
            className="h-full w-full object-cover object-center rounded-base"
            quality={75}
            height={350}
            width={380}
          />
        </div>
      )}
      <div>
        {item.title && (
          <Title level="2" className="text-black mb-2.5">
            {item.title}
          </Title>
        )}
        {item.shortDescription && <p className="text-black text-xsm">{item.shortDescription}</p>}
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
    <section id="what-we-offer">
      <div className="container mx-auto max-w-[960px]">
        {title && (
          <Title level="1" className="text-center text-black mb-5">
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
