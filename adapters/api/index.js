import { responseAdapter } from '../response';

import { formatErrors } from '@/utils/helpers';

export const apiSuccessAdapter = ({ status, successResponse }) => {
  return {
    status,
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
      traceId: errorResponse?.traceId || errorResponse?.error?.traceId || null,
      title: errorResponse?.title || errorResponse?.error?.title || 'Bad request',
      message: formatErrors(errorResponse?.errors || errorResponse?.error?.errors) || statusText,
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
