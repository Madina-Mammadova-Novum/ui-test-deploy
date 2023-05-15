import delve from 'dlv';

import { responseAdapter, responseErrorAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';

/**

 Handles errors returned by the API request
 @function requestErrorHandler
 @param {number} status - The status code of the error
 @param {string|object} message - The error message or an object with the error messages and title
 @param {Array} errors - An array of error messages
 @returns {object} - An object with the error message and error messages
 */
export const requestErrorHandler = (status, message, errors = []) => {
  const statusMessage = message === undefined || message === null ? SYSTEM_ERROR : message;
  let errorMessage = null;
  if (typeof statusMessage === 'object') {
    errorMessage = statusMessage.title;
  }
  return {
    message: errorMessage !== null ? errorMessage : statusMessage,
    errors: responseErrorAdapter(errors),
  };
};

/**

 Creates the options for the API request
 @function requestOptions
 @param {object} props - An object containing requestMethod, body and options properties
 @returns {object} - The options object for the API request
 */
const requestOptions = ({ requestMethod, body = null, options }) => {
  const method = requestMethod.toUpperCase();
  const headers = delve(options, 'headers');
  const fetchOptions = {
    method, // *GET, POST, PUT, DELETE, etc.
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  };
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = JSON.stringify(body);
  }
  return fetchOptions;
};

/**

 Handles the API request
 @function apiHandler
 @param {object} options - An object containing path, requestMethod, body and options properties
 @returns {object} - An object with status, data, error, and other response properties
 */
export const apiHandler = async (options) => {
  try {
    const path = delve(options, 'path');
    const response = await fetch(path, requestOptions(options));
    const status = delve(response, 'status');
    const ok = delve(response, 'ok');
    const statusText = delve(response, 'statusText');
    let responseBody = await response.text();
    if (responseBody !== '') {
      responseBody = JSON.parse(responseBody);
    }
    const result = ok ? responseBody : null;
    const error = ok ? null : requestErrorHandler(status, statusText, [responseBody]);
    return {
      status,
      ...responseAdapter(result),
      error,
    };
  } catch (error) {
    console.error(error);
    return requestErrorHandler(500, 'External server error', [error]);
  }
};

/**
  Handles the error response from the API and sends it as a JSON response
  @function errorHandler
  @param {object} res - The response object
  @param {number} status - The status code for the response
  @param {string} message - The error message
  @param {Array} errors - An array of error messages
  @returns {object} - A JSON response with the error message, error messages, status, data, and meta properties
 */
export const errorHandler = (res, status, message, errors = []) => {
  const error = {
    message: message || SYSTEM_ERROR,
    errors,
  };
  return res.status(status).json({ error, data: null, meta: null, status });
};

/**
 Handles the response from the API and sends it as a JSON response
 @function responseHandler
 @param {object} props - An object containing req, res, path, dataAdapter, and requestMethod properties
 @returns {object} - A JSON response with the status, data, meta, and error properties
 */
export const responseHandler = async ({ req, res, path, dataAdapter, requestMethod }) => {
  try {
    const { status, data, error, ...rest } = await apiHandler({ path, requestMethod, body: req.body });
    if (error) {
      const { message, errors } = error;
      const errorMessage = status === 500 ? 'External server error' : message;
      return errorHandler(res, status, errorMessage, errors);
    }
    const responseData = await dataAdapter({ data });
    const { data: responseDataAdapted } = responseAdapter(responseData);
    return res.status(status).json({ status, data: responseDataAdapted, error, ...rest });
  } catch (error) {
    console.error(error);
    return errorHandler(res, 500, error.message, [error]);
  }
};
