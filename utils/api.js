import { responseAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';
import { getStrapiURL } from '@/utils/index';

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

export function getApiURL(path) {
  return `${process.env.BACKEND_API_URL}/${path}`;
}

export function getIdentityApiURL(path, apiVersion = null) {
  let pathString = `/${path}`;
  if (apiVersion !== null) {
    pathString = `/${apiVersion}${pathString}`;
  }
  return `${process.env.IDENTITY_API_URL}${pathString}`;
}

export const externalApiHandler = async (options) => {
  const { endpoint, requestMethod, body } = options;
  const requestOptions = externalFetchOptions(requestMethod, body);

  try {
    const response = await fetch(endpoint, requestOptions);
    const { status, ok, statusText } = response;
    let responseBody = await response.text();
    if (responseBody !== '') {
      responseBody = JSON.stringify(responseBody);
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

export const postHandler = (path, body, provider) => {
  let apiURL = '';
  switch (provider) {
    case 'identify': {
      apiURL = getIdentityApiURL(path);
      break;
    }
    case 'backend': {
      apiURL = getApiURL(path);
      break;
    }
    default: {
      apiURL = getStrapiURL(path);
      break;
    }
  }

  return externalApiHandler({
    endpoint: apiURL,
    requestMethod: 'POST',
    body,
  });
};

/**
 *
 * @param path
 * @param provider
 * @returns {Promise<{data?: *, error: null|{message: null|string|*, errors: null|*[], status: *}, status: number}|{message: null|string|*, errors: null|*[], status: *}|undefined>}
 */
export const getHandler = (path, provider) => {
  let apiURL = '';
  switch (provider) {
    case 'identify': {
      apiURL = getIdentityApiURL(path);
      break;
    }
    case 'backend': {
      apiURL = getApiURL(path);
      break;
    }
    default: {
      apiURL = getStrapiURL(path);
      break;
    }
  }
  return externalApiHandler({
    endpoint: apiURL,
    requestMethod: 'GET',
  });
};
