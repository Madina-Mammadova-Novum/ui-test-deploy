'use client';

import PropTypes from 'prop-types';

import DoubleArrowSVG from '@/assets/images/doubleArrow.svg';
import { Button } from '@/elements';

const ToggleRows = ({ onExpandClick, onCollapseClick }) => {
  return (
    <div className="flex">
      <div
        aria-hidden
        type="button"
        className="flex gap-x-2.5 text-blue text-xsm pr-5 border-r border-gray-darker items-center"
        onClick={onExpandClick}
      >
        <DoubleArrowSVG className="rotate-180" />
        <Button buttonProps={{ text: 'Expand all groups', variant: 'primary', size: 'small' }} />
      </div>
      <div aria-hidden type="button" className="flex gap-x-2.5 text-xsm pl-4 items-center" onClick={onCollapseClick}>
        <DoubleArrowSVG />
        <Button buttonProps={{ text: 'Collapse all groups', variant: 'primary', size: 'small' }} />
      </div>
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
