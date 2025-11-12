'use client';

import React from 'react';

import classNames from 'classnames';

import { InputPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';
import { useDisableNumberInputScroll } from '@/utils/hooks';

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
      labelBadge = null,
      name,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    useDisableNumberInputScroll();

    return (
      <div className={classNames(disabled && 'cursor-not-allowed', customStyles, type === 'hidden' && 'hidden')}>
        {label && (
          <Label
            name={name}
            className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
              'flex flex-wrap items-center gap-1': labelBadge,
            })}
          >
            {label} {labelBadge}
          </Label>
        )}
        <div
          className={classNames(
            {
              'box-border flex min-h-10 w-full rounded-md border border-gray-darker focus-within:border-blue focus-within:bg-white hover:border-blue hover:bg-transparent':
                type !== 'checkbox',
            },
            {
              'h-5 w-5': type === 'checkbox',
            },
            {
              'border-none !p-0': type === 'radio',
            },
            {
              '!border-red': error,
            },
            {
              'cursor-not-allowed bg-purple-light opacity-80': disabled,
            }
          )}
        >
          <input
            ref={ref}
            id={name}
            className={classNames(
              {
                'rounded-md px-4 py-[9px]': type !== 'checkbox',
                'cursor-not-allowed': disabled,
              },
              'flex h-[38px] w-full items-center bg-transparent text-xsm outline-none',
              inputStyles
            )}
            readOnly={disabled}
            type={type}
            name={name}
            disabled={disabled}
            {...rest}
          />
          {icon && <span className="my-auto ml-2.5 mr-4">{icon}</span>}
        </div>
        {error && <InputErrorMessage message={error} />}
        {helperText && <p className="pt-1 text-xs-sm font-bold text-black">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
Input.propTypes = InputPropTypes;

export default Input;
