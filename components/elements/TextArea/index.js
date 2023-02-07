import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const {
    id,
    variant = 'primary',
    type = 'text',
    rows,
    customStyles,
    label,
    labelVisible = true,
    icon,
    isError,
    errorMessage,
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
        <textarea
          id={id}
          className={classnames(
            'h-[106px] px-3 py-[9px] w-full',
            {
              'text-black rounded-[10px] border placeholder-secondary border-secondary-light outline-none caret-primary focus:border-primary':
                variant === 'primary',
              'opacity-50': disabled,
              'border-error bg-error-light placeholder-error-dark': isError,
            },
            customStyles
          )}
          type={type}
          rows={rows}
          disabled={disabled}
          {...rest}
        />
        {icon && <span className="absolute top-1/2 -translate-y-1/2 right-3">{icon}</span>}
      </div>
      {isError && <span className="text-xsm mt-1 text-error">{errorMessage}</span>}
    </div>
  );
};

TextArea.defaultProps = {
  variant: 'primary',
  type: 'text',
  rows: 3,
  customStyles: '',
  label: '',
  labelVisible: true,
  icon: null,
  isError: false,
  errorMessage: '',
  disabled: false,
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary']),
  type: PropTypes.string,
  rows: PropTypes.number,
  customStyles: PropTypes.string,
  label: PropTypes.string,
  labelVisible: PropTypes.bool,
  icon: PropTypes.node,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextArea;
