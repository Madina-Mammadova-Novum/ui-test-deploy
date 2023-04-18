import { singleTypeAdapter } from '@/adapters/singleType';
import { getData } from '@/utils/dataFetching';

export function getSingleTypeEndpoint(apiID, locale) {
  return `/${apiID}
    ?locale=${locale}
    &populate=*,
    values.value,
    ctaSingleImage.coverImage,ctaSingleImage.button,ctaSingleImage.button.linkOptions,
    buttons,buttons.linkOptions,
    phones,emails,link,link.linkOptions,
    socials,socials.coverImage,socials.linkOptions
    `.replace(/\s+|\n/g, '');
}

export const getSingleType = async (apiID, locale) => {
  const response = await getData(`single-type?s=${apiID}&l=${locale}`);
  return singleTypeAdapter(response);
};
