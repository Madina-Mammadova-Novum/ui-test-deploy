import axios from 'axios';

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

api.interceptors.request.use(
  async (request) => {
    // const token = getCookieFromServer('session-access-token', NextRequest);
    // console.log('token: ', token);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (typeof window !== 'undefined' ??) {
//         const token = getCookieFromBrowser('session-refresh-token');
//         const response = await refreshAccessToken({ token });

//         setCookie('session-access-token', response.data.access_token);
//         setCookie('session-refresh-token', response.data.refresh_token);

//         api.defaults.headers.common.Authorization = `Bearer ${response.data?.access_token}`;

//         return api(originalRequest);
//       }
//       return api(originalRequest);
//     }

//     return Promise.reject(error);
//   }
// );
