import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ button, customStyles, disabled, ...rest }) => {
  const { label, buttonOptions } = button;
  const { style } = buttonOptions;

  return (
    <button
      type="button"
      {...rest}
      className={classnames(
        'text-sm font-bold rounded whitespace-nowrap max-w-min',
        {
          'bg-primary text-white rounded-[5px] px-9 flex items-center h-[50px]  hover:bg-primary-darker active:bg-primary-darker':
            style === 'primary',
          'bg-white text-black h-[48px] px-9 flex items-center hover:text-primary active:text-primary':
            style === 'secondary',
          'text-xsm text-black': style === 'base',
          'text-xsm text-primary': style === 'link',
          'pointer-events-none': disabled,
        },
        customStyles
      )}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  customStyles: '',
  disabled: false,
};

Button.propTypes = {
  button: {
    label: PropTypes.string.isRequired,
    buttonOptions: PropTypes.shape({
      style: PropTypes.oneOf(['default', 'primary', 'secondary', 'link']),
    }),
  }.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
