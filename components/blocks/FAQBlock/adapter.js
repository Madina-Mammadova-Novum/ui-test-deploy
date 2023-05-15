import { getFAQs } from '@/services/faq';

export const updateFAQBlock = async (block) => {
  const a = await getFAQs();
  // todo:need to be checked
  console.log({ a });

  block.items = [];
  block.categories = block.items
    .map(({ category }) => category)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });
  return block;
};
