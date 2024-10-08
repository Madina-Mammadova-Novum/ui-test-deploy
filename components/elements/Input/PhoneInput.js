'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import Phone from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

import { PhoneInputPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';

const PhoneInput = React.forwardRef(({ name, label, err, ...rest }, ref) => {
  if (name) {
    return (
      <Controller
        name={name}
        render={({ field: { rhfRef, ...field }, formState: { errors, isSubmitting } }) => {
          const error = errors[name];
          return (
            <div className="w-full">
              <Label name={name} className="mb-0.5 block whitespace-nowrap text-left text-xs-sm">
                {label}
              </Label>
              <Phone
                {...field}
                masks={{ ae: '.. .......' }}
                inputProps={{ ref: rhfRef }}
                id={name}
                enableSearch
                enableAreaCodes
                disabled={isSubmitting}
                inputClass={`!border-l-0 !pl-[72px] !w-full !h-10 !rounded-md ${
                  error ? '!border-red' : '!border-gray-darker'
                }`}
                buttonClass={`!border-r-0 !bg-purple-light !rounded-md ${
                  error ? '!border-red' : '!border-gray-darker'
                }`}
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
      <Label name={name} className="mb-0.5 block whitespace-nowrap text-left text-xs-sm">
        {label}
      </Label>
      <Phone
        {...rest}
        inputProps={{ ref }}
        enableSearch
        enableAreaCodes
        masks={{ ae: '.. .......' }}
        inputClass={`!border-l-0 !pl-[72px] !w-full !h-10 !rounded-md ${err ? '!border-red' : '!border-gray-darker'}`}
        buttonClass={`!border-r-0 !bg-purple-light !rounded-md ${err ? '!border-red' : '!border-gray-darker'}`}
      />
      {err && <InputErrorMessage message={err?.message} />}
    </div>
  );
});

PhoneInput.propTypes = PhoneInputPropTypes;

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
