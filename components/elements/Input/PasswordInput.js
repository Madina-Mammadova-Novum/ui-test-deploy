'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { PasswordInputPropTypes } from '@/lib/types';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import ShowPasswordSVG from '@/assets/images/showPassword.svg';
import { Input } from '@/elements';

const PasswordInput = ({ name = '', label = '', placeholder = '', onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors } }) => (
        <div className="relative">
          <Input
            {...field}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            min={8}
            inputStyles="!w-[calc(100%-30px)]"
            error={errors[name]?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prevValue) => !prevValue)}
            className="w-6 h-6 absolute right-4 top-[26px]"
          >
            {showPassword ? <PasswordHiddenSVG /> : <ShowPasswordSVG />}
          </button>
        </div>
      )}
    />
  );
};

PasswordInput.propTypes = PasswordInputPropTypes;

export default PasswordInput;
