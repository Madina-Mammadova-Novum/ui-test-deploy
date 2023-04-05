'use client';

import React, { useState } from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/pagination';

import { mediaPropTypes } from '@/utils/types';

import { NextImage, Title } from '@/elements';
import { Accordion, Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

const ProductFeaturesBlock = ({ title, coverImage, ctaList }) => {
  const [role, setRole] = useState('owner');

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setRole(value);
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
              <Tabs
                tabs={ctaList.map((ctaBlock) => {
                  return {
                    label: ctaBlock.title,
                    value: ctaBlock.title,
                  };
                })}
                onClick={handleActiveTab}
                activeTab={role}
              />
            )}
            {ctaList &&
              ctaList.map((ctaBlock) => {
                return (
                  <>
                    {ctaBlock.cta.map((item) => {
                      return (
                        <Accordion
                          activeItem={1}
                          onClick={() => {}}
                          items={[
                            {
                              headerContent: item.title,
                              bodyContent: (
                                <div>
                                  <p>{item.text}</p>
                                  {item.buttons &&
                                    item.buttons.map((button) => {
                                      return <p>{button.label}</p>;
                                    })}
                                </div>
                              ),
                            },
                          ]}
                        />
                      );
                    })}
                  </>
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
