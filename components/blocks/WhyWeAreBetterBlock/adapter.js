import delve from 'dlv';

import { getSingleType } from '@/services/singleType';
import { getValue } from '@/services/value';

export const updateWhyWeAreBetterBlock = async (block) => {
  const response = await getSingleType('why-we-are-better', 'en');
  const values = delve(response, 'data.values');
  if (!values) return null;
  const valuesData = await Promise.all(
    values
      .filter(({ value }) => {
        return delve(value, 'data.id');
      })
      .map(async ({ value }) => {
        const id = delve(value, 'data.id');
        const { data: valueData } = await getValue(id);
        return {
          ...valueData,
        };
      })
  ).then((valueItems) => valueItems.filter((item) => item !== null));
  return {
    ...block,
    values: valuesData,
  };
};
