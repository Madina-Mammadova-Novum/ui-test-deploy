import React from 'react';

import PropTypes from 'prop-types';

import {
  // BlockCompanyHistory,
  BlockCta,
  BlockCtaSingleImage,
  // BlockCtaFeatured,
  // BlockCtaImages,
  // BlockFAQs,
  // BlockHeroAnimatedWithTitle,
  // BlockHeroImage,
  // BlockHowItWorks,
  // BlockImprovements,
  // BlockJoinTeam,
  // BlockPrivacyPolicy,
  // BlockTeam,
  // BlockTestimonials,
  // BlockValues
} from '@/blocks';
import { makeId } from '@/utils/helpers';

const getBlockComponent = ({ __component, ...rest }) => {
  let Block;
  switch (__component) {
    case 'blocks.cta':
      Block = BlockCta;
      break;
    case 'blocks.cta-single-image':
      Block = BlockCtaSingleImage;
      break;
    // case 'blocks.single-how-it-works':
    //   Block = BlockHowItWorks;
    //   break;
    // case 'blocks.single-why-we-are-better':
    //   Block = BlockValues;
    //   break;
    // case 'blocks.improvement-process':
    //   Block = BlockImprovements;
    //   break;
    // case 'blocks.cta-featured':
    //   Block = BlockCtaFeatured;
    //   break;
    // case 'blocks.hero-animated-title':
    //   Block = BlockHeroAnimatedWithTitle;
    //   break;
    // case 'blocks.cta-images':
    //   Block = BlockCtaImages;
    //   break;
    // case 'blocks.testimonials':
    //   Block = BlockTestimonials;
    //   break;
    // case 'blocks.team':
    //   Block = BlockTeam;
    //   break;
    // case 'blocks.faq-questions':
    //   Block = BlockFAQs;
    //   break;
    // case 'blocks.cta-join-team':
    //   Block = BlockJoinTeam;
    //   break;
    // case 'blocks.hero-image':
    //   Block = BlockHeroImage;
    //   break;
    // case 'blocks.company-history':
    //   Block = BlockCompanyHistory;
    //   break;
    // case 'blocks.privacy-policy':
    //   Block = BlockPrivacyPolicy;
    //   break;
    default:
      return null;
  }

  return Block ? <Block key={makeId()} {...rest} /> : null;
};

const BlockManager = ({ blocks }) => {
  return blocks.map(getBlockComponent);
};

BlockManager.defaultProps = {
  blocks: null,
};

BlockManager.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      __component: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
      subTitle: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
      shortDescription: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
    })
  ),
};

export default BlockManager;
