import React from 'react';

import PropTypes from 'prop-types';

import {
  BlockHeroImage,
  CTABlock,
  CTASingleImageBlock,
  ImageSliderBlock,
  SimpleContentBlock,
  TeamBlock,
  WhatWeOfferBlock,
  HowItWorksBlock } from '@/blocks';
import { makeId } from '@/utils/helpers';

const BLOCK_COMPONENTS = {
  'blocks.cta': CTABlock,
  'blocks.cta-single-image': CTASingleImageBlock,
  'blocks.hero-image': BlockHeroImage,
  'blocks.simple-content': SimpleContentBlock,
  'blocks.single-what-we-offer': WhatWeOfferBlock,
  'blocks.image-slider': ImageSliderBlock,
  'blocks.team': TeamBlock,
  'blocks.single-how-it-works': HowItWorksBlock,
};

const BlockManager = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map((block) => {
    const Block = BLOCK_COMPONENTS[block.__component];
    if (!Block) return null;

    return <Block key={makeId()} {...block} />;
  });
};

BlockManager.defaultProps = {
  blocks: null,
};

BlockManager.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      __component: PropTypes.string.isRequired,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      shortDescription: PropTypes.string,
    })
  ),
};

export default BlockManager;
