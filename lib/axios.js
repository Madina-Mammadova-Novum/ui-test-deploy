/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { refreshAccessToken } from '@/services';
import { getCookieFromBrowser, sessionCookieCleaner, setCookie } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const createAxiosInstance = (headers) => {
  return axios.create({
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
};

const apiRequsetAxiosInterceptor = (request, token) => {
  request.headers.Authorization = `Bearer ${token}`;

  return request;
};

// eslint-disable-next-line consistent-return
const errorResponseAxiosInterceptor = async (error, token) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = await refreshAccessToken({ token });

    if (response.data) {
      originalRequest._retry = false;

      setCookie('session-access-token', response.data.access_token);
      setCookie('session-refresh-token', response.data.refresh_token);

      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
      return api(originalRequest); // Retry the request with the new token
    }

    errorToast('Bad request', 'Access token was outdate, please log in again');
    sessionCookieCleaner();

    originalRequest._retry = false;
    return Promise.reject(response.error);
  }
};

export const api = createAxiosInstance();

if (typeof window !== 'undefined') {
  const accessToken = getCookieFromBrowser('session-access-token');
  const refreshToken = getCookieFromBrowser('session-refresh-token');

  api.interceptors.request.use((request) => apiRequsetAxiosInterceptor(request, accessToken));
  api.interceptors.response.use(
    (response) => response,
    (error) => errorResponseAxiosInterceptor(error, refreshToken)
  );
}
