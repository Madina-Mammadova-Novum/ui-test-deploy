import { categoryAdapter } from '@/adapters/category';
import { updateCTABlock } from '@/blocks/CTABlock/adapter';
import { getFAQs } from '@/services';

export const updateFAQByCategoryBlock = async (block) => {
  const { data: items } = await getFAQs();
  block.categories = items
    .map(({ category }) => category)
    .filter((obj, index, self) => {
      return index === self.findIndex((o) => o.id === obj.id);
    });
  block.category = categoryAdapter(block.category);
  block.items = items.filter(({ category }) => category.id === block.category.id);
  block.cta = updateCTABlock(block.cta);
  return block;
};
