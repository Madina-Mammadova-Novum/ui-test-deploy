/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import { ROUTES } from '@/lib';
import { refreshAccessToken } from '@/services';
import { getCookieFromBrowser, sessionCookieCleaner, sessionCookieData } from '@/utils/helpers';
/* Axios configuration */
const createAxiosInstance = (headers) => {
  return axios.create({
    headers: {
      Accept: '*/*',
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

    if (response.status === 401 || response.status === 500) {
      sessionCookieCleaner();

      // Redirect to the login page
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }

      return Promise.reject(error); // Reject the request if redirecting
    }

    if (response.data) {
      // Check if the original login used rememberMe by retrieving from localStorage
      const rememberMe = localStorage.getItem('remember-me') === 'true';

      sessionCookieData(response.data, rememberMe);
      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;

      return api(originalRequest);
    }
  }

  originalRequest._retry = false;
  return Promise.reject(error); // Reject the request if refresh fails or isn't applicable
};

/* Client handlers */
if (typeof window !== 'undefined') {
  /* Request interceptor */
  api.interceptors.request.use((req) => requestAxiosInterceptor(req));
  /* Response interceptor */
  api.interceptors.response.use(
    (res) => res,
    (error) => errorResponseAxiosInterceptor(error)
  );
}
