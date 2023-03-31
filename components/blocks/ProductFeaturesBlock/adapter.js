// import { linkAdapter } from "@/adapters/global";
import { linkAdapter } from "@/adapters/global";
import { imageAdapter } from '@/adapters/image';

export const updateProductFeaturesBlock = (block) => {
  const { coverImage, ctaList } = block;
  block.ctaList = ctaList.map((ctaBlock) => {
    ctaBlock.cta = ctaBlock.cta.map((cta) => {
      cta.buttons = cta.buttons.length > 0 ? cta.buttons.map((button) => linkAdapter(button)) : [];
      return {
        ...cta,
      };
    });
    return {
      ...ctaBlock,
    };
  });
  block.coverImage = coverImage !== undefined ? imageAdapter(coverImage) : null;

  return block;
};
