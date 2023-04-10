import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { buttonSizesPropTypes, buttonVariantsPropTypes } from '@/lib/types';

import { IconWrapper } from '@/units';
import { getButtonClassNames } from '@/utils/helpers';

const Button = ({
  buttonProps: { icon = {}, iconContainerStyles, helperText, text, variant, size },
  customStyles,
  disabled,
  type,
  onClick,
  ...rest
}) => {
  const { before, after } = icon;
  const buttonClassNames = getButtonClassNames(variant, size);
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className={classnames(
          'px-3.5 py-2.5 rounded-md flex items-center justify-center',
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
        {before && <IconWrapper iconData={{ className: iconContainerStyles, icon: before }} />}
        <span className="px-1.5 text-inherit">{text && text}</span>
        {after && <IconWrapper iconData={{ className: iconContainerStyles, icon: after }} />}
      </button>
      {helperText && <span className="text-gray text-xs-sm font-normal">{helperText}</span>}
    </div>
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
    helperText: PropTypes.string,
    iconContainerStyles: PropTypes.string,
    icon: {
      before: PropTypes.node,
      after: PropTypes.node,
    },
    variant: buttonVariantsPropTypes.isRequired,
    size: buttonSizesPropTypes.isRequired,
  }.isRequired,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
