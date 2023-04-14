import React, { useCallback } from 'react';

import classnames from "classnames";
import PropTypes from 'prop-types';

const TextArea = ({
  label,
  name,
  register,
  required,
  type,
  disabled,
  placeholder,
  customStyles,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback(({ value }) => onChange(value), [onChange]);

  return (
    <div
         className={classnames(disabled && 'opacity-50 pointer-events-none', customStyles)}>
      {label && (
        <label htmlFor={name} className="block text-gray text-[12px] font-semibold uppercase mb-0.5">
          {label}
        </label>
      )}
      <textarea
        id={name}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target)}
        {...register(name)}
        {...rest}
        className="border border-gray-darker rounded-md resize-none outline-none text-xsm box-border px-4 py-2.5 min-h-[60px] w-full min-w-[296px] hover:border-blue focus:border-blue"
      />
    </div>
  );
};

TextArea.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  customStyles: '',
  required: false,
  disabled: false,
  onChange: () => {},
  register: () => {},
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextArea;
