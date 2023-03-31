'use client';

import React, { useState } from 'react';

import classnames from 'classnames';
import delve from 'dlv';
import PropTypes from 'prop-types';

import 'swiper/css';
import 'swiper/css/pagination';
import { mediaPropTypes } from '@/utils/types';

import { MinusIcon, PlusIcon } from '@/assets/icons';
import { Button, NextImage, Title } from '@/elements';
import { Tabs } from '@/units';
import { getStrapiMedia } from '@/utils';

const ProductFeaturesBlock = ({ title, coverImage }) => {
  const [role, setRole] = useState('owner');

  const handleActiveTab = (event) => {
    const { value } = event.target;
    setRole(value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <section>
      <div className="container mx-auto px-[54px] max-w-[1258px]">
        {title && <Title className="text-black mb-5">{title}</Title>}
        {/* {ctaList.map(({ id, subTitle }) => { */}
        {/*  return ( */}
        {/*    <p>{id}, {subTitle}</p> */}
        {/*  ) */}
        {/* })} */}
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
              <div className="divide-y divide-gray-darker mt-1">
                <div className="text-black pb-2.5 pt-[20px]">
                  <div className="pb-2.5 px-[30px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                </div>

                <div
                  className={classnames(
                    open ? 'relative border-none rounded-[10px] pt-[30px] bg-white shadow-xmd' : 'pt-[20px]',
                    'text-black pb-2.5 peer:bg-blue-500'
                  )}
                >
                  <div className="flex justify-between pb-2.5 px-[30px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                    <Button
                      type="button"
                      customStyles="!py-0 !px-0"
                      onClick={handleOpen}
                      buttonProps={{
                        text: '',
                        variant: 'tertiary',
                        size: 'small',
                        icon: open ? <MinusIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />,
                      }}
                    />
                  </div>
                  {open && (
                    <div className="pl-[30px] pb-4 pr-[74px] content-wrapper">
                      <p>
                        We are at the forefront of developing innovative supply chain solutions, fusing our global
                        network and depth of expertise with pioneering digital innovations to enable our customers to
                        stay ahead.
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-black pb-2.5 pt-[20px]">
                  <div className="pb-2.5 px-[30px]">
                    <Title component="h2" className="text-black">
                      Supply Chain and Logistics
                    </Title>
                  </div>
                </div>

                <div className="text-black pb-2.5 pt-[20px]">
                  <div className="pb-2.5 px-[30px]">
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

        <div className="rounded-[10px] pt-1.5 px-5 pb-5 bg-white shadow-xmd divide-y divide-gray-darker mt-1">
          <div className="text-black py-4">
            <div className="flex justify-between">
              <Title component="h3" className="text-black">
                Supply Chain and Logistics
              </Title>
              <Button
                type="button"
                customStyles="!py-0 !px-0"
                onClick={handleOpen}
                buttonProps={{
                  text: '',
                  variant: 'tertiary',
                  size: 'small',
                  icon: open ? <MinusIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />,
                }}
              />
            </div>
            {open && (
              <div className="mt-2.5 content-wrapper">
                <h4>The primary differences between less-than-truckload (LTL) and truckload (TL) shipments</h4>
                <p>
                  We are at the forefront of developing innovative supply chain solutions, fusing our global network and
                  depth of expertise with pioneering digital innovations to enable our customers to stay ahead.
                </p>
              </div>
            )}
          </div>
          <div className="text-black py-4">
            <div className="flex justify-between">
              <Title component="h3" className="text-black">
                Supply Chain and Logistics
              </Title>
              <Button
                type="button"
                customStyles="!py-0 !px-0"
                onClick={handleOpen}
                buttonProps={{
                  text: '',
                  variant: 'tertiary',
                  size: 'small',
                  icon: open ? <MinusIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />,
                }}
              />
            </div>
            {open && (
              <div className="mt-2.5 content-wrapper">
                <h4>The primary differences between less-than-truckload (LTL) and truckload (TL) shipments</h4>
                <p>
                  We are at the forefront of developing innovative supply chain solutions, fusing our global network and
                  depth of expertise with pioneering digital innovations to enable our customers to stay ahead.
                </p>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                </ul>
              </div>
            )}
          </div>
          <div className="text-black pt-5">
            <div className="rounded-[10px] border border-gray-darker bg-gray-light px-5 py-3">
              <Title component="h3">Everything you need to know</Title>
              <div className="flex gap-x-2.5 items-center">
                <p className="text-xsm">Can’t find the answer you’re looking for?</p>
                <Button
                  type="button"
                  onClick={() => {}}
                  buttonProps={{ text: 'Help Center', variant: 'primary', size: 'medium' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ProductFeaturesBlock.propTypes = {
  title: PropTypes.string,
  coverImage: mediaPropTypes,
  // ctaList: PropTypes.arrayOf({
  //   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  //   subTitle: PropTypes.string
  // }),
};

export default ProductFeaturesBlock;
