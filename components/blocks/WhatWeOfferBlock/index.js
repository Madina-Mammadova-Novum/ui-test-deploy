import delve from 'dlv';
import PropTypes from 'prop-types';

import { mediaPropTypes, valuesPropTypes } from '@/lib/types';

import { NextImage, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';

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

const WhatWeOfferBlock = () => {
  return (
    <section id="what-we-offer" className="bg-gray-medium py-16 md:py-20 3md:py-24">
      <div className="container mx-auto flex max-w-[584px] flex-col gap-8 px-4 md:px-0 3md:max-w-[572px] 3md:gap-12">
        <Title level="2" className="text-2.5xl font-bold text-black">
          A Smarter Way to Charter Vessels
        </Title>

        <div className="flex flex-col gap-6 3md:gap-7">
          <p className="text-xsm text-black">
            For decades, vessel chartering has relied on fragmented communication and multiple intermediaries — making
            the process slow and inefficient.
          </p>
          <div className="rounded-r-[10px] border-l-[10px] border-blue bg-white px-[1.625rem] py-7 text-xsm font-semibold text-black md:px-5">
            Ship.Link offers a streamlined, digital solution where shipowners and charterers can connect, negotiate, and
            finalize agreements in one place.
          </div>
          <p className="text-xsm text-black">
            By centralizing vessel listings and providing an advanced search engine, we help users find and secure spot
            charters faster while expanding market access.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Title level="3" className="text-lg font-bold text-black">
            How We Are Different
          </Title>
          <p className="text-xsm text-black">
            Unlike traditional vessel brokerage, Ship.Link removes inefficiencies by eliminating middlemen. Shipowners
            gain direct exposure to potential charterers, while charterers can quickly search and secure vessels that
            meet their requirements.
          </p>
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
