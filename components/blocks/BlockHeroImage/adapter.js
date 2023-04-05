import { imageAdapter } from '@/adapters/image';

export const updateBlockHeroImage = (block) => {
  const { coverImage } = block;
  block.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;
  return block;
};
