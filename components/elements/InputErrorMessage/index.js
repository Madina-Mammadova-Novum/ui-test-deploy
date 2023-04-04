import React from 'react';

import PropTypes from 'prop-types';

const InputErrorMessage = ({ message }) => {
  return <p className="text-[12px] text-red">{message}</p>;
};

InputErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default InputErrorMessage;
