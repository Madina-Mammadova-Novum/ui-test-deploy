import { updateBlockHeroImage } from '@/blocks/BlockHeroImage/adapter';
import { updateCTABlock } from '@/blocks/CTABlock/adapter';
import { updateCTASingleImageBlock } from '@/blocks/CTASingleImageBlock/adapter';
import { updateImageSliderBlock } from '@/blocks/ImageSliderBlock/adapter';
import { updateHowItWorksBlock } from '@/blocks/HowItWorksBlock/adapter';

export const blocksDataAdapter = async (blocks) => {
  if (!blocks || blocks.length === 0) {
    return [];
  }

  const updatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      switch (block.__component) {
        case 'blocks.cta':
          return updateCTABlock(block);
        case 'blocks.cta-single-image':
          return updateCTASingleImageBlock(block);
        case 'blocks.hero-image':
          return updateBlockHeroImage(block);
        case 'blocks.image-slider':
          return updateImageSliderBlock(block);
        case 'blocks.single-how-it-works':
          return updateHowItWorksBlock(block);
        default:
          return block;
      }
    })
  );

  const filteredBlocks = updatedBlocks.filter((block) => block !== null);

  const mappedBlocks = filteredBlocks.map((block) => {
    const { id, title, shortDescription, subTitle, __component } = block;
    return {
      ...block,
      id,
      title: title !== undefined ? title : null,
      shortDescription: shortDescription !== undefined ? shortDescription : null,
      subTitle: subTitle !== undefined ? subTitle : null,
      __component,
    };
  });

  return mappedBlocks;
};
