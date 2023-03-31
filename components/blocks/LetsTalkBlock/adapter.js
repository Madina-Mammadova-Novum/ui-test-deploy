import { linkAdapter } from '@/adapters/global';
import { imageAdapter } from '@/adapters/image';
import { getSingleType } from '@/services/singleType';

export const updateLetsTalkBlock = async (block) => {
  const response = await getSingleType('let-s-talk', 'en');
  if (response === null) return null;
  const { ctaSingleImage } = response;
  const { coverImage, button } = ctaSingleImage;
  ctaSingleImage.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;
  ctaSingleImage.button = button !== undefined ? linkAdapter(button) : null;
  return {
    ...block,
    ...ctaSingleImage,
  };
};
