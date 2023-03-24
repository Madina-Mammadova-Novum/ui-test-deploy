import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { buttonSizesPropTypes, buttonVariantsPropTypes } from '@/lib/types';

import { getButtonClassNames } from '@/utils/helpers';

const Button = ({ buttonProps: { icon, text, variant, size }, customStyles, disabled, type, onClick, ...rest }) => {
  const buttonClassNames = getButtonClassNames(variant, size);
  return (
    <button
      className={classnames(
        'px-5 py-2.5 rounded-md flex items-center justify-center',
        buttonClassNames,
        disabled && 'opacity-50 pointer-events-none',
        customStyles
      )}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      {...rest}
    >
      {/* todo: need to change to children like in LinkAsButton component */}
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
    variant: buttonVariantsPropTypes.isRequired,
    size: buttonSizesPropTypes.isRequired,
  }.isRequired,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
