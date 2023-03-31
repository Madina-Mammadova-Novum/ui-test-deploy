import { updateCTASingleImageBlock } from '@/blocks/CTASingleImageBlock/adapter';
import { getSingleType } from '@/services/singleType';

export const updateLetsTalkBlock = async (block) => {
  const response = await getSingleType('let-s-talk', 'en');
  if (response === null) return null;
  const { ctaSingleImage } = response;
  return {
    ...block,
    ...updateCTASingleImageBlock(ctaSingleImage),
  };
};
