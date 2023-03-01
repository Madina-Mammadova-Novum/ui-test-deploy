import React from 'react';
import { Controller } from 'react-hook-form';
import Phone from 'react-phone-input-2';

import PropTypes from 'prop-types';

import 'react-phone-input-2/lib/style.css';

const PhoneInput = ({ control, name, label, error, errorMsg }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { ref, ...field } }) => (
        <div className="w-full">
          <p className="block text-gray text-[12px] font-semibold uppercase text-left">{label}</p>
          <Phone
            {...field}
            inputExtraProps={{
              ref,
              required: true,
              autoFocus: true,
            }}
            country="gb"
            inputClass={`!border-l-0 !pl-[72px] !w-full
          ${error ? '!border-red' : '!border-gray-darker'}`}
            buttonClass={`!border-r-0 !bg-purple-light 
          ${error ? '!border-red' : '!border-gray-darker'}`}
            placeholder="000-000-000"
            enableAreaCodes
            enableSearch
          />
          {error && <p className="text-[12px] text-red">{errorMsg}</p>}
        </div>
      )}
    />
  );
};

PhoneInput.propTypes = {
  control: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string.isRequired,
};

export default PhoneInput;
