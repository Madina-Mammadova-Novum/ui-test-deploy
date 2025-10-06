'use server';

import delve from 'dlv';
import { cookies } from 'next/headers';

import PageHeaderClient from './PageHeaderClient';

import { getNavigation } from '@/services/navigation';
import { getSingleType } from '@/services/singleType';

const getUserRole = async () => {
  const cookieStore = await cookies();
  const role = cookieStore?.get('session-user-role')?.value;
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

  return <PageHeaderClient role={role} buttons={buttons} navigation={navigation} />;
}
