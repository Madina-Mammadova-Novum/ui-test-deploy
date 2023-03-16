import { responseAdapter, responseErrorAdapter } from '@/adapters/response';

export function getApiPublicURL(path) {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`;
}

// eslint-disable-next-line consistent-return
export function fetchOptions(requestMethod, data = null) {
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
    options.body = JSON.stringify(data);
  }
  return options;
}

export async function apiHandler(options) {
  const { url, requestMethod, data } = options;
  try {
    const requestOptions = fetchOptions(requestMethod, data);
    const response = await fetch(url, requestOptions);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    const result = await response.json();
    // Recommendation: handle errors

    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      return responseErrorAdapter(result);
    }
    return responseAdapter(result);
  } catch (error) {
    return responseErrorAdapter({
      message: error?.message,
      errors: error,
    });
  }
}

export function getData(path) {
  return apiHandler({
    url: getApiPublicURL(path),
    requestMethod: 'GET',
  });
}

export function postData(path, data) {
  return apiHandler({
    url: getApiPublicURL(path),
    requestMethod: 'POST',
    data,
  });
}
