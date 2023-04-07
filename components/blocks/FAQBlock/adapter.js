import { getFAQs } from '@/services/faq';

export const updateFAQBlock = async (block) => {
  block.items = await getFAQs();
  block.categories = block.items
    .map(({ category }) => category)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });
  return block;
};
