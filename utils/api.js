import delve from 'dlv';

import { errorsAdapter } from '@/adapters';
import { responseAdapter, responseErrorAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';
import { formatErrors } from '@/utils/helpers';

/**
  Handles errors returned by the API request
  @function requestErrorHandler
  @param {string|object} message - The error message or an object with the error messages and title
  @param {Array} errors - An array of error messages
  @returns {object} - An object with the error message and error messages
 */
export const requestErrorHandler = (status, message, errors) => {
  if (errors?.error) return errors.error;
  const statusMessage = message === undefined || message === null ? SYSTEM_ERROR : message;

  let errorMessage = null;

  if (typeof statusMessage === 'object') {
    errorMessage = statusMessage.title;
  }

  if (typeof errors === 'object') {
    return {
      status,
      message: errors.Title || statusMessage,
      errors: formatErrors(errors?.Errors ?? errors),
    };
  }

  return {
    status,
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
    headers: {
      Accept: '*/*',
      ...headers,
    },
    ...options,
  };
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    // temporary solution for file type
    if (body?.type === 'text/plain') {
      const formdata = new window.FormData();
      formdata.append('file', body, `${body?.name}`);

      fetchOptions.body = formdata;

      return fetchOptions;
    }

    if (body?.type === 'formdata') {
      fetchOptions.body = body?.data;
      return fetchOptions;
    }

    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
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
    const response = await fetch(options.path, requestOptions(options));

    let responseBody = await response.text();

    if (responseBody) {
      responseBody = JSON.parse(responseBody);
    }

    const result = response.ok ? responseBody : null;
    const error = response.ok ? null : requestErrorHandler(response.status, response.statusText, responseBody);

    return {
      status: response.status,
      ...responseAdapter(result),
      error: options.customErrorHandling && !response.ok ? responseBody : error,
    };
  } catch (error) {
    return requestErrorHandler(500, 'External server error', error);
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
export const errorHandler = (res, status, error) => {
  return res.status(status).json({ error: errorsAdapter({ error }), data: null, meta: null, status });
};

/**
  Handles the response from the API and sends it as a JSON response
  @function responseHandler
  @param {object} props - An object containing req, res, path, dataAdapter, and requestMethod properties
  @returns {object} - A JSON response with the status, data, meta, and error properties
 */
export const responseHandler = async ({
  req,
  res,
  path,
  dataAdapter,
  requestMethod,
  options = null,
  customErrorHandling,
}) => {
  try {
    const { status, data, error, ...rest } = await apiHandler({
      path,
      requestMethod,
      body: req.body,
      options,
      customErrorHandling,
    });

    if (error) errorHandler(res, status, error);

    const responseData = await dataAdapter({ data });
    const { data: responseDataAdapted } = responseAdapter(responseData);

    return res.status(status).json({ status, data: responseDataAdapted, error, ...rest });
  } catch (error) {
    return errorHandler(res, 500, error.message, error);
  }
};
