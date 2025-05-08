import React from 'react';

import PropTypes from 'prop-types';

import { valuesPropTypes } from '@/lib/types';

import SearchSVG from '@/assets/images/search.svg';
import ShieldCheckSVG from '@/assets/images/shieldCheck.svg';
import ThumbUpSVG from '@/assets/images/thumbsUp.svg';
import UserTimesSVG from '@/assets/images/userTimes.svg';
import { NextImage } from '@/elements';

const Card = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-col items-start gap-5 rounded-[10px] bg-white p-5 shadow-xmd">
      <div className="flex size-11 items-center rounded-md border border-blue/20 p-2.5">
        <Icon className="fill-blue" />
      </div>
      <p className="text-xsm text-black">{text}</p>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

const WhyWeAreBetterBlock = () => {
  const cards = [
    {
      id: 'eliminating-middlemen',
      icon: UserTimesSVG,
      text: 'Eliminating middlemen and their network limitations.',
    },
    {
      id: 'direct-negotiations',
      icon: ThumbUpSVG,
      text: 'Direct negotiations between charterers and owners.',
    },
    {
      id: 'advanced-search',
      icon: SearchSVG,
      text: 'Advanced search technology for real-time vessel availability.',
    },
    {
      id: 'digital-agreements',
      icon: ShieldCheckSVG,
      text: 'Digitally signed charter agreements for a seamless process.',
    },
  ];

  return (
    <section id="why-we-are-better" className="py-16 md:py-20 3md:py-24">
      <div className="mx-auto flex max-w-[1152px] flex-col gap-8 px-4 md:px-8 3md:gap-12 xl:px-0">
        <div className="flex items-center justify-center md:col-span-1">
          <NextImage
            src="/images/icon-shiplink.png"
            alt="Ship.Link image"
            width={236}
            height={28}
            customStyles="object-contain"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 3md:mb-12 3md:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>

        <div className="flex flex-col gap-8 md:mx-auto md:max-w-[584px] 3md:max-w-[572px] 3md:gap-12">
          <div className="rounded-r-[10px] border-l-[10px] border-blue bg-gray-medium px-[1.625rem] py-7 text-xsm font-semibold text-black md:px-5">
            Ship.Link is built for shipowners and charterers who need a faster, smarter, and more transparent way to
            conduct vessel charters.
          </div>
          <p className="text-xsm text-black">
            Join the future of vessel chartering today. Whether you&apos;re a shipowner or a charterer, Ship.Link will
            help you connect, negotiate, and finalize charters with unmatched efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

WhyWeAreBetterBlock.propTypes = {
  values: valuesPropTypes,
};

export default WhyWeAreBetterBlock;
