'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import classnames from 'classnames';

import { ProfileMenuPropTypes } from '@/lib/types';

import AngleDownSVG from '@/assets/images/angleDown.svg';
import ExitSVG from '@/assets/images/exit.svg';
import UserCircleSVG from '@/assets/images/userCircle.svg';
import { LogoutButton, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { getAuthSelector } from '@/store/selectors';

const ProfileMenu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { session } = useSelector(getAuthSelector);

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
      <div className="flex items-center mx-2.5">
        {session?.user?.name && <span className="text-black font-semibold text-xsm">{session?.user?.name}</span>}
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
