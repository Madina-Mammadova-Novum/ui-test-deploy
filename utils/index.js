import { Slide, toast } from 'react-toastify';

import { Alert, NotificationAlert } from '@/elements';

export * from './otp';

export function getStrapiMedia(url, query = '') {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${url}${query}`;
}

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}/api${path}`;
}

/**
 * toastFunc
 * @param {string} type - You can use predefined values: default, info, warning, error, success
 * @param {string} title - The required field with the title in toast pop-up
 * @param {string} description - The detailed message in toast pop-up
 * @param {number} autoClose - Auto close time in milliseconds (default: 8000ms)
 * @returns {function(): number | string}
 */
export function toastFunc(type, title, description = '', autoClose = 8000) {
  toast(
    ({ closeToast }) => {
      return <Alert variant={type} title={title} description={description} handleClose={closeToast} />;
    },
    {
      autoClose,
      transition: Slide,
    }
  );
}

/**
 * notificationToastFunc
 */
export function notificationToastFunc(notificationData) {
  toast(
    ({ closeToast }) => {
      return <NotificationAlert handleClose={closeToast} notificationData={notificationData} />;
    },
    {
      autoClose: 8000,
      transition: Slide,
    }
  );
}

export function getApiPublicURL(path) {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`;
}

export function getApiURL(path) {
  return `${process.env.BACKEND_API_URL}/${path}`;
}

export function getRtURL(path) {
  return `${process.env.NEXT_PUBLIC_RT_URL}/${path}`;
}

export function getSeaMetrixURL(path) {
  return `/api/map-tiles/${path}/{z}/{x}/{y}.png`;
}

export function getIdentityApiURL(path, apiVersion = null) {
  let pathString = `/${path}`;
  if (apiVersion !== null) {
    pathString = `/${apiVersion}${pathString}`;
  }
  return `${process.env.IDENTITY_API_URL}${pathString}`;
}
