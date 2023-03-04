import { categoryAdapter } from '@/adapters/category';
import { imageAdapter } from '@/adapters/image';

export const teamMemberAdapter = ({ data }) => {
  if (data === null) return null;
  const { id, attributes } = data;
  const { fullName, category, description, position, coverImage } = attributes;

  return {
    id,
    fullName,
    category: categoryAdapter(category),
    description,
    position,
    coverImage: imageAdapter(coverImage),
  };
};

export const teamMembersAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((member) => {
    return teamMemberAdapter({ data: member });
  });
};
