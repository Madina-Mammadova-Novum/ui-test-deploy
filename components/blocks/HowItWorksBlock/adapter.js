import { getSingleType } from '@/services/singleType';
import { getValue } from '@/services/value';

export const updateHowItWorksBlock = async (block) => {
  const response = await getSingleType('why-we-are-better', 'en');
  if (response === null) return null;
  const { title, shortDescription, subTitle, values } = response;

  const valuesData = await Promise.all(values.map((value) => getValue(value.id))).then((valueItems) => valueItems);

  return {
    ...block,
    title,
    shortDescription,
    subTitle,
    values: valuesData,
  };
};
