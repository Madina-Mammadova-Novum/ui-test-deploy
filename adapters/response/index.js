import { SYSTEM_ERROR } from '@/lib/constants';
import { isEmpty } from '@/utils/helpers';

export const responseAdapter = (data) => {
  if (!data) {
    return { data: {} };
  }
  if ('data' in data) {
    return {
      data: data.data,
    };
  }
  return { data };
};

const errorAdapter = (error) => {
  let errorMessage = '';

  Object.values(error).forEach((errorArray) => {
    errorArray.forEach((msg) => {
      errorMessage = `${msg + errorMessage}`;
    });
  });

  if (errorMessage.charAt(errorMessage.length - 1) === ' ') {
    errorMessage = errorMessage.slice(0, -1);
  }

  return errorMessage;
};

export const responseErrorAdapter = (errors = []) => {
  if (isEmpty(errors)) return SYSTEM_ERROR;

  if (Array.isArray(errors)) {
    const error = errors.map((err) => errorAdapter(err));
    return error;
  }
  // TODO: condition if errors are object
  return ['Error: as object'];
};
