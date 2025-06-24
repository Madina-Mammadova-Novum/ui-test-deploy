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
            <div className="w-full" data-field={name}>
              <Label
                name={name}
                className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
                  'flex flex-wrap items-center gap-1': labelBadge,
                })}
              >
                {label} {labelBadge}
              </Label>
              <div className="react-tel-input">
                <Phone
                  {...rest}
                  {...field}
                  masks={{ ae: '.. .......' }}
                  inputProps={{
                    ref: rfRef,
                    name,
                    id: name,
                    'data-field': name,
                  }}
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
              </div>
              {error && <InputErrorMessage message={error?.message} />}
            </div>
          );
        }}
      />
    );
  }

  return (
    <div className="w-full" data-field={name}>
      <Label
        className={classNames('mb-0.5 block whitespace-nowrap text-left text-xs-sm', {
          'flex flex-wrap items-center gap-1': labelBadge,
        })}
      >
        {label} {labelBadge}
      </Label>
      <div className="react-tel-input">
        <Phone
          {...rest}
          inputProps={
            ref
              ? {
                  ref,
                  name,
                  id: name,
                  'data-field': name,
                }
              : {
                  name,
                  id: name,
                  'data-field': name,
                }
          }
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
      </div>
      {err && <InputErrorMessage message={err?.message} />}
    </div>
  );
});

PhoneInput.propTypes = PhoneInputPropTypes;
PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
