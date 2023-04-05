import { getFAQs } from '@/services/faq';

export const updateFAQBlock = async (block) => {
  block.items = await getFAQs();
  return block;
};
