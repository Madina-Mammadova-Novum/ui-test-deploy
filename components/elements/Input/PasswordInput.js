'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { PasswordInputPropTypes } from '@/lib/types';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import ShowPasswordSVG from '@/assets/images/showPassword.svg';
import { Input } from '@/elements';

const PasswordInput = ({ name = '', label = '', labelBadge = '', placeholder = '', onChange, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors } }) => (
        <div className="relative w-full">
          <Input
            {...field}
            label={label}
            labelBadge={labelBadge}
            onChange={onChange}
            placeholder={placeholder}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            min={8}
            inputStyles="!pr-12"
            error={errors[name]?.message}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prevValue) => !prevValue)}
            className="absolute right-4 top-[26px] h-6 w-6"
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
