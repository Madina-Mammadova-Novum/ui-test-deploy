'use client';

import React from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { mediaPropTypes } from '@/utils/types';

import { NextImage } from '@/elements';
import { getStrapiMedia } from '@/utils';

const ImageSliderBlock = ({ items }) => {
  return (
    <section>
      <div className="container mx-auto max-w-[960px]">
        <Swiper
          slidesPerView="1"
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          scrollbar={{
            draggable: true,
            dragSize: 50,
          }}
          modules={[Pagination]}
          className="swiperAboutUs -mt-[165px]"
        >
          {items.map(({ id, coverImage }) => {
            return (
              <SwiperSlide key={id} className="">
                <NextImage
                  width={800}
                  height={450}
                  alt={delve(coverImage, 'alternativeText')}
                  src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
                  className="h-full w-full object-cover object-center rounded-[10px]"
                  quality={100}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

ImageSliderBlock.propTypes = {
  items: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    coverImage: PropTypes.shape(mediaPropTypes),
  }).isRequired,
};

export default ImageSliderBlock;
