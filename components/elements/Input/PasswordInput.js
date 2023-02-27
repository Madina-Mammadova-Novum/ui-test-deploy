import React, { useCallback, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import ShowPasswordSVG from '@/assets/images/showPassword.svg';

const PasswordInput = ({
  id,
  label,
  name,
  register,
  required,
  multiple,
  placeholder,
  helperText = '',
  disabled = false,
  error = '',
  customStyles = '',
  onChange,
  ...rest
}) => {
  const [filled, setFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback(
    ({ value }) => {
      onChange(value);
      setFilled(!!value);
    },
    [onChange]
  );

  return (
    <div className={classnames(customStyles, disabled && 'opacity-50 pointer-events-none')}>
      {label && (
        <label htmlFor={id} className="block text-gray text-[12px] font-semibold uppercase text-left">
          {label}
        </label>
      )}
      <div
        className={classnames(
          'relative flex w-full min-h-10 border box-border rounded-md px-4 py-2.5 hover:border-blue hover:bg-transparent focus-within:bg-white focus-within:border-blue',
          {
            'bg-purple-light': filled,
            '!border-red': error,
          }
        )}
      >
        <input
          id={id}
          className="outline-none w-full h-5 text-xsm flex items-center bg-transparent"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          name={name}
          max={10}
          onChange={({ target }) => handleChange(target)}
          multiple={multiple}
          {...register(name, { required })}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prevValue) => !prevValue)}
          className="w-6 h-6 absolute right-4 top-[50%] translate-y-[-50%]"
        >
          {showPassword ? <PasswordHiddenSVG /> : <ShowPasswordSVG />}
        </button>
      </div>
      {error && <p className="text-[12px] text-red">{error}</p>}
      {helperText && <p className="text-[12px]">{helperText}</p>}
    </div>
  );
};

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
};

export default PasswordInput;
