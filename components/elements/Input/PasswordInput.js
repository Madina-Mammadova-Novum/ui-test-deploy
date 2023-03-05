'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

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

PasswordInput.defaultProps = {
  label: '',
  placeholder: '',
  customStyles: '',
  error: '',
  helperText: '',
  disabled: false,
  required: false,
  multiple: false,
  name: '',
  register: () => {},
  onChange: () => {},
  submitCount: 0,
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  register: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  submitCount: PropTypes.number,
};

export default PasswordInput;
