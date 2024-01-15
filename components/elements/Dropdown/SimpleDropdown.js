'use client';

import Select from 'react-select';

import AsyncSelect from 'react-select/async';

import Loader from '../Loader';

import { SimpleDropdownPropTypes } from '@/lib/types';

import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownTheme } from '@/elements/Dropdown/styles';
import { filterDataByLowerCase } from '@/utils/helpers';

const LoadingIndicator = () => (
  <div className="spinner-border text-primary" role="status">
    <Loader className="w-4 h-4" />
  </div>
);

export const SimpleDropdown = ({
  asyncCall = false,
  options,
  ref,
  hardHeight,
  isDisabled,
  isOpen,
  onOpen = () => {},
  loading,
  onExpand = () => {},
  ...rest
}) => {
  const printOptions = ({ countryFlag, label: labelValue, coverImage }) => (
    <OptionRow countryFlag={countryFlag} value={labelValue} coverImage={coverImage} />
  );

  const handleOpenMenu = () => {
    onOpen(true);
    onExpand();
  };

  const handleClose = () => onOpen(false);

  if (asyncCall) {
    const loadOptions = (inputValue, callback) => callback(filterDataByLowerCase(inputValue, options));

    return (
      <AsyncSelect
        {...rest}
        menuIsOpen={isOpen}
        isLoading={loading}
        defaultOptions={options}
        loadOptions={loadOptions}
        formatOptionLabel={printOptions}
        onMenuOpen={handleOpenMenu}
        onMenuClose={handleClose}
        theme={dropdownTheme}
        isDisabled={isDisabled}
        className={isDisabled && 'opacity-50'}
        components={{ Option: OptionsList, LoadingIndicator }}
        closeMenuOnSelect
        cacheOptions
      />
    );
  }

  return (
    <Select
      {...rest}
      menuIsOpen={isOpen}
      options={options}
      formatOptionLabel={printOptions}
      onMenuOpen={handleOpenMenu}
      onMenuClose={handleClose}
      theme={dropdownTheme}
      isDisabled={isDisabled}
      className={isDisabled && 'opacity-50'}
      components={{ Option: OptionsList, LoadingIndicator }}
      closeMenuOnSelect
    />
  );
};

SimpleDropdown.propTypes = SimpleDropdownPropTypes;
