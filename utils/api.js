import { serialize } from 'cookie';

import { getStrapiURL } from '@/utils/index';

export const errorHandler = (res, status, message, errors = []) => {
  const statusMessage = message === undefined || message === null ? 'Something went wrong' : message;
  return res.status(status).send({
    message: statusMessage,
    errors,
  });
};

export const unprocessableEntity = (res) => {
  return errorHandler(res, 422, 'Please provide the required fields email and password');
};

export const bodyObject = ({ body }) => {
  return JSON.parse(body);
};

export const checkRequestMethod = ({ method }, allowedMethods) => {
  return allowedMethods.includes(method);
};

export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers?.cookie?.split(';')?.find((c) => c.trim().startsWith(`${cookieKey}=`));
  if (!cookie) return undefined;
  return cookie.split('=')[1];
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

export function getApiURL(path, apiVersion = 'v1') {
  return `${process.env.BACKEND_API_URL}/${apiVersion}/${path}`;
}

export function getIdentityApiURL(path, apiVersion = null) {
  let pathString = `/${path}`;
  if (apiVersion !== null) {
    pathString = `/${apiVersion}${pathString}`;
  }
  return `${process.env.IDENTITY_API_URL}${pathString}`;
}

export const apiHandler = async (options, req, res) => {
  const { endpoint, requestMethod, allowedMethods } = options;
  if (checkRequestMethod(req, allowedMethods)) {
    const requestOptions = fetchOptions(requestMethod, req);
    const response = await fetch(endpoint, requestOptions);

    const result = await response.json();

    if (!response.ok) {
      return errorHandler(res, response.status, result?.title, result?.errors);
    }

    /* Set Authorization token */
    if (result?.token) {
      const cookie = serialize('auth_token', `${result.token}`, {
        httpOnly: true,
        path: '/',
      });
      res.setHeader('Set-Cookie', cookie);
    }

    return res.status(200).json(result); // TODO: need to wrap with global adapter
  }
  return errorHandler(res, 405, 'Method not allowed.');
};

export const postHandler = (path, req, res) => {
  return apiHandler(
    {
      endpoint: getApiURL(path),
      requestMethod: 'POST',
      allowedMethods: ['OPTIONS', 'POST'],
    },
    req,
    res
  );
};

export const getHandler = (path, provider, req, res) => {
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
  return apiHandler(
    {
      endpoint: apiURL,
      requestMethod: 'GET',
      allowedMethods: ['OPTIONS', 'GET'],
    },
    req,
    res
  );
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
