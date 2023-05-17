// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export const contentTypeJson = () => {
  return { 'Content-Type': 'application/json' };
};

const axiosInstance = axios.create({
  baseURL: process.env.IDENTITY_API_URL,
  headers: { ...contentTypeJson() },
});

export default axiosInstance;
