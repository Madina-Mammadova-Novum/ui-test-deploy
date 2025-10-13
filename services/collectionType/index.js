import pluralize from 'pluralize';

import { COLLECTIONS_TYPES } from '@/lib';
import { ROOT_COLLECTION_TYPE, ROOT_SLUG } from '@/lib/constants';
import { getData } from '@/utils/dataFetching';

function getCollectionType(slug) {
  if (slug !== undefined) {
    const locale = 'en'; // defaultLocale without using next-i18next.config.js
    if (slug.length > 0) {
      const prefix = slug.shift();
      const collectionType = Object.keys(COLLECTIONS_TYPES)
        .filter((type) => {
          return COLLECTIONS_TYPES[type].prefix === prefix;
        })
        .shift();
      if (slug.length > 0 && collectionType !== undefined) {
        return {
          collectionType,
          slug: slug.join('/'),
          locale,
        };
      }
      return {
        collectionType: ROOT_COLLECTION_TYPE,
        slug: [prefix, ...slug].join('/'),
        locale,
      };
    }
  }
  return {
    collectionType: ROOT_COLLECTION_TYPE,
    slug: [ROOT_SLUG].join('/'),
    locale: 'en', // defaultLocale form next-i18next.config.js
  };
}

export function getEndpoint(slug, locale, apiID, preview = false) {
  const previewParams = preview ? '&publicationState=preview&published_at_null=true' : '';
  return `/${pluralize(apiID)}?${previewParams}
    &locale=${locale}
    &filters[slug][$eq]=${slug}
    &populate=deep`.replace(/\s+|\n/g, '');
}

export async function getEntityData(params, preview = false) {
  const { slug: pathArray } = params;
  const { collectionType, slug, locale } = getCollectionType(pathArray);
  const response = await getData(`collection-type?s=${slug}&l=${locale}&c=${collectionType}&p=${preview}`);

  return {
    ...response,
  };
}
