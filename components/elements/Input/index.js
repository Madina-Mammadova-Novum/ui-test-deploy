import React, { useCallback, useState } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({
  id,
  label,
  name,
  register,
  required,
  multiple,
  placeholder,
  helperText = '',
  type = 'text',
  icon = null,
  disabled = false,
  error = '',
  customStyles = '',
  onChange,
  ...rest
}) => {
  const [filled, setFilled] = useState(false);

  const handleChange = useCallback(
    ({ value }) => {
      onChange(value);
      setFilled(!!value);
    },
    [onChange]
  );

  return (
    <div className={disabled && 'opacity-50 pointer-events-none'}>
      {label && (
        <label htmlFor={id} className="block text-gray text-[12px] font-semibold uppercase">
          {label}
        </label>
      )}
      <div
        className={classnames(
          'flex w-full min-h-10 border box-border rounded-md px-4 py-2.5 hover:border-blue hover:bg-transparent focus-within:bg-white focus-within:border-blue',
          {
            'bg-purple-light': filled,
            '!border-red': error,
          },
          customStyles
        )}
      >
        <input
          id={id}
          className="outline-none w-full h-5 text-xsm flex items-center bg-transparent"
          type={type}
          placeholder={placeholder}
          name={name}
          max={10}
          onChange={({ target }) => handleChange(target)}
          multiple={multiple}
          {...register(name, { required })}
          {...rest}
        />
        {icon && <span className="ml-2.5">{icon}</span>}
      </div>
      {error && <p className="text-[12px] text-red">{error}</p>}
      {helperText && <p className="text-[12px]">{helperText}</p>}
    </div>
  );
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: '',
  customStyles: '',
  error: '',
  helperText: '',
  icon: null,
  disabled: false,
  required: false,
  multiple: false,
  name: '',
  register: () => {},
  onChange: () => {},
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  customStyles: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  register: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default Input;
