'use client';

import delve from 'dlv';
import PropTypes from 'prop-types';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { galleryPropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { getStrapiMedia } from '@/utils';

import 'swiper/css';
import 'swiper/css/pagination';

const ImageSliderBlock = ({ gallery }) => {
  return (
    <section>
      <div className="mx-auto w-[800px] max-w-[calc(100vw_-_64px)]">
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
                  className="h-[450px] w-full rounded-base object-cover object-center"
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
  gallery: PropTypes.arrayOf(galleryPropTypes),
};

export default ImageSliderBlock;
