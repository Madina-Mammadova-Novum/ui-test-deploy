import { categoryAdapter } from '@/adapters/category';
import { getFAQs } from '@/services/faq';

export const updateFAQByCategoryBlock = async (block) => {
  block.category = categoryAdapter(block.category);
  block.items = await getFAQs().then((items) => {
    return items.filter(({ category }) => category.id === block.category.id);
  });
  return block;
};
