import delve from 'dlv';

import { getSingleType } from '../singleType';

import { linkAdapter } from '@/adapters/global';
import { getData } from '@/utils/dataFetching';

export const getNavigation = async (navigation, locale) => {
  const response = await getData(`navigation/${navigation}?locale=${locale}`);
  return {
    ...response,
  };
};

export const getFooterLinks = async () => {
  const footerData = await getSingleType('footer', 'en');
  const navigationSlug = delve(footerData, 'data.navigation');

  const { data } = await getNavigation(navigationSlug, 'en');

  return { data };
};

export const getContactInfo = async () => {
  const contactInfoData = await getSingleType('contact-information', 'en');
  const address = delve(contactInfoData, 'data.address');
  const phones = delve(contactInfoData, 'data.phones');
  const emails = delve(contactInfoData, 'data.emails');
  const link = delve(contactInfoData, 'data.link');

  const mapLink = linkAdapter(link);

  return {
    address,
    phones,
    emails,
    mapLink,
  };
};
