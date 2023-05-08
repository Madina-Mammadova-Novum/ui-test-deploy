import React from 'react';

import classnames from 'classnames';

import { InputPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';

const Input = React.forwardRef(
  (
    {
      customStyles = '',
      inputStyles = '',
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
          <Label name={name} className="block text-xs-sm text-left mb-0.5 whitespace-nowrap">
            {label}
          </Label>
        )}
        <div
          className={classnames(
            {
              'flex w-full min-h-10 border box-border rounded-md px-4 py-[9px] hover:border-blue hover:bg-transparent focus-within:bg-white focus-within:border-blue':
                type !== 'checkbox',
            },
            {
              'mt-1.5': type === 'checkbox',
            },
            {
              '!p-0 border-none': type === 'radio',
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
            className={`outline-none w-full h-5 text-xsm flex items-center bg-transparent ${inputStyles}`}
            type={type}
            name={name}
            {...rest}
          />
          {icon && <span className="ml-2.5">{icon}</span>}
        </div>
        {error && <InputErrorMessage message={error} />}
        {helperText && !error && <p className="text-xs-sm text-black pt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.propTypes = InputPropTypes;

export default Input;
