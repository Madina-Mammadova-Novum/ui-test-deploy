'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AccountInfoSVG from '@/assets/images/accountInfo.svg';
import ArrowSVG from '@/assets/images/arrow.svg';
import LogoutSVG from '@/assets/images/logout.svg';
import { NextImage, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const ProfileMenu = ({ image }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const closeMenu = (e) => {
    e.stopPropagation();
    setShowProfileMenu(false);
  };
  return (
    <div
      className="ml-3.5 flex items-center cursor-pointer relative"
      aria-hidden
      onClick={() => setShowProfileMenu(true)}
    >
      <div className="overflow-hidden h-10 w-10 rounded-[50%]">
        <NextImage src={image} height={40} width={40} alt="some_alt" />
      </div>
      <div className="flex items-center mx-2.5">
        <span>Some text</span>
        <ArrowSVG className={`w-2.5 ml-6 transition duration-500 ${showProfileMenu && 'fill-blue rotate-180'}`} />
      </div>

      {showProfileMenu && (
        <>
          <div className="fixed top-0 right-0 bottom-0 left-0" aria-hidden onClick={closeMenu} />
          <div className="absolute -bottom-1 translate-y-full translate-x-[-15%] bg-white p-2.5 shadow-xmd rounded-md min-w-[213px]">
            <NextLink href={ROUTES.ACCOUNT_INFO}>
              <div className="flex items-center text-xsm font-semibold px-2.5 py-1.5 hover:bg-purple-light rounded-md">
                <AccountInfoSVG className="mr-2.5" /> Account information
              </div>
            </NextLink>
            <hr className="my-1" />
            <NextLink href="#">
              <div className="flex items-center text-xsm font-semibold px-2.5 py-1.5 hover:bg-purple-light rounded-md text-gray">
                <LogoutSVG className="mr-2.5" /> Log out
              </div>
            </NextLink>
          </div>
        </>
      )}
    </div>
  );
};

ProfileMenu.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ProfileMenu;
