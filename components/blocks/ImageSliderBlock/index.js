'use client';

import delve from 'dlv';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageSliderBlockPropTypes } from '@/lib/types';

import { NextImage } from '@/elements';
import { getStrapiMedia } from '@/utils';

import 'swiper/css';
import 'swiper/css/pagination';

const ImageSliderBlock = ({ gallery }) => {
  return (
    <section>
      <div className="container mx-auto max-w-[960px]">
        <Swiper
          slidesPerView="1"
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="swiperAboutUs -mt-[175px]"
        >
          {gallery.map((coverImage) => {
            return (
              <SwiperSlide className="">
                <NextImage
                  width={800}
                  height={450}
                  alt={delve(coverImage, 'alternativeText')}
                  src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
                  className="h-[450px] w-full object-cover object-center rounded-[10px]"
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

ImageSliderBlock.propTypes = ImageSliderBlockPropTypes;

export default ImageSliderBlock;
