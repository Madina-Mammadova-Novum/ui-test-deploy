import PropTypes from 'prop-types';

import DoubleArrowSVG from '@/assets/images/doubleArrow.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onExpandClick, onCollapseClick }) => {
  return (
    <div className="flex">
      <button
        type="button"
        className="flex gap-x-2.5 text-blue text-xsm pr-5 border-r border-gray-darker"
        onClick={onExpandClick}
      >
        <DoubleArrowSVG />
        <Button buttonProps={{ text: 'Expand all groups', variant: 'primary', size: 'small' }} />
      </button>
      <button type="button" className="flex gap-x-2.5 text-xsm pl-4" onClick={onCollapseClick}>
        <DoubleArrowSVG />
        <Button buttonProps={{ text: 'Collapse all groups', variant: 'primary', size: 'small' }} />
      </button>
    </div>
  );
};

ToggleRows.defaultProps = {
  onExpandClick: () => {},
  onCollapseClick: () => {},
};

ToggleRows.propTypes = {
  onExpandClick: PropTypes.func,
  onCollapseClick: PropTypes.func,
};

export default ToggleRows;
