import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkPropTypes } from '@/utils/types';

import { NextLink } from '@/elements';

const HeaderAuth = ({ text, link }) => {
  const [showArabicLogo, setShowArabicLogo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowArabicLogo(!showArabicLogo);
    }, 5000);

    return () => clearInterval(interval);
  }, [showArabicLogo]);

  return (
    <header className="fixed top-0 z-10 flex items-center justify-between bg-transparent h-16 mb-10 w-full px-4 sm:px-[38px] md:mb-14 lg:h-20 lg:px-20 2lg:px-[100px] 2lg:container mx-auto">
      <Link href="/" className="w-10 h-6 md:w-[67px] md:h-10 ">
        <Image
          width={67}
          height={42}
          alt="Logo image"
          key={showArabicLogo ? 'arabic' : 'english'}
          src={showArabicLogo ? '/logo-ar.webp' : '/logo.webp'}
          className="animate-fade-in object-cover object-center"
          quality={75}
        />
      </Link>
      <div className="flex items-center gap-x-4">
        {text && <p className="text-xsm text-gray">{text}</p>}
        {link && <NextLink label={link.label} href={link.href} type={link.linkOptions.style} />}
      </div>
    </header>
  );
};

HeaderAuth.defaultProps = {
  text: '',
  link: null,
};

HeaderAuth.propTypes = {
  text: PropTypes.string,
  link: linkPropTypes,
};

export default HeaderAuth;
