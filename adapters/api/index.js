import { responseAdapter } from '../response';

import { formatErrors, lowerCaseFormat } from '@/utils/helpers';

export const successResponseAdapter = (response) => ({
  status: response.status,
  statusText: response.statusText,
  successResponse: response.data,
});

export const errorResponseAdapter = (error) => ({
  status: error.response.status,
  statusText: error.response.statusText,
  errorResponse: lowerCaseFormat(error.response.data),
});

export const apiSuccessAdapter = ({ status, statusText, successResponse }) => {
  return {
    status,
    statusText,
    error: null,
    ...responseAdapter(successResponse),
  };
};

export const apiErrorAdapter = ({ status, statusText, errorResponse }) => {
  return {
    status,
    data: null,
    error: {
      type: errorResponse?.type || errorResponse?.error?.type || null,
      traceid: errorResponse?.traceid || errorResponse?.error?.traceid || null,
      title: errorResponse?.title || errorResponse?.error?.title || statusText,
      message: formatErrors(errorResponse?.errors || errorResponse?.error?.errors),
      errors: errorResponse?.errors || errorResponse?.error?.errors || null,
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
