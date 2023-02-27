import React from 'react';

import PropTypes from 'prop-types';

const StepWrapper = ({ title, number, children }) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-blue text-xs-sm font-semibold uppercase">
        Step #{number}: {title}
      </span>
      {children}
    </div>
  );
};

StepWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StepWrapper;
