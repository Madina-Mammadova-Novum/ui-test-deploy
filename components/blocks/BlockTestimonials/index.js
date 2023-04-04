'use client';

import React from 'react';

import PropTypes from 'prop-types';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { TestimonialCard } from '@/collections';
import { Title } from '@/elements';

const BlockTestimonials = ({ title, shortDescription, testimonials }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      {title && <Title>{title}</Title>}
      {shortDescription && shortDescription}
      {testimonials && (
        <Swiper
          slidesPerView="auto"
          navigation
          freeMode
          pagination={{
            clickable: true,
          }}
          scrollbar={{
            draggable: true,
            dragSize: 50,
          }}
          breakpoints={{
            0: {
              spaceBetween: 12,
            },
            1440: {
              spaceBetween: 20,
            },
            1920: {
              spaceBetween: 24,
            },
          }}
          modules={[Pagination, Navigation]}
          className="swiperTestimonial"
        >
          {testimonials.map((testimonial) => {
            return (
              <SwiperSlide
                key={testimonial.id}
                className="!w-[330px] !h-[340px] sm:!w-[340px] md:!w-[413px] md:!h-[448px] 2lg:!h-[576px] 2lg:!w-[558px]"
              >
                {testimonial}
                {/* <TestimonialCard testimonial={testimonial} /> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

BlockTestimonials.defaultProps = {
  title: '',
  shortDescription: '',
  testimonials: '',
};

BlockTestimonials.propTypes = {
  title: PropTypes.string,
  shortDescription: PropTypes.string,
  testimonials: PropTypes.arrayOf({}),
};

export default BlockTestimonials;
