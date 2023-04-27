'use client';

import { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import { SimpleDropdown } from './SimpleDropdown';

import { DropdownPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const FormDropdown = ({
  options,
  onChange,
  name,
  label = '',
  disabled = false,
  asyncCall = false,
  customStyles = {},
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { dropdownWidth, className } = customStyles;

  const handleChange = useCallback(
    (option) => {
      onChange(option);
    },
    [onChange]
  );

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value ?? getValueWithPath(errors, name);
        const hasValue = { ...field }.value?.value;
        return (
          <div className={`relative bottom-1 ${className}`}>
            <Label htmlFor={name} className="text-xs-sm">
              {label}
            </Label>
            <SimpleDropdown
              {...field}
              ref={ref}
              id={name}
              options={options}
              onChange={handleChange}
              styles={dropdownStyles(hasValue, error, dropdownWidth)}
              isDisabled={disabled || isSubmitting}
              asyncCall={asyncCall}
            />
            {error && <InputErrorMessage message={error?.message} />}
          </div>
        );
      }}
    />
  );
};

FormDropdown.propTypes = DropdownPropTypes;

export default FormDropdown;
