import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { linkPropTypes, navigationPropTypes } from '@/utils/types';

import { Dropdown, MobileMenu, NextLink } from '@/elements';
import { makeId } from '@/utils/helpers';
import { useIsHeaderVisible } from '@/utils/hooks';

const Header = ({ navigation, header, contacts }) => {
  const [showArabicLogo, setShowArabicLogo] = useState(false);
  const { isVisible } = useIsHeaderVisible();

  const { mainNavigation } = navigation;
  const { buttons } = header;

  const primaryBtn = buttons.filter((button) => {
    return button.type === 'primary';
  });

  const defaultBtn = buttons.filter((button) => {
    return button.type !== 'primary';
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowArabicLogo(!showArabicLogo);
    }, 5000);

    return () => clearInterval(interval);
  }, [showArabicLogo]);

  return (
    <header
      className={classnames(
        'flex items-center justify-between bg-lightBlue h-16 mb-10 w-full px-4 sm:px-[38px] md:mb-14 lg:h-20 lg:px-20 2lg:px-[100px] 2lg:container mx-auto',
        {
          '-translate-y-full': !isVisible,
        }
      )}
    >
      <Link href="/">
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
      {mainNavigation && (
        <nav className="hidden md:block">
          <ul className="flex gap-x-[50px]">
            {mainNavigation.map(({ title, path, items }) => {
              return (
                <li key={makeId()} className="group/dropdown relative">
                  <NextLink label={title} href={path} type="default" />
                  {items.length > 0 && <Dropdown concerns={items} />}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <div className="flex items-center gap-x-3 lg:gap-x-8 ">
        {buttons &&
          buttons.map((button) => (
            <NextLink
              key={makeId()}
              customStyles="hidden md:flex"
              label={button.label}
              href={button.path}
              type={button.type}
            />
          ))}
        <MobileMenu navigation={navigation} contacts={contacts} primaryBtn={primaryBtn} defaultBtn={defaultBtn} />
      </div>
    </header>
  );
};

Header.defaultProps = {
  navigation: {},
  header: {},
  contacts: {},
};

Header.propTypes = {
  navigation: navigationPropTypes,
  header: PropTypes.shape({
    buttons: PropTypes.arrayOf(linkPropTypes),
  }),
  contacts: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

export default Header;
