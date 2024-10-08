'use client';

import { Controller } from 'react-hook-form';

import classNames from 'classnames';

import { CheckBoxInputPropTypes } from '@/lib/types';

import { Input, InputErrorMessage } from '@/elements';

const CheckBoxInput = ({ name = '', customStyles = '', labelStyles = '', checked = false, onChange, children }) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];

        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <Input
                {...field}
                ref={ref}
                type="checkbox"
                disabled={isSubmitting}
                onChange={onChange}
                checked={checked}
                error={!!error}
                className={classNames('h-5 w-5', customStyles)}
              />
              {children && (
                <label htmlFor={name} className={labelStyles}>
                  {children}
                </label>
              )}
            </div>
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

CheckBoxInput.propTypes = CheckBoxInputPropTypes;

export default CheckBoxInput;
