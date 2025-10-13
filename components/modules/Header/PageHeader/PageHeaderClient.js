'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import Logo from '@/assets/images/logo.svg';
import { NavButton, NextLink } from '@/elements';
import { AuthNavButtons } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const MobileMenu = dynamic(() => import('@/modules/Header/MobileMenu'), { ssr: false });
const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

const PageHeaderClient = ({ role, buttons = [], navigation = [] }) => {
  const { isAnon = true } = getRoleIdentity({ role });

  const printNavigation = ({ path, title }) => {
    return (
      <li key={path}>
        <NavButton path={path} prefetch>
          {title}
        </NavButton>
      </li>
    );
  };

  return (
    <InAppChecker>
      <header className="absolute z-10 w-full">
        <div className="container mx-auto max-w-[1152px] px-4 md:px-8 xl:px-0">
          <div className="flex items-center justify-between border-b border-white/10 py-6 3md:py-5">
            <NextLink href="/" prefetch>
              <Logo className="fill-white" />
            </NextLink>
            <nav className="flex items-center md:gap-x-5 3md:gap-x-14">
              {Array.isArray(navigation) && navigation.length > 0 && (
                <ul className="hidden items-center gap-x-6 3md:flex">{navigation.map(printNavigation)}</ul>
              )}
              {buttons?.length > 0 && <AuthNavButtons authorized={!isAnon} data={buttons} />}
              <MobileMenu navigation={navigation} buttons={buttons} authorized={!isAnon} />
            </nav>
          </div>
        </div>
      </header>
    </InAppChecker>
  );
};

PageHeaderClient.propTypes = {
  role: PropTypes.string,
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
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};

export default PageHeaderClient;
