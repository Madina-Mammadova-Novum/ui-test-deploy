import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const FilterLabel = ({ label, onClick, isActive, isDisabled }) => {
  if (!label) return null;
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={classnames(
        'flex items-center text-black px-7 py-[10px] border border-gray font-bold rounded-[48px] whitespace-nowrap',
        {
          'hover:text-primary hover:border-primary': !isActive && !isDisabled,
          'bg-black !text-white': isActive,
          'opacity-40 cursor-not-allowed': isDisabled,
        }
      )}
    >
      {label}
    </button>
  );
};

FilterLabel.defaultProps = {
  isActive: false,
  isDisabled: false,
  onClick: () => {},
};

FilterLabel.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default FilterLabel;
