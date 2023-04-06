import { categoryAdapter } from '@/adapters/category';
import { getFAQs } from '@/services/faq';

export const updateFAQByCategoryBlock = async (block) => {
  const items = await getFAQs();
  block.categories = items
    .map(({ category }) => category)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });
  block.category = categoryAdapter(block.category);
  block.items = items.filter(({ category }) => category.id === block.category.id);
  return block;
};
