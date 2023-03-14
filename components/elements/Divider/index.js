import React from 'react';

import PropTypes from 'prop-types';

const Divider = ({ className }) => {
  return <hr className={`${className} h-px bg-gray-darker`} />;
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
