import delve from 'dlv';

import { updateCTASingleImageBlock } from '@/blocks/CTASingleImageBlock/adapter';
import { getSingleType } from '@/services/singleType';

export const updateLetsTalkBlock = async (block) => {
  const response = await getSingleType('let-s-talk', 'en');
  const ctaSingleImage = delve(response, 'data.ctaSingleImage');
  if (ctaSingleImage === null) return null;
  return {
    ...block,
    ...updateCTASingleImageBlock(ctaSingleImage),
  };
};
