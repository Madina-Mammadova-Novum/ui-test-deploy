import { valueAdapter } from '@/adapters/value';
import { getSingleType } from '@/services/singleType';

export const updateHowItWorksBlock = async (block) => {
  const response = await getSingleType('why-we-are-better', 'en');
  if (response === null) return null;
  const { title, shortDescription, subTitle, values } = response;

  block.values = values.map(({ value }) => {
    return valueAdapter(value);
  });

  return {
    ...block,
    title,
    shortDescription,
    subTitle,
  };
};
