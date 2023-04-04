import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InputErrorMessage } from '@/elements';

const Input = React.forwardRef(
  (
    {
      customStyles = '',
      disabled = false,
      error = null,
      helperText = null,
      icon = null,
      label = null,
      name,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={classnames(
          disabled && 'opacity-50 pointer-events-none',
          customStyles,
          type === 'hidden' && 'hidden'
        )}
      >
        {label && (
          <label htmlFor={name} className="block text-gray text-[12px] font-semibold uppercase text-left">
            {label}
          </label>
        )}
        <div
          className={classnames(
            {
              'flex w-full min-h-10 border box-border rounded-md px-4 py-2.5 hover:border-blue hover:bg-transparent focus-within:bg-white focus-within:border-blue':
                type !== 'checkbox',
            },
            {
              'mt-1.5': type === 'checkbox',
            },
            {
              // 'bg-purple-light': filled,
              '!border-red': error,
            }
          )}
        >
          <input
            ref={ref}
            id={name}
            className="outline-none w-full h-5 text-xsm flex items-center bg-transparent"
            type={type}
            name={name}
            {...rest}
          />
          {icon && <span className="ml-2.5">{icon}</span>}
        </div>
        {error && <InputErrorMessage message={error} />}
        {helperText && <p className="text-[12px]">{helperText}</p>}
      </div>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default Input;
