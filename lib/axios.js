/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { refreshAccessToken } from '@/services';
import { getCookieFromBrowser, setCookie } from '@/utils/helpers';

const createAxiosInstance = (headers) => {
  return axios.create({
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
};

const errorResponseAxiosInterceptor = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const token = getCookieFromBrowser('session-refresh-token');

    const response = await refreshAccessToken({ token });
    console.log('response: ', response);

    if (response.data) {
      originalRequest._retry = false;
      setCookie('session-access-token', response.data.access_token);
      setCookie('session-refresh-token', response.data.refresh_token);

      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
      return api(originalRequest); // Retry the request with the new token
    }

    originalRequest._retry = false;
  }

  return Promise.reject(error); // Reject the request if refresh fails or isn't applicable
};

export const api = createAxiosInstance();

if (typeof window !== 'undefined') {
  api.interceptors.response.use(
    (res) => res,
    (error) => errorResponseAxiosInterceptor(error)
  );
}
