import React, { useState } from 'react';

import classNames from 'classnames';
import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { FreeMode, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { linkPropTypes, mediaPropTypes } from '@/utils/types';

import { ConcernLabels } from '@/collections';
import { BlockTitle, ContentElement, NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';

const ConcernLayout = ({ title, description, images, labels, buttons, children }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  // Requires Image Adapter
  const gallery = [...images];

  return (
    <div className="w-full px-4 sm:px-[38px] lg:px-20 2lg:px-[100px] 2lg:container mx-auto">
      <section className="flex flex-col mb-28 sm:mb-44 md:flex-row md:gap-x-6 2lg:gap-x-[50px] 2lg:mb-64">
        {gallery && (
          <div className="flex flex-col gap-y-[6px] sm:gap-y-3 md:flex-row-reverse md:w-4/6 md:gap-x-4 md:max-h-[704px]">
            <div className="w-full h-full rounded-[10px] overflow-hidden">
              <Image
                width={865}
                height={704}
                alt={delve(gallery[activeSlide], 'alternativeText')}
                src={getStrapiMedia(delve(gallery[activeSlide], 'format.original.url'), '')}
                className="h-full w-full object-cover object-center"
                quality={75}
              />
            </div>

            <Swiper
              breakpoints={{
                0: {
                  spaceBetween: 6,
                  direction: 'horizontal',
                },
                768: {
                  spaceBetween: 12,
                  direction: 'horizontal',
                },
                1280: {
                  direction: 'vertical',
                  spaceBetween: 16,
                },
              }}
              slidesPerView="auto"
              freeMode
              navigation
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Navigation, Pagination]}
              className="swiperConcernGalleryThumbs !pb-10 md:max-w-[112px]"
            >
              {gallery.map((image, index) => {
                return (
                  <SwiperSlide
                    onClick={() => setActiveSlide(index)}
                    key={image.id}
                    className={classNames(
                      '!w-14 !h-14 rounded-[5px] overflow-hidden cursor-pointer sm:!w-28 sm:!h-28 sm:rounded-[10px]',
                      {
                        'border-[2.5px] border-tertiary sm:border-[5px]': activeSlide === index,
                      }
                    )}
                  >
                    <Image
                      width={865}
                      height={704}
                      alt={delve(image, 'alternativeText')}
                      src={getStrapiMedia(delve(image, 'format.original.url'), '')}
                      className="h-full w-full object-cover object-center"
                      quality={75}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        <div className="md:w-2/6 md:max-w-[678px]">
          <BlockTitle title={title} />
          <div className="mb-6 text-base text-gray">
            <ContentElement content={description} />
          </div>
          {labels && <ConcernLabels labels={labels} />}
          {buttons && (
            <div className="flex flex-col gap-y-8 sm:flex-row sm:gap-x-8 sm:items-center">
              {buttons.map((button) => {
                return (
                  <NextLink
                    label={button.label}
                    href={button.path}
                    type={button.linkOptions.style}
                    customStyles="w-full justify-center text-center whitespace-nowrap sm:w-auto"
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      {children}
    </div>
  );
};

ConcernLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(mediaPropTypes).isRequired,
  labels: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    coverImage: PropTypes.shape(mediaPropTypes).isRequired,
  }).isRequired,
  buttons: PropTypes.arrayOf(linkPropTypes.isRequired).isRequired,
  children: PropTypes.shape({}).isRequired,
};
export default ConcernLayout;
