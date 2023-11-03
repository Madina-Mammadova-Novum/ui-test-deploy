'use client';

import { useState } from 'react';

import classnames from 'classnames';

import { ProfileMenuPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import ExitSVG from '@/assets/images/exit.svg';
import UserCircleSVG from '@/assets/images/userCircle.svg';
import { LogoutButton, NextImage, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const ProfileMenu = ({ name, image }) => {
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
      {image && (
        <div className="overflow-hidden h-10 w-10 rounded-[50%]">
          <NextImage src={image} height={40} width={40} alt="some_alt" />
        </div>
      )}
      <div className="flex items-center mx-2.5">
        <span className="text-black font-semibold text-xsm">{name}</span>
        <AngleDownSVG
          className={classnames('fill-black ml-6 transition duration-500', showProfileMenu && 'fill-blue rotate-180')}
        />
      </div>

      {showProfileMenu && (
        <>
          <div className="fixed top-0 right-0 bottom-0 left-0" aria-hidden onClick={closeMenu} />
          <div className="absolute -bottom-1 -right-0.5 z-50 translate-y-full bg-white p-2.5 shadow-xmd rounded-md min-w-[213px]">
            <NextLink href={ROUTES.ACCOUNT_INFO} onClick={closeMenu}>
              <div className="flex items-center text-xsm font-semibold px-2.5 py-1.5 hover:bg-purple-light rounded-md">
                <UserCircleSVG className="mr-2.5" /> My Account
              </div>
            </NextLink>
            <hr className="my-1" />

            <div className="flex items-center text-xsm font-semibold px-2.5 hover:bg-purple-light rounded-md text-gray">
              <LogoutButton
                text="Sign Out"
                icon={<ExitSVG />}
                className="!w-full !bg-transparent text-gray !border-none !p-0"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ProfileMenu.propTypes = ProfileMenuPropTypes;

export default ProfileMenu;
