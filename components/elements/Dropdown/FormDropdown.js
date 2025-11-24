'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import classNames from 'classnames';

import SimpleDropdown from './SimpleDropdown';

import { DropdownPropTypes } from '@/lib/types';

import { InputErrorMessage, Label } from '@/elements';
import { dropdownStyles } from '@/elements/Dropdown/styles';
import { getValueWithPath } from '@/utils/helpers';

const FormDropdown = ({
  options = [],
  loading,
  onChange,
  name,
  label = '',
  labelBadge = null,
  disabled = false,
  asyncCall = false,
  customStyles = {},
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const { dropdownWidth, dropdownExpanded = false, className = '' } = customStyles;

  const handleToggle = (value) => setOpen(value);
  const handleChange = (option) => onChange(option);

  return (
    <Controller
      name={name}
      render={({ field: { ref, ...field }, formState: { errors, isSubmitting } }) => {
        const error = getValueWithPath(errors, name)?.value ?? getValueWithPath(errors, name);
        const hasValue = { ...field }.value;

        return (
          <div
            className={classNames('relative', className, {
              'cursor-not-allowed opacity-80': disabled || isSubmitting,
            })}
          >
            <Label
              name={name}
              className={classNames('mb-0.5 block whitespace-nowrap text-xs-sm', {
                'flex items-center gap-1': labelBadge,
              })}
            >
              {label} {labelBadge}
            </Label>
            <SimpleDropdown
              {...field}
              {...rest}
              іsOpen={open}
              onOpen={handleToggle}
              loading={loading}
              ref={ref}
              id={name}
              options={options}
              onChange={handleChange}
              styles={dropdownStyles(hasValue, error, dropdownWidth, dropdownExpanded)}
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
