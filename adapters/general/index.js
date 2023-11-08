import { isDocument } from '@/utils/helpers';

export function getGeneralDataAdapter({ data }) {
  return {
    countires: data.general.data.countries,
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

export const legalPropAdpater = ({ params }) => {
  const { slug } = params;
  let legal = false;
  if (slug?.length >= 2 && slug[0] === 'legal') {
    slug.splice(0, 1); // remove 'legal' from the array
    legal = true;
  }

  return { legal };
};
