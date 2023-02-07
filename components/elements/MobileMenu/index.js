import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

import NextLink from '../NextLink';

import { linkPropTypes, navigationPropTypes } from '@/utils/types';

import { ArrowRight, BurgerMenu, CloseMenu } from '@/assets';
import { getNumbersFromString, makeId, uniqueArray } from '@/utils/helpers';

const MobileMenu = React.memo(({ navigation, primaryBtn, defaultBtn, contacts }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { mainNavigation } = navigation;
  const { email, phone } = contacts;

  useEffect(() => {
    document.body.style.overflow = menuOpened ? 'hidden' : 'unset';
  }, [menuOpened]);

  const handleCloseMenu = useCallback(() => {
    setMenuOpened(false);
  }, [setMenuOpened]);

  const renderConcerns = useMemo(() => {
    const concerns = mainNavigation.find((item) => item.items.length > 0).items;
    const categories = uniqueArray(concerns.map((concern) => concern.related.category));

    return categories.map((category) => {
      return (
        <Fragment key={makeId()}>
          <p className="text-secondary text-[12px] leading-[130%] font-medium uppercase mb-4 mt-9">{category.title}</p>
          {concerns && (
            <ul className="flex flex-col gap-y-[25px]">
              {concerns
                .filter((item) => item.related.category.code === category.code)
                .map(({ path, title }) => {
                  return (
                    <li key={makeId()} className="relative">
                      <NextLink
                        key={title}
                        label={title}
                        href={path}
                        onClick={handleCloseMenu}
                        type="default"
                        icon={<ArrowRight />}
                      />
                    </li>
                  );
                })}
            </ul>
          )}
        </Fragment>
      );
    });
  }, [mainNavigation, handleCloseMenu]);

  return (
    <div className="md:hidden">
      <div className="fixed top-5 right-4 flex flex-row gap-x-3 items-center z-[20]">
        {defaultBtn &&
          defaultBtn.map((button) => (
            <NextLink key={makeId()} label={button.label} href={button.path} type={button.type} />
          ))}
        <BurgerMenu onClick={() => setMenuOpened(true)} />
      </div>
      {menuOpened && (
        <div className="fixed w-screen h-screen top-0 right-0 z-[99]">
          <div
            role="button"
            aria-label="Modal overlay"
            tabIndex={0}
            onKeyDown={handleCloseMenu}
            onClick={handleCloseMenu}
            className={classnames(
              'absolute w-screen h-screen bg-black opacity-50 translate-x-full transition-transform duration-500 animate-appear-left-side-0.65',
              {
                'translate-x-0': menuOpened,
                /* 'translate-x-full': !menuOpened, */
              }
            )}
          />
          <div
            className={classnames(
              'bg-white h-screen w-screen absolute top-0 right-0 px-4 py-5 overflow-scroll translate-x-full transition-transform duration-700  animate-appear-left-side-0.8 2xs:w-1/2 2xs:max-w-[375px]',
              {
                '!translate-x-0': menuOpened,
                /* 'translate-x-full': !menuOpened, */
              }
            )}
          >
            <div className="h-11 w-full flex justify-between items-start">
              <Link href="/" onClick={handleCloseMenu}>
                <Image
                  width={40}
                  height={24}
                  alt="Logo image"
                  src="/logo.webp"
                  className="object-cover object-center"
                  quality={75}
                />
              </Link>
              <div className="flex gap-x-3 items-center">
                {defaultBtn &&
                  defaultBtn.map((button) => (
                    <NextLink
                      key={makeId()}
                      label={button.label}
                      href={button.path}
                      onClick={handleCloseMenu}
                      type={button.type}
                    />
                  ))}
                <CloseMenu onClick={handleCloseMenu} />
              </div>
            </div>

            {mainNavigation && (
              <nav className="mt-4 flex flex-col">
                <p className="text-secondary text-[12px] leading-[130%] font-medium uppercase mb-4">Explore</p>
                <ul className="flex flex-col gap-y-[25px]">
                  {mainNavigation
                    .filter((item) => item.items.length === 0)
                    .map(({ title, path }) => {
                      return (
                        <li key={makeId()} className="relative">
                          <NextLink
                            key={title}
                            label={title}
                            href={path}
                            onClick={handleCloseMenu}
                            type="default"
                            icon={<ArrowRight />}
                          />
                        </li>
                      );
                    })}
                </ul>
                {renderConcerns}
              </nav>
            )}
            {(email || phone) && (
              <div className="mt-[37px]">
                <p className="text-secondary text-[12px] leading-[130%] font-medium uppercase">Need Help?</p>
                {email && (
                  <a className="text-black text-sm font-bold block mt-[18.5px]" href={`mailto:${email}`}>
                    {email}
                  </a>
                )}
                {phone && (
                  <div className="flex gap-x-[6.5px] mt-[26px]">
                    <div className="h-[21px] w-[21px]">
                      <Image
                        width={21}
                        height={21}
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
              </div>
            )}
            {primaryBtn &&
              primaryBtn.map((button) => (
                <NextLink
                  key={makeId()}
                  customStyles="justify-center mt-[42px]"
                  label={button.label}
                  href={button.path}
                  onClick={handleCloseMenu}
                  type={button.type}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
});

MobileMenu.propTypes = {
  navigation: PropTypes.shape({
    mainNavigation: PropTypes.arrayOf(navigationPropTypes),
  }).isRequired,
  primaryBtn: PropTypes.arrayOf(linkPropTypes.isRequired).isRequired,
  defaultBtn: PropTypes.arrayOf(linkPropTypes.isRequired).isRequired,
  contacts: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default MobileMenu;
