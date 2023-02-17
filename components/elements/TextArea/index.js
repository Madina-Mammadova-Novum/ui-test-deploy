import { useCallback } from 'react';

import classnames from 'classnames';
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
  id,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback(({ value }) => onChange(value), [onChange]);

  return (
    <div className={disabled && 'opacity-50 pointer-events-none'}>
      <label htmlFor={id ?? label} className="block text-gray text-[12px] font-semibold uppercase">
        {label}
      </label>
      <textarea
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        onChange={({ target }) => handleChange(target)}
        {...register(name)}
        {...rest}
        className={classnames(
          'border border-gray-darker rounded-md resize-none outline-none text-xsm box-border px-4 py-2.5 min-h-[60px] min-w-[296px] hover:border-blue focus:border-blue',
          customStyles
        )}
      />
    </div>
  );
};

TextArea.defaultProps = {
  id: null,
  name: '',
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
  id: PropTypes.string,
  name: PropTypes.string,
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
