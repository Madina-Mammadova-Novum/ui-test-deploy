'use server';

import delve from 'dlv';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

import Logo from '@/assets/images/logo.svg';
import { NavButton, NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';
import { AuthNavButtons } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const MobileMenu = dynamic(() => import('@/modules/Header/MobileMenu'), { ssr: false });
const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

const getUserRole = async () => {
  const role = cookies()?.get('session-user-role')?.value;

  return { role };
};

const getHeaderData = async (headerData) => {
  if (headerData.data) {
    const navigationSlug = delve(headerData, 'data.navigation');
    const navigationData = await getNavigation(navigationSlug, 'en');
    const buttons = delve(headerData, 'data.buttons');
    const navigation = delve(navigationData, 'data');

    return {
      buttons,
      navigation,
    };
  }

  return {
    buttons: [],
    navigation: [],
  };
};

export default async function PageHeader() {
  const headerData = await getSingleType('header', 'en');

  const { role } = await getUserRole();
  const { buttons, navigation } = await getHeaderData(headerData);

  const { isAnon = true } = getRoleIdentity({ role });

  const printNavigation = ({ path, title }) => {
    return (
      <li key={path}>
        <NavButton path={path}>{title}</NavButton>
      </li>
    );
  };

  return (
    <InAppChecker>
      <header className="absolute z-10 w-full">
        <div className="container mx-auto max-w-[1152px] px-4 md:px-8 xl:px-0">
          <div className="flex items-center justify-between border-b border-white/10 py-6 3md:py-5">
            <NextLink href="/">
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
}
