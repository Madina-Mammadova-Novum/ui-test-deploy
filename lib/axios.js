/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { Authorization } from '@/lib/constants';
import { refreshAccessToken } from '@/services';
import { getCookieFromBrowser, removeCookie, setCookie } from '@/utils/helpers';

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

    try {
      const token = getCookieFromBrowser('session-refresh-token');
      const role = getCookieFromBrowser('session-user-role');

      const response = await refreshAccessToken({ token });

      if (response.data?.access_token) {
        originalRequest._retry = false;

        setCookie('session-access-token', response.data.access_token);
        setCookie('session-refresh-token', response.data.refresh_token);
        setCookie('session-user-role', role);

        api.defaults.headers.common.Authorization = Authorization(response.data.access_token);

        return api(originalRequest); // Retry the request with the new token
      }
    } catch (err) {
      originalRequest._retry = false;
      removeCookie('session-access-token');
      removeCookie('session-refresh-token');
      removeCookie('session-user-role');
      Promise.reject(error);
    } finally {
      originalRequest._retry = false;
    }
  }

  originalRequest._retry = false;
  return Promise.reject(error); // Reject the request if refresh fails or isn't applicable
};

export const api = createAxiosInstance();

if (typeof window !== 'undefined') {
  api.interceptors.response.use((response) => response, errorResponseAxiosInterceptor);
}
