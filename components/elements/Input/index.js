import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    id,
    variant = 'primary',
    type = 'text',
    customStyles,
    label,
    labelVisible = true,
    icon,
    isError,
    errorMessage,
    placeholder,
    disabled,
    ...rest
  } = props;

  return (
    <div className="flex flex-1 flex-col">
      <label
        htmlFor={id}
        className={classnames('text-secondary-darker text-xsm mb-1 inline-block', {
          'opacity-50': disabled,
          'sr-only': !labelVisible,
        })}
      >
        {label}
      </label>
      <div className="relative flex flex-1">
        <input
          className={classnames(
            'h-[42px] px-3 w-full',
            {
              'text-black rounded-[10px] border placeholder-secondary border-secondary-light outline-none caret-primary focus:border-primary':
                variant === 'primary',
              'opacity-50': disabled,
              'border-error bg-error-light placeholder-error-dark': isError,
            },
            customStyles
          )}
          type={type}
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
        {icon && <span className="absolute top-1/2 -translate-y-1/2 right-3">{icon}</span>}
      </div>
      {isError && <span className="text-xsm mt-1 text-error">{errorMessage}</span>}
    </div>
  );
};

Input.defaultProps = {
  variant: 'primary',
  type: 'text',
  customStyles: '',
  label: '',
  labelVisible: true,
  icon: null,
  isError: false,
  errorMessage: '',
  placeholder: '',
  disabled: false,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary']),
  type: PropTypes.string,
  customStyles: PropTypes.string,
  label: PropTypes.string,
  labelVisible: PropTypes.bool,
  icon: PropTypes.node,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
