import { serialize } from 'cookie';

export const errorHandler = (res, status, message) => {
  const statusMessage = message === undefined || message === null ? 'Something went wrong' : message;
  return res.status(status).send({
    message: statusMessage,
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

export const postData = async (url, req, data = {}) => {
  const response = await fetch(url, {
    ...fetchOptions(req),
    method: 'POST',
    body: data, // body data type must match "Content-Type" header
  });
  return response;
};

export const patchData = async (url, req, data = {}) => {
  const response = await fetch(url, {
    ...fetchOptions(req),
    method: 'PATCH',
    body: data, // body data type must match "Content-Type" header
  });
  return response;
};

export const deleteData = async (url, req, data = {}) => {
  const response = await fetch(url, {
    ...fetchOptions(req),
    method: 'DELETE',
    body: data, // body data type must match "Content-Type" header
  });
  return response;
};

export const getData = async (url, req) => {
  const response = await fetch(url, {
    ...fetchOptions(req),
    method: 'GET',
  });
  return response;
};

const fetchOptions = (req) => {
  const authToken = getCookieFromReq(req, 'auth_token');
  const token = `Bearer ${authToken}`;

  return {
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken ? token : '',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
};

export function getApiURL(path, apiVersion = 'v1') {
  return `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${apiVersion}/${path}`;
}

export const apiHandler = async (options, req, res) => {
  const { requestMethod, allowedMethods, endpoint } = options;
  if (checkRequestMethod(req, allowedMethods)) {
    try {
      let response;
      switch (requestMethod.toLowerCase()) {
        case 'post': {
          response = await postData(endpoint, req, req.body);
          break;
        }
        case 'patch': {
          response = await patchData(endpoint, req, req.body);
          break;
        }
        case 'delete': {
          response = await deleteData(endpoint, req, req.body);
          break;
        }
        default: {
          response = await getData(endpoint, req);
        }
      }

      const result = await response.json();

      if (!response.ok) {
        return errorHandler(res, response.status, result?.message);
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
    } catch (error) {
      console.log({ error });
      return errorHandler(res, 500, 'something_wrong');
    }
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

export const getHandler = (path, req, res) => {
  return apiHandler(
    {
      endpoint: getApiURL(path),
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
