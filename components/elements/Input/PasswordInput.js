'use client';

import React, { useState } from 'react';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import ShowPasswordSVG from '@/assets/images/showPassword.svg';
import { Input } from '@/elements';

const PasswordInput = React.forwardRef(({ ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input {...rest} ref={ref} type={showPassword ? 'text' : 'password'} min={8} />
      <button
        type="button"
        onClick={() => setShowPassword((prevValue) => !prevValue)}
        className="w-6 h-6 absolute right-4 top-[50%] translate-y-[-50%]"
      >
        {showPassword ? <PasswordHiddenSVG /> : <ShowPasswordSVG />}
      </button>
    </>
  );
});

export default PasswordInput;
