import delve from 'dlv';

import { getNavigation } from '../navigation';
import { getSingleType } from '../singleType';

import { linkImageAdapter } from '@/adapters/global';

export const getSocialLinksData = async () => {
  const response = await getSingleType('social-network', 'en');

  if (response.data) {
    const socials = delve(response, 'data.socials');
    const socialLinksArray = socials?.length > 0 ? socials.map((socialLink) => linkImageAdapter(socialLink)) : [];

    return {
      socials: socialLinksArray,
    };
  }

  return {
    socials: [],
  };
};

export const getLegalLinksData = async () => {
  const response = await getNavigation('legal-navigation', 'en');
  const { data } = response;

  return { legal: data };
};
