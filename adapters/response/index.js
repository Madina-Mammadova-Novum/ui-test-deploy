import { SYSTEM_ERROR } from '@/lib/constants';
import { isEmpty } from '@/utils/helpers';

export const responseAdapter = (data) => {
  if (data === undefined || data === null || data === '') return { data: null };
  if ('data' in data) {
    return data;
  }
  return { data };
};

const errorAdapter = (error) => {
  if (error === undefined || error === null || error === '') return [];
  if (typeof error === 'object' && error !== null) {
    const errors = Object.values(error);
    if (errors.length > 0) {
      return errors.reduce((acc, curr) => acc.concat(curr), []).filter((err) => err.length > 0);
    }
  }
  return [error];
};

export const responseErrorAdapter = (errors = []) => {
  if (isEmpty(errors)) return [SYSTEM_ERROR];

  if (Array.isArray(errors) && errors.length > 0) {
    return errors
      .filter((error) => error !== null)
      .map((error) => errorAdapter(error))
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((error) => error.length > 0);
  }
  // TODO: condition if errors are object
  return ['Error: as object'];
};
