import { linkAdapter } from '@/adapters/global';
import { imageAdapter } from '@/adapters/image';

export const updateCTASingleImageBlock = (block) => {
  if (!block) return null;
  const { coverImage, button } = block;
  block.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;
  block.button = button !== undefined ? linkAdapter(button) : null;
  return block;
};
