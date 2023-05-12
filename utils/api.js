import delve from "dlv";

import { responseAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';
import { isEmpty } from "@/utils/helpers";

export const requestErrorHandler = (status, message, errors = []) => {
  const statusMessage = message === undefined || message === null ? SYSTEM_ERROR : message;
  let errorsMessages = null;
  let errorMessage = null;
  if (typeof statusMessage === 'object') {
    errorsMessages = statusMessage.errors;
    errorMessage = statusMessage.title;
  }
  return {
    message: errorMessage !== null ? errorMessage : statusMessage,
    errors: errorsMessages !== null ? errorsMessages : errors,
  };
};

const requestOptions = ({ requestMethod, body = null, options }) => {
  const method = requestMethod.toUpperCase();
  const headers = delve(options, 'headers');
  const fetchOptions = {
    method, // *GET, POST, PUT, DELETE, etc.
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers
    },
  };
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = JSON.stringify(body);
  }
  return fetchOptions;
};

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
    return requestErrorHandler(500, 'External server error');
  }
};

export const errorHandler = (res, status, message, errors = []) => {
  const error = {
    message: message || SYSTEM_ERROR,
    errors,
  };
  return res.status(status).json({ error, data: null, meta: null, status });
};

export const responseHandler = async ({ req, res, path, dataAdapter, requestMethod }) => {
  try {
    const { status, data, meta } = await apiHandler({ path, requestMethod, body: req.body });
    if (status === 500) {
      const { errors } = data.error;
      return errorHandler(res, status, 'External server error', errors);
    }
    const responseData = await dataAdapter({ data });
    if (!responseData) return errorHandler(res, 404, 'Not Found');
    const { data: responseDataAdapted } = responseAdapter(responseData);
    return res.status(200).json({ status, data: responseDataAdapted, meta: isEmpty(meta) ? null : meta, error: null });
  } catch (error) {
    console.error(error);
    return errorHandler(res, 500, error.message);
  }
};
