'use client';

import { useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import BarsSVG from '@/assets/images/bars.svg';
import Logo from '@/assets/images/logo.svg';
import TimesSVG from '@/assets/images/times.svg';
import { NavButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const MobileMenu = ({ navigation = [], buttons = [], authorized = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenToggled, setHasBeenToggled] = useState(false);

  const toggleMenu = () => {
    if (!hasBeenToggled) {
      setHasBeenToggled(true);
    }
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center px-2 3md:hidden"
        aria-label="Toggle mobile menu"
        onClick={toggleMenu}
      >
        <BarsSVG className="h-8 w-8 fill-white" />
      </button>

      {/* Full screen modal */}
      <div
        className={classnames('fixed inset-0 z-50 flex flex-col bg-black text-white', {
          'transition-transform duration-300': hasBeenToggled,
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen,
        })}
      >
        <div className="container mx-auto flex h-full max-w-[1152px] flex-col px-4 md:px-8">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between border-b border-white/10 py-6">
            <NextLink href="/" onClick={toggleMenu} prefetch>
              <Logo className="fill-white" />
            </NextLink>
            <button
              type="button"
              className="flex items-center justify-center px-2"
              aria-label="Close mobile menu"
              onClick={toggleMenu}
            >
              <TimesSVG className="h-6 w-6 fill-white" />
            </button>
          </div>

          {/* Content area with flex layout for vertical positioning */}
          <div className="flex flex-1 flex-col justify-between py-8">
            {/* Navigation links - centered in the middle */}
            <div className="flex flex-1 items-center justify-center">
              {Array.isArray(navigation) && navigation.length > 0 && (
                <ul className="flex flex-col items-center gap-y-8">
                  {navigation.map(({ path, title }) => (
                    <li key={path}>
                      <NavButton path={path} onClick={toggleMenu} customStyles="!text-lg md:!text-xl">
                        {title}
                      </NavButton>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Auth buttons - at the bottom */}
            <div className="w-full">
              <ul className="mb-8 flex flex-col items-center gap-y-4">
                {!authorized ? (
                  buttons?.map(({ path, label, linkOptions }) => (
                    <li key={path} className="w-full max-w-[200px]">
                      <NextLink
                        href={path}
                        className={classnames('block w-full rounded-full py-3 text-center md:text-lg', {
                          'bg-primary text-white': linkOptions?.style === 'primary',
                          'text-primary bg-white': linkOptions?.style === 'secondary',
                          'border border-white text-white': linkOptions?.style === 'tertiary' || !linkOptions?.style,
                        })}
                        onClick={toggleMenu}
                        prefetch
                      >
                        {label}
                      </NextLink>
                    </li>
                  ))
                ) : (
                  <li className="w-full max-w-[200px]">
                    <NextLink
                      href={ROUTES.ACCOUNT_NEGOTIATING}
                      className="text-primary block w-full rounded-full bg-white py-3 text-center md:text-lg"
                      onClick={toggleMenu}
                      prefetch
                    >
                      Go to deals
                    </NextLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MobileMenu.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      linkOptions: PropTypes.shape({
        style: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
  authorized: PropTypes.bool,
};

export default MobileMenu;
