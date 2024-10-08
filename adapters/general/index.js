import { isDocument } from '@/utils/helpers';

export function getGeneralDataAdapter({ data }) {
  return {
    countries: data.general.data.countries,
    ports: data.general.data.ports,
  };
}

export const searchParamsAdapter = ({ data }) => {
  if (!data) return null;

  return Object.keys(data).reduce((newObject, key) => {
    newObject[key] = isDocument(data[key]) ? 'document' : data[key];
    return newObject;
  }, {});
};
