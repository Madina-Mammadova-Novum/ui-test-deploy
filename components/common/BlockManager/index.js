'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { BlocksTypes } from '@/lib/types';

import {
  BlockHeroImage,
  CTABlock,
  CtaImages,
  CTASingleImageBlock,
  HomeSearchBlock,
  ImageSliderBlock,
  ProductFeaturesBlock,
  SimpleContentBlock,
  TeamBlock,
  WhatWeOfferBlock,
  WhyWeAreBetterBlock,
} from '@/blocks';

// Dynamic imports with no SSR for components that have client-side dependencies
const ContactUsBlock = dynamic(() => import('@/blocks/ContactUsBlock'), {
  ssr: false,
});

const FAQBlock = dynamic(() => import('@/blocks/FAQBlock'), {
  ssr: false,
});

const BLOCK_COMPONENTS = {
  'blocks.contact-us': ContactUsBlock,
  'blocks.cta': CTABlock,
  'blocks.cta-single-image': CTASingleImageBlock,
  'blocks.hero-image': BlockHeroImage,
  'blocks.search-block': HomeSearchBlock,
  'blocks.simple-content': SimpleContentBlock,
  'blocks.single-what-we-offer': WhatWeOfferBlock,
  'blocks.image-slider': ImageSliderBlock,
  'blocks.team': TeamBlock,
  'blocks.single-why-we-are-better': WhyWeAreBetterBlock,
  'blocks.product-features': ProductFeaturesBlock,
  'blocks.lets-talk-block': CTASingleImageBlock,
  'blocks.faq-block': FAQBlock,
  'blocks.faq-by-category-block': FAQBlock,
  'blocks.cta-images': CtaImages,
};

const BlockManager = ({ blocks = null }) => {
  if (!blocks) return null;

  // Check if beta mode is enabled and the environment is production
  const betaMode = process.env.NEXT_PUBLIC_BETA_MODE === 'true' && process.env.APP_ENV === 'prod';

  return blocks.map((block, idx) => {
    const Block = BLOCK_COMPONENTS[block.__component];
    if (!Block) return null;

    // Skip HomeSearchBlock if in beta mode
    if (betaMode && block.__component === 'blocks.search-block') {
      return null;
    }

    // eslint-disable-next-line react/no-array-index-key
    return <Block key={idx} {...block} />;
  });
};

BlockManager.propTypes = BlocksTypes;

export default BlockManager;
