/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { refreshAccessToken } from '@/services';
import { getCookieFromBrowser, sessionCookieData } from '@/utils/helpers';

/* Axios configuration */
const createAxiosInstance = (headers) => {
  return axios.create({
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
};

export const api = createAxiosInstance();

/* Request handler */
const requestAxiosInterceptor = (req) => {
  const token = getCookieFromBrowser('session-access-token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }

  return req;
};

/* Error handler */
const errorResponseAxiosInterceptor = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const token = getCookieFromBrowser('session-refresh-token');
    const response = await refreshAccessToken({ token });

    if (response.data) {
      sessionCookieData(response.data);

      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
    }

    return api(originalRequest); // Retry the request with the new token
  }

  originalRequest._retry = false;
  return Promise.reject(error); // Reject the request if refresh fails or isn't applicable
};

/* Client handlers */
if (typeof window !== 'undefined') {
  /* Request interceptor */
  api.interceptors.request.use((req) => requestAxiosInterceptor(req));
  /* Response inteceptor */
  api.interceptors.response.use(
    (res) => res,
    (error) => errorResponseAxiosInterceptor(error)
  );
}
