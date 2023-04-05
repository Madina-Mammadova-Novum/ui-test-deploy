import { toast } from 'react-toastify';

// import delve from 'dlv';
import pluralize from 'pluralize';

import { Alert } from '@/elements';
import { COLLECTIONS_TYPES, NAVIGATIONS } from '@/lib';
import { toCamelCase } from '@/utils/helpers';

export function getStrapiMedia(url, query = '') {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.STRAPI_API_URL || 'http://localhost:1337'}${url}${query}`;
}

export function getStrapiURL(path) {
  return `${process.env.STRAPI_API_URL || 'http://localhost:1337'}/api${path}`;
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

/**
 * toastFunc
 * @param {string} type - You can use predefined values: default, info, warning, error, success
 * @param {string} title - The required field with the title in toast pop-up
 * @param {string} description - The detailed message in toast pop-up
 * @returns {function(): number | string}
 */
export function toastFunc(type, title, description = '') {
  toast(({ closeToast }) => {
    return <Alert variant={type} title={title} description={description} handleClose={closeToast} />;
  });
}
