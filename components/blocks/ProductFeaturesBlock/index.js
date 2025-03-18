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
  const isProduction = process.env.NODE_ENV === 'production';

  const ownerImage = isProduction
    ? 'https://shiplink-backend.azurewebsites.net/uploads/Owner_8442395a9c.png?format=webp'
    : 'https://app-shiplink-backend-ui-dev-001.azurewebsites.net/uploads/Owner_049a264732.png?format=webp';
  const chartererImage = isProduction
    ? 'https://shiplink-backend.azurewebsites.net/uploads/Charterer_8311a8609d.png?format=webp'
    : 'https://app-shiplink-backend-ui-dev-001.azurewebsites.net/uploads/Charterer_f47da41fa3.png?format=webp';

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
          <div className="h-full w-full rounded-base md:w-1/2">
            <NextImage
              src={currentTab === 'For Vessel Owner' ? ownerImage : chartererImage}
              alt="Cover Image for User"
              className="h-[20rem] w-full rounded-base object-cover object-center"
              quality={100}
              height={320}
              width={400}
            />
            {/* Preload charterer image */}
            {currentTab === 'For Vessel Owner' && (
              <link rel="preload" href={chartererImage} as="image" type="image/webp" />
            )}
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
