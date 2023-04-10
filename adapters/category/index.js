import { imageAdapter } from '@/adapters/image';

export const categoryAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { title, slug, content, shortDescription, coverImage } = attributes;

  return {
    id,
    title,
    slug,
    content,
    shortDescription,
    coverImage: coverImage ? imageAdapter(coverImage) : null,
  };
};

export const categoriesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((category) => {
    return categoryAdapter({ data: category });
  });
};
