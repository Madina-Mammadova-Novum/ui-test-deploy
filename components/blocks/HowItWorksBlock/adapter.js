import { valuesAdapter } from '@/adapters/value';
import { getSingleType } from '@/services/singleType';

export const updateHowItWorksBlock = async (block) => {
  const response = await getSingleType('why-we-are-better', 'en');
  if (response === null) return null;
  const { title, shortDescription, subTitle, values } = response;
  block.title = title;
  block.shortDescription = shortDescription;
  block.subTitle = subTitle;
  block.values = valuesAdapter({ data: values });
  return block;
};
