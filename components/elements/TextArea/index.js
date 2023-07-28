import React from 'react';

import classnames from 'classnames';

import { TextAreaPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';

const TextArea = React.forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      disabled = false,
      placeholder = '',
      helperText,
      customStyles = '',
      inputStyles,
      onChange,
      error = null,
      register,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={classnames(disabled && 'opacity-50 pointer-events-none', customStyles)}>
        {label && (
          <Label htmlFor={name} className="text-xs-sm">
            {label}
          </Label>
        )}
        <textarea
          {...rest}
          ref={ref}
          id={name}
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={classnames(
            'border border-gray-darker rounded-md resize-none outline-none text-xsm box-border px-4 py-2.5 min-h-[60px] w-full min-w-[296px] hover:border-blue focus:border-blue',
            inputStyles,
            {
              '!border-red': error,
            }
          )}
        />
        {error && <InputErrorMessage message={error} />}
        {helperText && !error && <p className="text-xs-sm text-black pt-1">{helperText}</p>}
      </div>
    );
  }
);

TextArea.propTypes = TextAreaPropTypes;

export default TextArea;
