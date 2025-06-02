'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { ctaListPropTypes, mediaPropTypes } from '@/lib/types';

import Item from '@/blocks/ProductFeaturesBlock/Item';
import { NextImage, Title } from '@/elements';
import { Tabs } from '@/units';

import 'swiper/css';
import 'swiper/css/pagination';

const ProductFeaturesBlock = ({ title, coverImage, ctaList }) => {
  const ownerImage =
    'https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/pageimages/vessel_owner_1x.webp';
  const chartererImage =
    'https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/pageimages/charterer.webp';

  const tabs = ctaList.map((ctaBlock) => {
    return {
      label: ctaBlock.title,
      value: ctaBlock.title,
    };
  });
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const printCtaBlockItem = (item) => {
    return (
      <div key={`id-${item.id}`} className="mt-2 rounded-base bg-white p-8 text-black shadow-xmd">
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
    <section id="how-it-works" className="py-16 md:py-20 3md:py-24">
      <div className="flex flex-col-reverse gap-8 px-4 md:px-8 3md:mx-auto 3md:max-w-[1152px] 3md:flex-row 3md:items-center 3md:gap-10 xl:px-0">
        <div className="flex flex-col gap-6 3md:w-1/2 lg:max-w-[540px]">
          {title && (
            <Title level="2" className="text-2.5xl text-black">
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
          <div className="h-full w-full rounded-base 3md:w-1/2 lg:max-w-[572px]">
            <NextImage
              src={currentTab === 'For Vessel Owner' ? ownerImage : chartererImage}
              alt="Cover Image for User"
              className="h-60 w-full rounded-base object-cover object-center md:h-[22.875rem] 3md:h-[24.5rem]"
              quality={100}
              height={320}
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
