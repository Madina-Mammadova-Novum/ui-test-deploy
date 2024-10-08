'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

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
      className="relative ml-3.5 flex cursor-pointer items-center"
      aria-hidden
      onClick={() => setShowProfileMenu(true)}
    >
      <div className="mx-2.5 flex items-center">
        {session?.user?.name && <span className="text-xsm font-semibold text-black">{session?.user?.name}</span>}
        <AngleDownSVG
          className={classNames('ml-6 fill-black transition duration-500', showProfileMenu && 'rotate-180 fill-blue')}
        />
      </div>

      {showProfileMenu && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-0" aria-hidden onClick={closeMenu} />
          <div className="absolute -bottom-1 -right-0.5 z-50 min-w-[213px] translate-y-full rounded-md bg-white p-2.5 shadow-xmd">
            <NextLink href={ROUTES.ACCOUNT_INFO} onClick={closeMenu}>
              <div className="flex items-center rounded-md px-2.5 py-1.5 text-xsm font-semibold hover:bg-purple-light">
                <UserCircleSVG className="mr-2.5" /> My Account
              </div>
            </NextLink>
            <hr className="my-1" />

            <div className="flex items-center rounded-md px-2.5 text-xsm font-semibold text-gray hover:bg-purple-light">
              <LogoutButton
                text="Sign Out"
                icon={<ExitSVG />}
                className="!w-full !border-none !bg-transparent !p-0 text-gray"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
