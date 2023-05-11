'use client';

import { useState } from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import { ctaListPropTypes, mediaPropTypes } from '@/lib/types';

import Item from '@/blocks/ProductFeaturesBlock/Item';
import { NextImage, Title } from '@/elements';
import { Accordion, Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

import 'swiper/css';
import 'swiper/css/pagination';

const ProductFeaturesBlock = ({ title, coverImage, ctaList }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const tabs = ctaList.map((ctaBlock) => {
    return {
      label: ctaBlock.title,
      value: ctaBlock.title,
    };
  });

  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const printCtaBlockItem = (item) => {
    return (
      <Accordion
        key={`id-${item.id}`}
        open={open === item.title}
        onClick={() => handleOpen(item.title)}
        items={[
          {
            headerContent: item.title,
            bodyContent: <Item text={item.text} buttons={item.buttons} />,
          },
        ]}
      />
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
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && (
          <Title level="1" className="text-black mb-5">
            {title}
          </Title>
        )}
        <div className="flex gap-5">
          <div className="flex-1">
            {ctaList && (
              <Tabs activeTab={currentTab} onClick={({ target }) => setCurrentTab(target.value)} tabs={tabs} />
            )}
            {ctaList && ctaList.map(printCtaBlock)}
          </div>
          {coverImage && (
            <div className="w-[566px] h-[366px] shrink-0 rounded-base flex-1">
              <NextImage
                src={getStrapiMedia(delve(coverImage, 'format.original.url'), '?format=webp')}
                alt={delve(coverImage, 'alternativeText')}
                className="h-full w-full object-cover object-center rounded-base"
                quality={100}
                height={350}
                width={380}
              />
            </div>
          )}
        </div>
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
