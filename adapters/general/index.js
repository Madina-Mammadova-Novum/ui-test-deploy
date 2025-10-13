import { isDocument } from '@/utils/helpers';

export const searchParamsAdapter = ({ data }) => {
  if (!data) return null;

  return Object.keys(data).reduce((newObject, key) => {
    newObject[key] = isDocument(data[key]) ? 'document' : data[key];
    return newObject;
  }, {});
};
