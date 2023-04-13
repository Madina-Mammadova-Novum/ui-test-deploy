'use client';

import React, { useState } from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/pagination';

import { mediaPropTypes } from '@/utils/types';

import Item from '@/blocks/ProductFeaturesBlock/Item';
import { NextImage, Title } from '@/elements';
import { Accordion, Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

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
            {ctaList &&
              ctaList.map((ctaBlock) => {
                return (
                  currentTab === ctaBlock.title && (
                    <div key={ctaBlock.title} className="mt-2 divide-y divide-gray-darker">
                      {ctaBlock.cta.map((item) => {
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
                      })}
                    </div>
                  )
                );
              })}
          </div>
          {coverImage && (
            <div className="w-[566px] h-[366px] shrink-0 rounded-[10px] flex-1">
              <NextImage
                src={getStrapiMedia(delve(coverImage, 'format.original.url'), '?format=webp')}
                alt={delve(coverImage, 'alternativeText')}
                className="h-full w-full object-cover object-center rounded-[10px]"
                quality={75}
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
  ctaList: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    cta: PropTypes.arrayOf({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      text: PropTypes.string,
      buttons: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          path: PropTypes.string,
        })
      ),
    }),
  }),
};

export default ProductFeaturesBlock;
