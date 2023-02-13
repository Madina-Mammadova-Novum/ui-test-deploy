import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ buttonProps, customStyles, disabled, ...rest }) => {
  const { icon, text, variant } = buttonProps;

  return (
    <button
      type="button"
      className={classnames(
        'px-5 py-2.5 rounded-md flex items-center',
        {
          'bg-blue text-white hover:bg-blue-darker ': variant === 'primary-l',
          'bg-black text-white hover:bg-blue-dark': variant === 'secondary-l',
          'bg-white text-black border border-grey hover:border-black': variant === 'tertiary-l',
          'bg-white text-red border border-red-medium hover:border-red': variant === 'delete-l',
          'bg-white px-2.5 py-1 text-blue border border-blue hover:border-blue-darker ': variant === 'primary-m',
          'bg-white px-2.5 py-1 text-black border border-grey hover:border-black ': variant === 'secondary-m',
          'bg-white px-2.5 py-1 text-red border border-red-medium hover:border-red ': variant === 'delete-m',
          'bg-white !p-0 text-blue hover:text-blue-darker': variant === 'primary-s',
          'opacity-50 pointer-events-none': disabled,
        },
        customStyles
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {text && text}
    </button>
  );
};

Button.defaultProps = {
  customStyles: '',
  disabled: false,
};

Button.propTypes = {
  buttonProps: {
    text: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.string,
  }.isRequired,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
