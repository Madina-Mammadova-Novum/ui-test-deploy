import { BlocksTypes } from '@/lib/types';

import {
  BlockHeroImage,
  ContactUsBlock,
  CTABlock,
  CTASingleImageBlock,
  FAQBlock,
  HowItWorksBlock,
  ImageSliderBlock,
  ProductFeaturesBlock,
  SimpleContentBlock,
  TeamBlock,
  WhatWeOfferBlock,
} from '@/blocks';

const BLOCK_COMPONENTS = {
  'blocks.contact-us': ContactUsBlock,
  'blocks.cta': CTABlock,
  'blocks.cta-single-image': CTASingleImageBlock,
  'blocks.hero-image': BlockHeroImage,
  'blocks.simple-content': SimpleContentBlock,
  'blocks.single-what-we-offer': WhatWeOfferBlock,
  'blocks.image-slider': ImageSliderBlock,
  'blocks.team': TeamBlock,
  'blocks.single-how-it-works': HowItWorksBlock,
  'blocks.product-features': ProductFeaturesBlock,
  'blocks.lets-talk-block': CTASingleImageBlock,
  'blocks.faq-block': FAQBlock,
  'blocks.faq-by-category-block': FAQBlock,
};

const BlockManager = ({ blocks = null }) => {
  if (!blocks) return null;

  return blocks.map((block, idx) => {
    const Block = BLOCK_COMPONENTS[block.__component];
    if (!Block) return null;

    // eslint-disable-next-line react/no-array-index-key
    return <Block key={idx} {...block} />;
  });
};

BlockManager.propTypes = BlocksTypes;

export default BlockManager;
