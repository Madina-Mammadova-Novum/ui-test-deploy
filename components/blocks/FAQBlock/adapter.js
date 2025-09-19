import { getFAQs } from '@/services';

export const updateFAQBlock = async (block) => {
  const { data } = await getFAQs();
  block.items = data.length ? data : [];
  block.categories = block.items
    .map(({ category }) => category)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });
  return block;
};
