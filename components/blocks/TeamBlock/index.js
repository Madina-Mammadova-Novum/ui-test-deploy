'use client';

import delve from 'dlv';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { authorPropTypes } from '@/lib/types';

import { HoverableIcon, NextImage, NextLink, Title } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';

const TeamBlock = ({ title, subTitle, shortDescription, members }) => {
  const printSocialLink = (link) => (
    <NextLink key={link} href={delve(link, 'path')} title={delve(link, 'title')}>
      <HoverableIcon
        className="border border-gray-darker rounded-md"
        icon={
          <NextImage
            alt={delve(link, 'title')}
            src={getStrapiMedia(delve(link, 'coverImage.format.original.url'), '')}
            height={20}
            width={20}
          />
        }
      />
    </NextLink>
  );

  const printMember = ({ fullName, content, position, coverImage, socialLinks }) => (
    <SwiperSlide key={makeId()} className="px-2.5 h-auto flex">
      <div className="flex grow items-center flex-col mt-[60px] text-black shadow-2xmd px-[30px] pb-[30px] bg-white rounded-base">
        {coverImage && (
          <NextImage
            alt={delve(coverImage, 'alternativeText')}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            height={120}
            width={120}
            className="h-[120px] w-[120px] object-cover object-center rounded-full mb-2.5 -mt-[60px]"
          />
        )}
        {fullName.trim() && (
          <Title level="2" className="mb-1">
            {fullName}
          </Title>
        )}
        {position && (
          <Title level="4" className="font-semibold mb-1">
            {delve(position, 'title')}
          </Title>
        )}
        {socialLinks && <div className="flex gap-x-2.5 mb-2.5">{socialLinks.map(printSocialLink)}</div>}
        {content && <div className="text-xsm">{parse(content)}</div>}
      </div>
    </SwiperSlide>
  );

  return (
    <section>
      <div className="container w-screen mx-auto px-[54px] max-w-[1268px]">
        {title && (
          <Title level="1" className="mb-5 text-center text-black">
            {title}
          </Title>
        )}
        {subTitle && subTitle}
        {shortDescription && shortDescription}
        {members.length ? (
          <Swiper
            slidesPerView="3"
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="swiperTeam"
          >
            {members.map(printMember)}
          </Swiper>
        ) : null}
      </div>
    </section>
  );
};

TeamBlock.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  shortDescription: PropTypes.string,
  members: PropTypes.arrayOf(authorPropTypes),
};

export default TeamBlock;
