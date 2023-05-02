import { useCallback } from 'react';

import classnames from 'classnames';

import { TextAreaPropTypes } from '@/lib/types';

const TextArea = ({
  label,
  name,
  register,
  type = 'text',
  disabled = false,
  placeholder = '',
  customStyles = '',
  inputStyles,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback(({ value }) => onChange(value), [onChange]);

  return (
    <div className={classnames(disabled && 'opacity-50 pointer-events-none', customStyles)}>
      {label && (
        <label htmlFor={name} className="block text-gray text-xs-sm font-semibold uppercase mb-0.5">
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
        className={classnames(
          'border border-gray-darker rounded-md resize-none outline-none text-xsm box-border px-4 py-2.5 min-h-[60px] w-full min-w-[296px] hover:border-blue focus:border-blue',
          inputStyles
        )}
      />
    </div>
  );
};

TextArea.propTypes = TextAreaPropTypes;

export default TextArea;
