import React from 'react';

import PropTypes from 'prop-types';

const Divider = ({ className }) => {
  return <hr className={`${className} `} />;
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
