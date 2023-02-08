import delve from 'dlv';
import pluralize from 'pluralize';

import { COLLECTIONS_TYPES, NAVIGATIONS } from '@/lib';
import { toCamelCase } from '@/utils/helpers';

export function getStrapiMedia(url, query = '') {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${url}${query}`;
}

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api${path}`;
}

export function handleRedirection(preview, custom) {
  if (preview) {
    return {
      redirect: {
        destination: `/api/exit-preview`,
        permanent: false,
      },
    };
  }
  if (custom) {
    return {
      redirect: {
        destination: `/${custom}`,
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}

/**
 * getPaths
 * @returns {Promise<*[]>}
 */
export async function getPaths() {
  const paths = await Promise.all(
    Object.keys(COLLECTIONS_TYPES).map(async (collectionType) => {
      const { prefix } = COLLECTIONS_TYPES[collectionType];
      const collectionTypeData = await getCollectionTypesData(collectionType);
      return collectionTypeData.map(({ attributes: { slug } }) => {
        const path = prefix === '' ? `/${slug}` : `/${prefix}/${slug}`;
        return path.replace('//', '/');
      });
    })
  )
    .then((values) => {
      const array = [];
      values.forEach((item) => array.push(...item));
      return array;
    })
    .catch((e) => {
      console.error(e);
      return [];
    });
  return paths;
}

export function getCollectionType(slug) {
  if (slug !== undefined) {
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
      };
    }
    return {
      collectionType: 'page',
      slug: [prefix, ...slug].join('/'),
    };
  }
  return {
    collectionType: 'page',
    slug: ['home'].join('/'),
  };
}

export async function getGlobalData() {
  const global = await Promise.all([getNavigations().then((data) => ['navigation', data])])
    .then((values) => {
      return Object.fromEntries(values);
    })
    .then(({ navigation, header, contacts, footer, footerNavigation }) => {
      return {
        navigation,
        header,
        contacts,
        footer,
        footerNavigation,
      };
    })
    .catch((e) => {
      console.error(e);
    });
  return {
    global,
  };
}

export async function getEntityData(pathArray, locale, preview) {
  const { collectionType, slug } = getCollectionType(pathArray);
  const requestData = getData(slug, locale, collectionType, 'collectionType', preview);
  const response = await fetch(delve(requestData, 'data'));
  if (response.ok) {
    const { data, meta } = await response.json();
    return {
      slug,
      locale,
      collectionType,
      // Requires adapter
      data: data.length > 0 ? data : null,
      meta,
    };
  }
  return Promise.reject(response);
}

export function getData(slug, locale, apiID, kind, preview) {
  const previewParams = preview ? '&publicationState=preview&published_at_null=true' : '';
  const apiUrl = `/${pluralize(apiID)}?${previewParams}
    &locale=${locale}
    &filters[slug][$eq]=${slug}
    &populate[blocks][populate]=*,buttons.link,coverImage,button,button.linkOptions,changableTitles,descriptionItems.title
      ingredients,ingredients.coverImage,ingredients.concerns,ingredients.concerns.category, ingredients.concerns.images,
      concerns,concerns.category,concerns.images,
      items,items.coverImage,items.button,items.button.linkOptions,
      testimonials,testimonials.coverImage,testimonials.concern,testimonials.concern.images,testimonials.concern.category,
      members,members.category,members.coverImage,
      faqQuestions,faqQuestions.category,
      description.title,
      values,values.value,values.value.valueType,values.value.coverImage
    &populate[labels][populate]=*,coverImage
    &populate[images]=*
    &populate[buttons][populate]=*,linkOptions
    &populate[coverImage]=*
    &populate[imagesGallery]=*
    &populate[seo]=metaSocial`.replace(/\s+|\n/g, '');
  return {
    data: getStrapiURL(apiUrl),
    kind,
  };
}

async function getNavigationItem(navigationIdOrSlug) {
  const apiUrl = `/navigation/render/${navigationIdOrSlug}?type=TREE`;
  const response = await fetch(getStrapiURL(apiUrl));
  if (response.ok) {
    const data = await response.json();
    return data.length ? data : null;
  }
  return null;
}

export async function getNavigations() {
  const navigations = Promise.all(
    NAVIGATIONS.map((navigation) => {
      return getNavigationItem(navigation);
    })
  ).then((values) => {
    const nav = {};
    values.forEach((value, index) => {
      const key = toCamelCase(NAVIGATIONS[index]);
      nav[key] = value;
    });
    return nav;
  });

  return navigations;
}

export async function getCollectionTypesData(key) {
  const response = await fetch(getStrapiURL(`/${pluralize(key)}`));
  const { data } = await response.json();
  return data;
}
