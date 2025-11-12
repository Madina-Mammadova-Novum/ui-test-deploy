import React from 'react';

import classNames from 'classnames';

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
      error = null,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={classNames(disabled && 'pointer-events-none opacity-50', customStyles)}>
        {label && (
          <Label name={name} className="text-xs-sm">
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
          className={classNames(
            'box-border min-h-[60px] w-full min-w-[296px] resize-none rounded-md border border-gray-darker px-4 py-2.5 text-xsm outline-none hover:border-blue focus:border-blue',
            inputStyles,
            {
              '!border-red': error,
            }
          )}
        />
        {error && <InputErrorMessage message={error} />}
        {helperText && !error && <p className="pt-1 text-xs-sm text-black">{helperText}</p>}
      </div>
    );
  }
);

TextArea.propTypes = TextAreaPropTypes;

export default TextArea;
