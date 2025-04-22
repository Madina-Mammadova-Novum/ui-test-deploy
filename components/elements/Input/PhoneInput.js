'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import Phone from 'react-phone-input-2';

import classNames from 'classnames';
import 'react-phone-input-2/lib/style.css';

import { PhoneInputPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';

const PhoneInput = React.forwardRef(({ name, label, err, labelBadge = null, ...rest }, ref) => {
  if (name) {
    return (
      <Controller
        name={name}
        render={({ field: { ref: rfRef, ...field }, formState: { errors, isSubmitting } }) => {
          const error = errors[name];
          return (
            <div className="w-full">
              <Label
                name={name}
                className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
                  'flex items-center gap-1': labelBadge,
                })}
              >
                {label} {labelBadge}
              </Label>
              <Phone
                {...rest}
                {...field}
                masks={{ ae: '.. .......' }}
                inputProps={{ ref: rfRef }}
                id={name}
                enableSearch
                enableAreaCodes
                disabled={isSubmitting || rest.disabled}
                inputClass={`!border-l-0 !pl-[72px] !w-full !h-10 !rounded-md ${
                  error ? '!border-red' : '!border-gray-darker'
                } ${isSubmitting || rest.disabled ? '!bg-purple-light !opacity-80' : ''}`}
                buttonClass={`!border-r-0 !bg-purple-light !rounded-md ${
                  error ? '!border-red' : '!border-gray-darker'
                } ${isSubmitting || rest.disabled ? '!cursor-not-allowed !opacity-80' : ''}`}
              />
              {error && <InputErrorMessage message={error?.message} />}
            </div>
          );
        }}
      />
    );
  }

  return (
    <div className="w-full">
      <Label
        name={name}
        className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
          'flex items-center gap-1': labelBadge,
        })}
      >
        {label} {labelBadge}
      </Label>
      <Phone
        {...rest}
        inputProps={ref ? { ref } : undefined}
        enableSearch
        enableAreaCodes
        masks={{ ae: '.. .......' }}
        inputClass={`!border-l-0 !pl-[72px] !w-full !h-10 !rounded-md ${
          err ? '!border-red' : '!border-gray-darker'
        } ${rest.disabled ? '!bg-purple-light !opacity-80' : ''}`}
        buttonClass={`!border-r-0 !bg-purple-light !rounded-md ${
          err ? '!border-red' : '!border-gray-darker'
        } ${rest.disabled ? '!cursor-not-allowed !opacity-80' : ''}`}
      />
      {err && <InputErrorMessage message={err?.message} />}
    </div>
  );
});

PhoneInput.propTypes = PhoneInputPropTypes;
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
