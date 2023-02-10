import PropTypes from 'prop-types';

import { makeId } from '@/utils/helpers';

const getBlockComponent = ({ __component, ...rest }) => {
  let Block;

  switch (__component) {
    case 'map':
      Block = () => <p>Map</p>;
      break;
    case 'form':
      Block = () => <p>Form</p>;
      break;
    default:
      return null;
  }

  return Block ? <Block key={makeId()} {...rest} /> : null;
};

const BlockManager = ({ blocks = null }) => {
  return blocks.map(getBlockComponent);
};

BlockManager.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      __component: PropTypes.string.isRequired,
    })
  ),
};

export default BlockManager;
