import { isEmptyString } from '@/utils/helpers';

export function getGeneralDataAdapter({ data }) {
  return {
    countires: data.general.data.countries,
    ports: data.general.data.ports,
  };
}

export const searchParamsAdapter = ({ data }) => {
  if (!data) return null;

  return Object.keys(data).reduce((newObject, key) => {
    newObject[key] = isEmptyString(data[key]) ? true : data[key];
    return newObject;
  }, {});
};
