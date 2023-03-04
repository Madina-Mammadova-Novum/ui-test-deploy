import { categoryAdapter } from '@/adapters/category';
import { imageAdapter } from '@/adapters/image';

export const valueAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, subTitle, shortDescription, coverImage, valueType } = attributes;

  return {
    id,
    title,
    subTitle,
    shortDescription,
    coverImage: imageAdapter(coverImage),
    valueType: categoryAdapter(valueType),
  };
};

export const valuesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((value) => {
    return valueAdapter({ data: value });
  });
};
