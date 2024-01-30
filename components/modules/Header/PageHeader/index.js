'use server';

import delve from 'dlv';
import { cookies } from 'next/headers';

import Logo from '@/assets/images/logo.svg';
import { NavButton, NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';
import { AuthNavButtons } from '@/units';

const getServerToken = async () => {
  const token = cookies()?.get('session-access-token')?.value;

  return { token };
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

  const { token } = await getServerToken();
  const { buttons, navigation } = await getHeaderData(headerData);

  const printNavigation = ({ path, title }) => {
    return (
      <li key={path}>
        <NavButton path={path}>{title}</NavButton>
      </li>
    );
  };

  return (
    <header className="absolute w-full z-10">
      <div className="container px-6 3md:px-14 max-w-[1258px] mx-auto">
        <div className="py-2.5 flex align-center justify-between border-white/10 border-b">
          <NextLink href="/">
            <Logo className="fill-white" />
          </NextLink>
          <nav className="flex items-center gap-x-10">
            {navigation.length > 0 && <ul className="flex gap-x-5 items-center">{navigation.map(printNavigation)}</ul>}
            {buttons.length > 0 && <AuthNavButtons authorized={token} data={buttons} />}
          </nav>
        </div>
      </div>
    </header>
  );
}
