import { singleTypeAdapter } from '@/adapters/singleType';
import { getData } from '@/utils/dataFetching';

export function getSingleTypeEndpoint(apiID, locale) {
  return `/${apiID}
    ?locale=${locale}
    &populate=*
    `.replace(/\s+|\n/g, '');
}

export const getSingleType = async (apiID, locale) => {
  const response = await getData(`single-type?s=${apiID}&l=${locale}`);
  return singleTypeAdapter(response);
};
