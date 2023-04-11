'use client';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { ControlledAsyncDropdown } from '@/elements/Dropdown/ControlledAsyncDropdown';
import { ControlledDropdown } from '@/elements/Dropdown/ControlledDropdown';
import { DefaultAsyncDropdown } from '@/elements/Dropdown/DefaultAsyncDropdown';
import { DefaultDropdown } from '@/elements/Dropdown/DefaultDropdown';

const Dropdown = ({
  name,
  label,
  options,
  onChange,
  disabled,
  errorMsg,
  customStyles = { className: '', dropdownWidth: '' },
  config = { syncControll: false, asyncControll: false, async: false, sync: true },
  ...rest
}) => {
  const printDropdown = useMemo(() => {
    switch (config) {
      case config?.syncControll:
        return (
          <ControlledDropdown
            {...rest}
            name={name}
            label={label}
            options={options}
            onChange={onChange}
            disabled={disabled}
            customStyles={customStyles}
          />
        );
      case config?.asyncControll:
        return (
          <ControlledAsyncDropdown
            {...rest}
            name={name}
            errorMsg={errorMsg}
            label={label}
            options={options}
            onChange={onChange}
            disabled={disabled}
            customStyles={customStyles}
          />
        );
      case config?.async:
        return (
          <DefaultAsyncDropdown
            {...rest}
            name={name}
            label={label}
            options={options}
            onChange={onChange}
            disabled={disabled}
            customStyles={customStyles}
          />
        );
      case config?.sync:
        return (
          <DefaultDropdown
            {...rest}
            name={name}
            label={label}
            options={options}
            onChange={onChange}
            disabled={disabled}
            customStyles={customStyles}
          />
        );
      default:
        return (
          <DefaultDropdown
            {...rest}
            name={name}
            label={label}
            options={options}
            onChange={onChange}
            disabled={disabled}
            customStyles={customStyles}
          />
        );
    }
  }, [config, customStyles, disabled, errorMsg, label, name, onChange, options, rest]);

  return printDropdown;
};

Dropdown.defaultProps = {
  label: null,
  disabled: false,
  customStyles: {
    dropdownWidth: '',
    className: '',
  },
};

Dropdown.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  customStyles: PropTypes.shape({
    dropdownWidth: PropTypes.string,
    className: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Dropdown;
