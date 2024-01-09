/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { Authorization } from '@/lib/constants';
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

let isRefreshingToken = false; // Flag to track refresh token attempt

const errorResponseAxiosInterceptor = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry && !isRefreshingToken) {
    isRefreshingToken = true; // Set flag to prevent multiple calls

    try {
      const token = getCookieFromBrowser('session-refresh-token');
      const response = await refreshAccessToken({ token });

      if (response.data?.access_token) {
        setCookie('session-access-token', response.data.access_token);
        setCookie('session-refresh-token', response.data.refresh_token);

        api.defaults.headers.common.Authorization = Authorization(response.data.access_token);

        return api(originalRequest); // Retry the request with the new token
      }
    } catch (err) {
      // Handle any errors during refresh token process
      console.error('Error refreshing token:', err);
    } finally {
      isRefreshingToken = false; // Reset the flag
    }
  }

  originalRequest._retry = false;
  return Promise.reject(error); // Reject the request if refresh fails or isn't applicable
};

export const api = createAxiosInstance();

if (typeof window !== 'undefined') {
  api.interceptors.response.use((response) => response, errorResponseAxiosInterceptor);
}
