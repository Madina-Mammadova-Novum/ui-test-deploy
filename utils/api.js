import { serialize } from 'cookie';

import { responseAdapter } from '@/adapters/response';
import { SYSTEM_ERROR } from '@/lib/constants';
import { getStrapiURL } from '@/utils/index';

export const errorHandler2 = (status, message, errors = []) => {
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
    status,
  };
};

export const errorHandler = (res, status, message, errors = []) => {
  const statusMessage = message === undefined || message === null ? SYSTEM_ERROR : message;
  let errorsMessages = null;
  let errorMessage = null;
  if (typeof statusMessage === 'object') {
    errorsMessages = statusMessage.errors;
    errorMessage = statusMessage.title;
  }

  return res.status(status).send({
    message: errorMessage !== null ? errorMessage : statusMessage,
    errors: errorsMessages !== null ? errorsMessages : errors,
    status,
  });
};

export const unprocessableEntity = (res) => {
  return errorHandler(res, 422, 'Please provide the required fields email and password');
};

export const bodyObject = ({ body }) => {
  return body;
};

export const checkRequestMethod = ({ method }, allowedMethods) => {
  return allowedMethods.includes(method);
};

export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers?.cookie?.split(';')?.find((c) => c.trim().startsWith(`${cookieKey}=`));
  if (!cookie) return undefined;
  return cookie.split('=')[1];
};

const fetchOptions2 = (requestMethod, body = null) => {
  const method = requestMethod.toUpperCase();
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(body);
  }
  return options;
};

const fetchOptions = (requestMethod, req) => {
  const method = requestMethod.toUpperCase();
  const options = {
    method, // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(req.body);
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

export const apiHandler2 = async (options) => {
  const { endpoint, requestMethod, body } = options;
  const requestOptions = fetchOptions2(requestMethod, body);

  try {
    const response = await fetch(endpoint, requestOptions);
    const { status, ok, statusText } = response;

    const result = ok ? await response.json() : null;
    const error = ok ? null : errorHandler2(status, statusText);

    return {
      status,
      ...(result ? responseAdapter(result) : {}),
      error,
    };
  } catch (error) {
    console.error(error);
    return errorHandler2(500, 'External server error');
  }
};

export const apiHandler = async (options, req, res) => {
  const { endpoint, requestMethod, allowedMethods } = options;
  if (checkRequestMethod(req, allowedMethods)) {
    const requestOptions = fetchOptions(requestMethod, req);

    const response = await fetch(endpoint, requestOptions);
    let result;

    try {
      result = await response.json();
    } catch {
      result = response;
    }

    if (!response.ok) {
      return errorHandler(res, response.status, result);
    }

    /* Set Authorization token */
    if (result?.token) {
      const cookie = serialize('auth_token', `${result.token}`, {
        httpOnly: true,
        path: '/',
      });
      res.setHeader('Set-Cookie', cookie);
    }

    return res.status(200).json(responseAdapter(result, result.status));
  }
  return errorHandler(res, 405, 'Method not allowed.');
};

export const postHandler = (path, body, provider) => {
  let apiURL = '';
  switch (provider) {
    case 'backend': {
      apiURL = getApiURL(path);
      break;
    }
    default: {
      apiURL = getStrapiURL(path);
      break;
    }
  }

  return apiHandler2({
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
    case 'backend': {
      apiURL = getApiURL(path);
      break;
    }
    default: {
      apiURL = getStrapiURL(path);
      break;
    }
  }
  return apiHandler2({
    endpoint: apiURL,
    requestMethod: 'GET',
  });
};

export const patchHandler = (path, req, res) => {
  return apiHandler(
    {
      endpoint: getApiURL(path),
      requestMethod: 'PATCH',
      allowedMethods: ['OPTIONS', 'PATCH'],
    },
    req,
    res
  );
};

export const deleteHandler = (path, req, res) => {
  return apiHandler(
    {
      endpoint: getApiURL(path),
      requestMethod: 'DELETE',
      allowedMethods: ['OPTIONS', 'DELETE'],
    },
    req,
    res
  );
};

export const identityHandler = (path, req, res) => {
  return apiHandler(
    {
      endpoint: getIdentityApiURL(path),
      requestMethod: 'POST',
      allowedMethods: ['OPTIONS', 'POST'],
    },
    req,
    res
  );
};
