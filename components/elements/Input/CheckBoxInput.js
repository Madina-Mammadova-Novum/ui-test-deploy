'use client';

import { Controller } from 'react-hook-form';

import classnames from 'classnames';

import { CheckBoxInputPropTypes } from '@/lib/types';

import { Input, InputErrorMessage } from '@/elements';

const CheckBoxInput = ({ name = null, customStyles = '', labelStyles = '', checked = false, onChange, children }) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];
        return (
          <div className="flex gap-2.5 items-center">
            <Input
              {...field}
              ref={ref}
              type="checkbox"
              disabled={isSubmitting}
              onChange={onChange}
              checked={checked}
              className={classnames('w-5 h-5', customStyles)}
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

CheckBoxInput.propTypes = CheckBoxInputPropTypes;

export default CheckBoxInput;
