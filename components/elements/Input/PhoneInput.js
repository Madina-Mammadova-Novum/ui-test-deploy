'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import Phone from 'react-phone-input-2';

import PropTypes from 'prop-types';
import 'react-phone-input-2/lib/style.css';

import { InputErrorMessage } from '@/elements';

const PhoneInput = ({ name, label }) => {
  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = errors[name];
        return (
          <div className="w-full">
            <p className="block text-gray text-[12px] font-semibold uppercase text-left mb-0.5">{label}</p>
            <Phone
              {...field}
              inputProps={ref}
              id={name}
              enableSearch
              enableAreaCodes
              disabled={isSubmitting}
              inputClass={`!border-l-0 !pl-[72px] !w-full !h-10 !rounded-md ${
                error ? '!border-red' : '!border-gray-darker'
              }`}
              buttonClass={`!border-r-0 !bg-purple-light !rounded-md ${error ? '!border-red' : '!border-gray-darker'}`}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PhoneInput;
