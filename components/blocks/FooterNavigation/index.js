import React, { useEffect, useState } from 'react';

import delve from 'dlv';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkImagePropTypes, mediaPropTypes } from '@/utils/types';

import { getStrapiMedia } from '@/utils';

const FooterNavigation = ({ footerNavigation }) => {
  const [layoutImage, setLayoutImage] = useState('');
  const { coverImage, links } = footerNavigation;

  useEffect(() => {
    setLayoutImage(getStrapiMedia(delve(coverImage, 'format.original.url'), ''));
  }, [coverImage]);

  const onLinkOver = (image) => {
    setLayoutImage(getStrapiMedia(delve(image, 'format.original.url'), ''));
  };

  const onLinkOut = () => {
    setLayoutImage(getStrapiMedia(delve(coverImage, 'format.original.url'), ''));
  };

  return (
    <section className="relative w-full ">
      <div className="relative">
        <Image
          width={1920}
          height={448}
          alt={delve(layoutImage, 'alternativeText')}
          key={layoutImage}
          src={layoutImage}
          className="h-full w-full object-cover object-center min-h-[342px] sm:min-h-[390px] lg:max-h-[319px] lg:min-h-max 2lg:max-h-[448px] overflow-hidden animate-fade-in-image"
          quality={75}
        />
      </div>
      {links && (
        <div className="absolute top-0 bg-black opacity-50 h-full w-full ">
          <div className="h-full flex flex-col items-center justify-between px-4 py-20 sm:px-[38px] lg:flex-row lg:px-20 2lg:px-[100px] 2lg:container mx-auto">
            {links.map(({ id, label, path, image }) => {
              return (
                <Link
                  key={id}
                  className="cursor-link text-2xl sm:text-4xl 2lg:text-5xl font-bold text-white"
                  href={path}
                  onMouseOver={() => onLinkOver(image)}
                  onMouseOut={onLinkOut}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

FooterNavigation.defaultProps = {
  footerNavigation: {
    coverImage: '',
    links: [],
  },
};

FooterNavigation.propTypes = {
  footerNavigation: PropTypes.shape({
    coverImage: mediaPropTypes,
    links: PropTypes.arrayOf(linkImagePropTypes),
  }),
};

export default FooterNavigation;
