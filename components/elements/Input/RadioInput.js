'use client';

import { Controller } from 'react-hook-form';

import classNames from 'classnames';

import { RadioInputPropTypes } from '@/lib/types';

import { Input, InputErrorMessage } from '@/elements';

const RadioInput = ({ onChange, children, customStyles = '', labelStyles = '', checked = false, name = null }) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];
        return (
          <div className="flex items-start gap-2.5">
            <Input
              {...field}
              ref={ref}
              type="radio"
              disabled={isSubmitting}
              onChange={onChange}
              checked={checked}
              className={classNames('h-5 w-5', customStyles)}
            />
            {children && (
              <label htmlFor={name} className={labelStyles}>
                {children}
              </label>
            )}
            {error ?? <InputErrorMessage>{error?.message}</InputErrorMessage>}
          </div>
        );
      }}
    />
  );
};

RadioInput.propTypes = RadioInputPropTypes;

export default RadioInput;
