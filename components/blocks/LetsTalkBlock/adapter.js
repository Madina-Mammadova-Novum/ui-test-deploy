import { getSingleType } from '@/services/singleType';

export const updateLetsTalkBlock = async (block) => {
  const response = await getSingleType('let-s-talk', 'en');
  if (response === null) return null;
  const { ctaSingleImage } = response;
  console.log({ ctaSingleImage });
  return {
    ...block,
    ctaSingleImage,
  };
};
