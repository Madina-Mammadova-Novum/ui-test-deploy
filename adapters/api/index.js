import { responseAdapter } from '../response';

export const apiSuccessAdapter = (status, data) => {
  return {
    status,
    error: null,
    ...responseAdapter(data),
  };
};

export const apiErrorAdapter = (status, statusText, message) => {
  return {
    status,
    data: null,
    error: {
      title: statusText,
      message,
    },
  };
};

export const apiOptionsAdapter = ({ requestMethod, body = null, path, options = null }) => {
  if (['POST', 'PATCH', 'PUT'].includes(requestMethod)) {
    return {
      method: requestMethod,
      url: path,
      data: body,
      ...options,
    };
  }

  return {
    method: requestMethod,
    url: path,
    ...options,
  };
};
