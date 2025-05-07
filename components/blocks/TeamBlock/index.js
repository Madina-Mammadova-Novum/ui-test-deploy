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
        className="rounded-md border border-gray-darker p-4"
        icon={
          <NextImage
            alt={delve(link, 'title')}
            src={getStrapiMedia(delve(link, 'coverImage.format.original.url'), '')}
            height={16}
            width={16}
            customStyles="h-4 w-4"
          />
        }
      />
    </NextLink>
  );

  const printMember = ({ fullName, content, position, coverImage, socialLinks }) => (
    <SwiperSlide key={makeId()} className="flex h-auto px-2">
      <div className="flex max-w-full flex-col gap-y-6 rounded-base bg-white p-8 text-black shadow-2xmd">
        <div className="flex items-center gap-4">
          {coverImage && (
            <NextImage
              alt={delve(coverImage, 'alternativeText') || 'User Avatar'}
              src={getStrapiMedia(delve(coverImage, 'format.original.url'), '')}
              height={60}
              width={60}
              className="h-[60px] w-[60px] rounded-full object-cover object-center"
            />
          )}

          <div className="flex flex-col">
            {fullName.trim() && (
              <Title level="2" className="max-w-full break-words text-lg">
                {fullName}
              </Title>
            )}
            {position && (
              <Title level="4" className="text-xsm font-normal text-black">
                {delve(position, 'title')}
              </Title>
            )}
          </div>
        </div>
        {content && <div className="text-xsm">{parse(content)}</div>}
        {socialLinks && <div className="flex gap-x-2">{socialLinks.map(printSocialLink)}</div>}
      </div>
    </SwiperSlide>
  );

  return (
    <section>
      <div className="w-screen max-w-[1168px] px-2 pb-16 md:px-6 md:pb-20 3md:pb-24 lg:mx-auto lg:px-0">
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
