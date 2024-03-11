import { updateBlockHeroImage } from '@/blocks/BlockHeroImage/adapter';
import { updateContactUsBlock } from '@/blocks/ContactUsBlock/adapter';
import { updateCTABlock } from '@/blocks/CTABlock/adapter';
import { updateCTASingleImageBlock } from '@/blocks/CTASingleImageBlock/adapter';
import { updateFAQBlock } from '@/blocks/FAQBlock/adapter';
import { updateFAQByCategoryBlock } from '@/blocks/FAQByCategoryBlock/adapter';
import { updateImageSliderBlock } from '@/blocks/ImageSliderBlock/adapter';
import { updateLetsTalkBlock } from '@/blocks/LetsTalkBlock/adapter';
import { updateProductFeaturesBlock } from '@/blocks/ProductFeaturesBlock/adapter';
import { updateTeamBlock } from '@/blocks/TeamBlock/adapter';
import { updateWhatWeOfferBlock } from '@/blocks/WhatWeOfferBlock/adapter';
import { updateWhyWeAreBetterBlock } from '@/blocks/WhyWeAreBetterBlock/adapter';

export const blocksDataAdapter = async (blocks) => {
  if (!blocks || blocks.length === 0) {
    return [];
  }

  const updatedBlocks = await Promise.all(
    blocks.map(async (block) => {
      switch (block.__component) {
        case 'blocks.cta':
          return updateCTABlock(block);
        case 'blocks.contact-us':
          return updateContactUsBlock(block);
        case 'blocks.cta-single-image':
          return updateCTASingleImageBlock(block);
        case 'blocks.hero-image':
          return updateBlockHeroImage(block);
        case 'blocks.image-slider':
          return updateImageSliderBlock(block);
        case 'blocks.single-why-we-are-better':
          return updateWhyWeAreBetterBlock(block);
        case 'blocks.single-what-we-offer':
          return updateWhatWeOfferBlock(block);
        case 'blocks.product-features':
          return updateProductFeaturesBlock(block);
        case 'blocks.team':
          return updateTeamBlock(block);
        case 'blocks.lets-talk-block':
          return updateLetsTalkBlock(block);
        case 'blocks.faq-block':
          return updateFAQBlock(block);
        case 'blocks.faq-by-category-block':
          return updateFAQByCategoryBlock(block);
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
