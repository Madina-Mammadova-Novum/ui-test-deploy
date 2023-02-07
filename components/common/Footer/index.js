import React from 'react';

import delve from 'dlv';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { linkImagePropTypes, linkPropTypes } from '@/utils/types';

import { NextLink } from '@/elements';
import { getStrapiMedia } from '@/utils';
import { getCurrentYear, getNumbersFromString } from '@/utils/helpers';

const Footer = ({ footer, contacts }) => {
  const { privacyLink, socials } = footer;
  const { email, phone } = contacts;

  return (
    <footer className="flex flex-col-reverse lg:flex-row lg:justify-between gap-y-10 sm:gap-y-6 bg-gray-light w-full px-4 py-7 sm:px-[38px] lg:px-20 2lg:px-[100px] 2lg:container mx-auto">
      <div className="flex flex-col gap-y-4 items-center justify-center sm:flex-row sm:sm:gap-x-6 lg:gap-x-10">
        <p className="text-black text-sm">{`© ${getCurrentYear()} ILIK. All rights reserved `}</p>
        {privacyLink && <NextLink label={privacyLink.label} href={privacyLink.path} type="default" />}
      </div>
      <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-6 lg:gap-x-[30px] items-center justify-center">
        {email && (
          <a className="text-black text-sm font-bold" href={`mailto:${email}`}>
            {email}
          </a>
        )}
        {phone && (
          <div className="flex gap-x-[6.5px]">
            <div className="h-6 w-6">
              <Image
                width={24}
                height={24}
                alt="Logo Whatsapp"
                src="/logo-whatsapp.webp"
                className="h-full w-full object-cover object-center"
                quality={75}
              />
            </div>
            <a
              className="text-black text-sm font-bold"
              href={`https://wa.me/${getNumbersFromString(phone)}`}
              target="_blank"
              rel="noreferrer"
            >
              {phone}
            </a>
          </div>
        )}
        {socials && (
          <div className="flex gap-x-4">
            {socials.map(({ id, href, image, linkOptions }) => {
              return (
                <a className="cursor-pointer" key={id} href={href} target={linkOptions?.target} rel={linkOptions?.rel}>
                  <div className="h-6 w-6">
                    <Image
                      width={24}
                      height={24}
                      alt={delve(image, 'alternativeText')}
                      src={getStrapiMedia(delve(image, 'format.original.url'), '?format=webp')}
                      className="h-full w-full object-cover object-center"
                      quality={75}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  footer: {
    privacyLink: {},
    socials: [],
  },
  contacts: {
    email: '',
    phone: '',
  },
};

Footer.propTypes = {
  footer: PropTypes.shape({
    privacyLink: linkPropTypes,
    socials: PropTypes.arrayOf(linkImagePropTypes),
  }),
  contacts: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default Footer;
