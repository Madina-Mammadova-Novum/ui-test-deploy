import React from 'react';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { makeId } from '@/utils/helpers';

const BlockCta = dynamic(() => import('@/blocks/Cta'), {
  ssr: true,
});

const BlockHeroAnimatedWithTitle = dynamic(() => import('@/blocks/HeroAnimatedTitle'), {
  ssr: true,
});

const BlockValues = dynamic(() => import('@/blocks/ValuesSelected'), {
  ssr: true,
});

const BlockConcernsSelected = dynamic(() => import('@/blocks/ConcernsSelected'), {
  ssr: true,
});

const BlockCtaImages = dynamic(() => import('@/blocks/CtaImages'), {
  ssr: true,
});

const BlockTestimonials = dynamic(() => import('@/blocks/BlockTestimonials'), {
  ssr: true,
});

const BlockTeam = dynamic(() => import('@/blocks/BlockTeam'), {
  ssr: true,
});

const BlockFAQs = dynamic(() => import('@/blocks/BlockFAQs'), {
  ssr: true,
});

const BlockIngredients = dynamic(() => import('@/blocks/BlockIngredients'), {
  ssr: true,
});

const BlockCtaFeatured = dynamic(() => import('@/blocks/BlockCtaFeatured'), {
  ssr: true,
});

const BlockCtaJoinTeam = dynamic(() => import('@/blocks/BlockCtaJoinTeam'), {
  ssr: true,
});

const BlockHowItWorks = dynamic(() => import('@/blocks/BlockHowItWorks'), {
  ssr: true,
});

const BlockHeroImage = dynamic(() => import('@/blocks/BlockHeroImage'), {
  ssr: true,
});

const BlockCompanyHistory = dynamic(() => import('@/blocks/BlockCompanyHistory'), {
  ssr: true,
});

const BlockImprovements = dynamic(() => import('@/blocks/BlockImprovements'), {
  ssr: true,
});

const getBlockComponent = ({ __component, ...rest }) => {
  let Block;

  switch (__component) {
    case 'blocks.cta':
      Block = BlockCta;
      break;
    case 'blocks.single-how-it-works':
      Block = BlockHowItWorks;
      break;
    case 'blocks.single-why-we-are-better':
      Block = BlockValues;
      break;
    case 'blocks.improvement-process':
      Block = BlockImprovements;
      break;
    case 'blocks.cta-featured':
      Block = BlockCtaFeatured;
      break;
    case 'blocks.hero-animated-title':
      Block = BlockHeroAnimatedWithTitle;
      break;
    case 'blocks.concerns-selected':
      Block = BlockConcernsSelected;
      break;
    case 'blocks.cta-images':
      Block = BlockCtaImages;
      break;
    case 'blocks.testimonials':
      Block = BlockTestimonials;
      break;
    case 'blocks.team':
      Block = BlockTeam;
      break;
    case 'blocks.faq-questions':
      Block = BlockFAQs;
      break;
    case 'blocks.ingredients':
      Block = BlockIngredients;
      break;
    case 'blocks.cta-join-team':
      Block = BlockCtaJoinTeam;
      break;
    case 'blocks.hero-image':
      Block = BlockHeroImage;
      break;
    case 'blocks.company-history':
      Block = BlockCompanyHistory;
      break;
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
