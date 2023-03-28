import { imageAdapter } from '@/adapters/image';

export const updateImageSliderBlock = (block) => {
  const { items } = block;
  block.items = items.map((item) => {
    return {
      ...item,
      coverImage: imageAdapter(item.coverImage),
    };
  });
  return block;
};
