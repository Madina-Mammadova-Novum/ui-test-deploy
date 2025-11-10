import { responseAdapter } from '../response';

import { lowerCaseFormat } from '@/utils/helpers';
import { ERROR_MESSAGE } from '@/lib/constants';

export const successResponseAdapter = (response) => ({
  status: response?.status,
  statusText: response?.statusText,
  successResponse: response?.data,
});

export const errorResponseAdapter = (error) => {
  return {
    status: error?.response?.status || error?.status || 500,
    statusText: error?.response?.statusText || error?.statusText || 'Internal Server Error',
    errorResponse: lowerCaseFormat(error.response?.data),
  };
};

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
      message: errorResponse?.detail || errorResponse?.error?.detail || ERROR_MESSAGE,
      errors: errorResponse?.errors || errorResponse?.error?.errors || null,
    },
  };
};

export const apiOptionsAdapter = ({ requestMethod, body = null, path, options = null, responseType = null }) => {
  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(requestMethod)) {
    return {
      method: requestMethod,
      url: path,
      data: body,
      headers: {
        Accept: responseType === 'pdf' ? 'application/pdf' : '*/*',
        ...(options?.headers || {}),
      },
      ...options,
      ...(responseType === 'pdf' && { responseType: 'blob' }),
    };
  }

  return {
    method: requestMethod,
    url: path,
    data: null,
    headers: {
      Accept: responseType === 'pdf' ? 'application/pdf' : '*/*',
      ...(options?.headers || {}),
    },
    ...options,
    ...(responseType === 'pdf' && { responseType: 'blob' }),
  };
};
