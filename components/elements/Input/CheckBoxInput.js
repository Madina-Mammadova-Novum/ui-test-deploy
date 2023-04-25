'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Input, InputErrorMessage } from '@/elements';

const CheckBoxInput = ({ customStyles, labelStyles, onChange, checked, children, name }) => {
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
                className={classnames('w-5 h-5', customStyles)}
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

CheckBoxInput.defaultProps = {
  customStyles: '',
  labelStyles: '',
  label: '',
  name: null,
  checked: false,
};

CheckBoxInput.propTypes = {
  customStyles: PropTypes.string,
  labelStyles: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.func,
  checked: PropTypes.bool,
};

export default CheckBoxInput;
