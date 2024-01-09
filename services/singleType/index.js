import { getData } from '@/utils/dataFetching';

export function getSingleTypeEndpoint(apiID, locale) {
  return `/${apiID}
    ?locale=${locale}
    &populate=deep`.replace(/\s+|\n/g, '');
}

export const getSingleType = async (apiID, locale) => {
  const response = await getData(`single-type?s=${apiID}&l=${locale}`);

  return {
    ...response,
  };
};
