'use client';

import delve from 'dlv';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { authorPropTypes } from '@/lib/types';

import { HoverableIcon, NextImage, NextLink, Title } from '@/elements';
import { SCREENS } from '@/lib/constants';
import { getStrapiMedia } from '@/utils';
import { makeId } from '@/utils/helpers';
import { useMediaQuery } from '@/utils/hooks';

const TeamBlock = ({ title, subTitle, shortDescription, members }) => {
  const smdScreen = useMediaQuery(SCREENS.SMD);
  const smScreen = useMediaQuery(SCREENS.SM);

  const getSlidesPerView = () => {
    if (smScreen) return 1;
    if (smdScreen) return 2;
    return 3;
  };

  const printSocialLink = (link) => (
    <NextLink key={link} href={delve(link, 'path')} title={delve(link, 'title')}>
      <HoverableIcon
        className="rounded-md border border-gray-darker"
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
    <SwiperSlide key={makeId()} className="flex h-auto px-2.5">
      <div className="mt-[60px] flex max-w-full grow flex-col items-center rounded-base bg-white px-[30px] pb-[30px] text-black shadow-2xmd">
        {coverImage && (
          <NextImage
            alt={delve(coverImage, 'alternativeText') || 'User Avatar'}
            src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
            height={120}
            width={120}
            className="-mt-[60px] mb-2.5 h-[120px] w-[120px] rounded-full object-cover object-center"
          />
        )}
        {fullName.trim() && (
          <Title level="2" className="mb-1 max-w-full break-words">
            {fullName}
          </Title>
        )}
        {position && (
          <Title level="4" className="mb-1 font-semibold">
            {delve(position, 'title')}
          </Title>
        )}
        {socialLinks && <div className="mb-2.5 flex gap-x-2.5">{socialLinks.map(printSocialLink)}</div>}
        {content && <div className="text-xsm">{parse(content)}</div>}
      </div>
    </SwiperSlide>
  );

  return (
    <section>
      <div className="container mx-auto w-screen max-w-[1268px] px-6 3md:px-14">
        {title && (
          <Title level="1" className="mb-5 text-center text-black">
            {title}
          </Title>
        )}
        {subTitle && subTitle}
        {shortDescription && shortDescription}
        {members.length ? (
          <Swiper
            slidesPerView={getSlidesPerView()}
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
