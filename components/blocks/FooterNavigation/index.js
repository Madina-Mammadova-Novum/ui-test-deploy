import React, { useEffect, useState } from 'react';

import delve from 'dlv';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkImagePropTypes, mediaPropTypes } from '@/lib/types';

import { getStrapiMedia } from '@/utils';

const FooterNavigation = ({
  footerNavigation = {
    coverImage: '',
    links: [],
  },
}) => {
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
    <section className="relative w-full">
      <div className="relative">
        <Image
          width={1920}
          height={448}
          alt={delve(layoutImage, 'alternativeText')}
          key={layoutImage}
          src={layoutImage}
          className="h-full min-h-[342px] w-full animate-fade-in-image overflow-hidden object-cover object-center sm:min-h-[390px] lg:max-h-[319px] lg:min-h-max 2xl:max-h-[448px]"
          quality={75}
        />
      </div>
      {links && (
        <div className="absolute top-0 h-full w-full bg-black opacity-50">
          <div className="mx-auto flex h-full flex-col items-center justify-between px-4 py-20 2xl:container sm:px-[38px] lg:flex-row lg:px-20 2xl:px-[100px]">
            {links.map(({ label, path, image }) => (
              <Link
                key={path}
                className="cursor-link text-2xl font-bold text-white sm:text-4xl 2xl:text-5xl"
                href={path}
                onMouseOver={() => onLinkOver(image)}
                onMouseOut={onLinkOut}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

FooterNavigation.propTypes = {
  footerNavigation: PropTypes.shape({
    coverImage: mediaPropTypes,
    links: PropTypes.arrayOf(linkImagePropTypes),
  }),
};

export default FooterNavigation;
