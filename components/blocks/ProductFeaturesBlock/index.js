'use client';

import React, { useState } from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/pagination';
import { mediaPropTypes } from '@/utils/types';

import { NextImage, Title } from '@/elements';
import { Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

const ProductFeaturesBlock = ({ title, coverImage }) => {
  const [role, setRole] = useState('owner');

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setRole(value);
  };
  return (
    <section>
      <div className="container mx-auto max-w-[1230px]">
        {title && <Title className="text-black mb-5">{title}</Title>}
        <div className="flex gap-5">
          <div className="flex-1">
            <Tabs
              tabs={[
                {
                  id: 1,
                  label: 'For Vessel Owner',
                  value: 'owner',
                },
                {
                  id: 2,
                  label: 'For Charterer',
                  value: 'charterer',
                },
              ]}
              onClick={handleActiveTab}
              activeTab={role}
            />
            {role === 'owner' ? (
              <div className="">
                <div className="text-black pb-2.5 pt-[20px] border-solid border-b border-gray-darker last:border-b-0">
                  <div className="pb-2.5 pl-[30px] pr-[74px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                </div>

                <div className="relative text-black rounded-[10px] pb-2.5 pt-[30px] bg-white shadow-xmd">
                  <div className="pb-2.5 pl-[30px] pr-[74px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                  <div className="pl-[30px] pb-4 pr-[74px]">
                    We are at the forefront of developing innovative supply chain solutions, fusing our global network
                    and depth of expertise with pioneering digital innovations to enable our customers to stay ahead.
                  </div>
                </div>

                <div className="text-black pb-2.5 pt-[20px] border-solid border-b border-gray-darker last:border-b-0">
                  <div className="pb-2.5 pl-[30px] pr-[74px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                </div>

                <div className="text-black pb-2.5 pt-[20px] border-solid border-b border-gray-darker last:border-b-0">
                  <div className="pb-2.5 pl-[30px] pr-[74px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                </div>
              </div>
            ) : (
              <div>Charterer</div>
            )}
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
};

export default ProductFeaturesBlock;
