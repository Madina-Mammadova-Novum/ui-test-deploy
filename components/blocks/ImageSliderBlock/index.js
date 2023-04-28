'use client';

import React from 'react';

import delve from 'dlv';
import PropTypes from 'prop-types';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { mediaPropTypes } from '@/utils/types';

import { NextImage } from '@/elements';
import { getStrapiMedia } from '@/utils';

const ImageSliderBlock = ({ gallery }) => {
  return (
    <section>
      <div className="container mx-auto max-w-[960px]">
        <Swiper
          slidesPerView="1"
          spaceBetween={20}
          loop
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
          }}
          modules={[Pagination, Autoplay]}
          className="swiperAboutUs -mt-[175px]"
        >
          {gallery.map((coverImage) => {
            return (
              <SwiperSlide>
                <NextImage
                  width={800}
                  height={450}
                  alt={delve(coverImage, 'alternativeText')}
                  src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
                  className="h-[450px] w-full object-cover object-center rounded-base"
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
  gallery: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    coverImage: PropTypes.shape(mediaPropTypes),
  }),
};

export default ImageSliderBlock;
