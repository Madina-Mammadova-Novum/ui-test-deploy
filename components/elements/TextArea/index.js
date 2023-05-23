import React, { useCallback } from 'react';


import classnames from 'classnames';

import InputErrorMessage from '../InputErrorMessage';

import { TextAreaPropTypes } from '@/lib/types';

const TextArea = React.forwardRef(
  ({
    label,
    name,
    type = 'text',
    disabled = false,
    placeholder = '',
    customStyles = '',
    inputStyles,
    onChange,
    error = null,
    ...rest
  },
    ref
  ) => {
    const handleChange = useCallback(({ value }) => onChange(value), [onChange]);

    return (
      <div className={classnames(disabled && 'opacity-50 pointer-events-none', customStyles)}>
        {label && (
          <label htmlFor={name} className="block text-gray text-xs-sm font-semibold uppercase mb-0.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref
          }
          id={name}
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onChange={({ target }) => handleChange(target)}
          {...rest}
          className={classnames(
            'border border-gray-darker rounded-md resize-none outline-none text-xsm box-border px-4 py-2.5 min-h-[60px] w-full min-w-[296px] hover:border-blue focus:border-blue',
            inputStyles,
            {
              '!border-red': error,
            }
          )}
        />
        {error && <InputErrorMessage message={error} />}
      </div>
    );
  });

TextArea.propTypes = TextAreaPropTypes;

export default TextArea;
