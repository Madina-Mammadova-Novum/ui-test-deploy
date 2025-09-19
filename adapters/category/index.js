import { imageAdapter } from '@/adapters/image';

export const categoryAdapter = ({ data }) => {
  if (!data) return null;

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
