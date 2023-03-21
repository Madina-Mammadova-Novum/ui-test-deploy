'use client';

import React from 'react';

import PropTypes from 'prop-types';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { mediaPropTypes } from '@/utils/types';

// import { MemberCard } from '@/collections';
import { Title } from '@/elements';

const BlockTeam = ({ title, members }) => {
  return (
    <section className="relative mb-28 sm:mb-44 2lg:mb-64">
      {title && <Title>{title}</Title>}
      {members && (
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
          className="swiperTeam"
        >
          {members.map(({ id, fullName, coverImage, description, position }) => {
            return (
              <SwiperSlide key={id} className="!w-[330px] sm:!w-[340px] md:!w-[413px] 2lg:!w-[558px]">
                {fullName}
                {coverImage}
                {description}
                {position}
                {/* <MemberCard */}
                {/*  key={id} */}
                {/*  fullName={fullName} */}
                {/*  coverImage={coverImage} */}
                {/*  description={description} */}
                {/*  position={position} */}
                {/* /> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </section>
  );
};

BlockTeam.defaultProps = {
  title: '',
};

BlockTeam.propTypes = {
  title: PropTypes.string,
  members: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fullName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverImage: mediaPropTypes,
    category: PropTypes.shape({
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlockTeam;
