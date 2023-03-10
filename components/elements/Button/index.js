import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ buttonProps, customStyles, disabled, type, onClick, ...rest }) => {
  const { icon, text, variant, size } = buttonProps;

  return (
    <button
      className={classnames(
        'px-5 py-2.5 rounded-md flex items-center justify-center',
        {
          'bg-blue text-white hover:bg-blue-darker ': variant === 'primary' && size === 'large',
          'bg-black text-white hover:bg-blue-dark': variant === 'secondary' && size === 'large',
          'bg-white text-black border border-grey hover:border-black': variant === 'tertiary' && size === 'large',
          'bg-white text-red border border-red-medium hover:border-red': variant === 'delete' && size === 'large',
          'bg-white px-2.5 py-1 text-blue border border-blue hover:border-blue-darker ':
            variant === 'primary' && size === 'medium',
          'bg-white px-2.5 py-1 text-black border border-grey hover:border-black ':
            variant === 'secondary' && size === 'medium',
          'bg-white px-2.5 py-1 text-red border border-red-medium hover:border-red ':
            variant === 'delete' && size === 'medium',
          'text-red': variant === 'delete' && size === 'small',
          'bg-white !p-0 text-blue hover:text-blue-darker': variant === 'primary' && size === 'small',
          'opacity-50 pointer-events-none': disabled,
        },
        customStyles
      )}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
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
  type: 'button',
  onClick: () => {},
};

Button.propTypes = {
  buttonProps: {
    text: PropTypes.string,
    icon: PropTypes.node,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'delete']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
  }.isRequired,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
