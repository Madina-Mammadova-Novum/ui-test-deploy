import React from 'react';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { makeId } from '@/utils/helpers';

const BlockCta = dynamic(() => import('@/blocks/Cta'), {
  ssr: true,
});

const getBlockComponent = ({ __component, ...rest }) => {
  let Block;

  switch (__component) {
    case 'blocks.cta':
      Block = BlockCta;
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
