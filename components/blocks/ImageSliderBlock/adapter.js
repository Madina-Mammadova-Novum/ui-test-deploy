import { imagesAdapter } from '@/adapters/image';

export const updateImageSliderBlock = (block) => {
  const { gallery } = block;
  block.gallery = imagesAdapter(gallery);
  return block;
};
