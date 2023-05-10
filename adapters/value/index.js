import { categoryAdapter } from '@/adapters/category';
import { imageAdapter } from '@/adapters/image';

export const valueAdapter = ({ data }) => {
  if (!data) return null;
  const { id, title, subTitle, shortDescription, coverImage, valueType } = data;
  return {
    id,
    title,
    subTitle,
    shortDescription,
    coverImage: coverImage ? imageAdapter(coverImage) : null,
    valueType: valueType ? categoryAdapter(valueType) : null,
  };
};

export const valuesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((value) => {
    return valueAdapter({ data: value });
  });
};
