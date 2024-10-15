'use client';

import { useState } from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import { ctaListPropTypes, mediaPropTypes } from '@/lib/types';

import Item from '@/blocks/ProductFeaturesBlock/Item';
import { NextImage, Title } from '@/elements';
import { Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

import 'swiper/css';
import 'swiper/css/pagination';

const ProductFeaturesBlock = ({ title, coverImage, ctaList }) => {
  const tabs = ctaList.map((ctaBlock) => {
    return {
      label: ctaBlock.title,
      value: ctaBlock.title,
    };
  });
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const printCtaBlockItem = (item) => {
    return (
      <div key={`id-${item.id}`} className="mt-1 rounded-base bg-white p-4 text-black shadow-xmd">
        <Item text={item.text} buttons={item.buttons} />
      </div>
    );
  };

  const printCtaBlock = (ctaBlock) => {
    return (
      currentTab === ctaBlock.title && (
        <div key={ctaBlock.title} className="mt-1 divide-y divide-gray-darker">
          {ctaBlock.cta.map(printCtaBlockItem)}
        </div>
      )
    );
  };

  return (
    <section>
      <div
        className="container mx-auto flex max-w-[1258px] scroll-mt-16 flex-col-reverse items-center justify-between gap-8 px-6 md:flex-row 3md:px-14"
        id="how-it-works"
      >
        <div className="md:w-1/2">
          {title && (
            <Title level="1" className="mb-5 text-black">
              {title}
            </Title>
          )}
          <div className="flex flex-col-reverse gap-5 sm:flex-row">
            <div className="flex-1">
              {ctaList && (
                <Tabs activeTab={currentTab} onClick={({ target }) => setCurrentTab(target.value)} tabs={tabs} />
              )}
              {ctaList && ctaList.map(printCtaBlock)}
            </div>
          </div>
        </div>

        {coverImage && (
          <div className="h-full max-h-[25rem] w-[25rem] rounded-base">
            <NextImage
              src={getStrapiMedia(delve(coverImage, 'format.original.url', '?format=webp'))}
              alt={delve(coverImage, 'alternativeText') || 'Tanker Image'}
              className="h-[25rem] w-[25rem] rounded-base object-cover object-center"
              quality={100}
              height={400}
              width={400}
            />
          </div>
        )}
      </div>
    </section>
  );
};

ProductFeaturesBlock.propTypes = {
  title: PropTypes.string,
  coverImage: mediaPropTypes,
  ctaList: PropTypes.arrayOf(ctaListPropTypes),
};

export default ProductFeaturesBlock;
