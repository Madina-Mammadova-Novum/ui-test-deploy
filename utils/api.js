import { responseAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';

export const externalErrorHandler = (status, message, errors = []) => {
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

export const bodyObject = ({ body }) => {
  return body;
};

const externalFetchOptions = (requestMethod, body = null) => {
  const method = requestMethod.toUpperCase();
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(body);
  }
  return options;
};

export const externalApiHandler = async (options) => {
  try {
    const { path, requestMethod, body } = options;
    const requestOptions = externalFetchOptions(requestMethod, body);
    const response = await fetch(path, requestOptions);
    const { status, ok, statusText } = response;
    let responseBody = await response.text();
    if (responseBody !== '') {
      responseBody = JSON.parse(responseBody);
    }
    const result = ok ? responseBody : null;
    const error = ok ? null : externalErrorHandler(status, statusText, [responseBody]);
    return {
      status,
      ...(result ? responseAdapter(result) : {}),
      error,
    };
  } catch (error) {
    console.error(error);
    return externalErrorHandler(500, 'External server error');
  }
};
