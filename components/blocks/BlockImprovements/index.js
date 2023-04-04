'use client';

import React from 'react';

import PropTypes from 'prop-types';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { valuesPropTypes } from '@/utils/types';

// import { ImprovementCard } from '@/collections';
import { Title } from '@/elements';

const BlockImprovements = ({ title, values }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      {title && <Title>{title}</Title>}
      {values && (
        <Swiper
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
              slidesPerView: 'auto',
            },
            1280: {
              spaceBetween: 20,
              slidesPerView: 3,
            },
            1440: {
              spaceBetween: 24,
              slidesPerView: 3,
            },
            1920: {
              spaceBetween: 24,
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          className="swiperImprovements"
        >
          {values.map((value) => {
            const { id, shortDescription, coverImage } = value.value;
            return (
              <SwiperSlide key={id} className="!w-[330px] sm:!w-[340px] md:!w-1/3">
                <>
                  {value.value.title}
                  {shortDescription}
                  {coverImage}
                </>
                {/* <ImprovementCard */}
                {/*  key={id} */}
                {/*  title={value.value.title} */}
                {/*  shortDescription={shortDescription} */}
                {/*  image={coverImage} */}
                {/* /> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

BlockImprovements.defaultProps = {
  title: '',
};

BlockImprovements.propTypes = {
  title: PropTypes.string,
  values: PropTypes.arrayOf(valuesPropTypes).isRequired,
};

export default BlockImprovements;
