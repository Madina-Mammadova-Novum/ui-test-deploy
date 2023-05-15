import { apiHandler } from '@/utils/api';
import { getApiPublicURL, getIdentityApiURL } from '@/utils/index';

/**

Fetches data from the API using the GET method.
  @function getData
  @param {string} path - The path to the NextJS API Router endpoint.
  @returns {Promise} A promise that resolves with the response from the API.
  @throws {Error} - Will throw an error if the API request fails.
 */
export function getData(path) {
  // Sends an API request using the GET method with the provided path and options
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'GET',
    options: {
      cache: 'no-cache',
    },
  });
}

/**

Sends a POST request to the API with the specified path and body.
  @function postData
  @param {string} path - The path to the NextJS API Router endpoint.
  @param {Object} body - The request body.
  @returns {Promise} A promise that resolves with the response from the API.
  @throws {Error} - Will throw an error if the API request fails.
 */
export function postData(path, body) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'POST',
    body,
  });
}

export function postAuthData(path, body) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'POST',
    body,
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/x-www-form-urlencoded',
      },
    },
  });
}

/**

Sends a PUT request to the API with the specified path and body.
  @function putData
  @param {string} path - The path to the NextJS API Router endpoint.
  @param {Object} body - The request body.
  @returns {Promise} A promise that resolves with the response from the API.
  @throws {Error} - Will throw an error if the API request fails.
 */
export function putData(path, body) {
  return apiHandler({
    path: getApiPublicURL(path),
    requestMethod: 'PUT',
    body,
  });
}

export function loginData(path) {
  return apiHandler({
    path: getIdentityApiURL(path),
    requestMethod: 'POST',
    options: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  });
}
