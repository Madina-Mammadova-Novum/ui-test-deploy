import { valueAdapter } from '@/adapters/value';
import { getSingleType } from '@/services/singleType';
import { getValue } from '@/services/value';

export const updateWhatWeOfferBlock = async (block) => {
  const response = await getSingleType('what-we-offer', 'en');
  if (response === null) return null;
  const { title, values } = response;

  const valuesData = await Promise.all(
    values.filter(({ value }) => value.data !== null).map(({ value }) => getValue(valueAdapter(value).id))
  ).then((valueItems) => valueItems.filter((item) => item !== null));
  return {
    ...block,
    title,
    values: valuesData,
  };
};
