import { apiHandler } from '@/utils/api';
import { getApiPublicURL } from '@/utils/index';

export function getData(path) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'GET',
    options: {
      cache: 'no-cache',
    },
  });
}

export function postData(path, body) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'POST',
    body,
  });
}

export function putData(path, body) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'PUT',
    body,
  });
}
