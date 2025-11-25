'use client';

import React from 'react';
import Select from 'react-select';

import AsyncSelect from 'react-select/async';

import Loader from '../Loader';

import { SimpleDropdownPropTypes } from '@/lib/types';

import OptionRow from '@/elements/Dropdown/OptionRow';
import OptionsList from '@/elements/Dropdown/OptionsList';
import { dropdownTheme } from '@/elements/Dropdown/styles';
import { filterDataByLowerCase, turkishToLowerCase } from '@/utils/helpers';

const LoadingIndicator = () => (
  <div className="spinner-border text-primary" role="status">
    <Loader className="h-4 w-4" />
  </div>
);

// Custom filter function for Turkish character support
const createTurkishFilter = () => {
  return (option, inputValue) => {
    if (!inputValue) return true;

    const normalizedInput = turkishToLowerCase(inputValue);
    const normalizedLabel = turkishToLowerCase(option.label || '');

    return normalizedLabel.includes(normalizedInput);
  };
};

const SimpleDropdown = React.forwardRef(
  (
    {
      asyncCall = false,
      options,
      isDisabled,
      isOpen,
      onOpen = () => {},
      loading,
      onExpand = () => {},
      components: customComponents,
      ...rest
    },
    ref
  ) => {
    const printOptions = ({ countryFlag, label: labelValue, coverImage, isDisabled: optionDisabled }) => (
      <OptionRow countryFlag={countryFlag} value={labelValue} coverImage={coverImage} isDisabled={optionDisabled} />
    );

    const handleOpenMenu = () => {
      onOpen(true);
      onExpand();
    };

    const handleCloseMenu = () => onOpen(false);

    const defaultComponents = {
      Option: OptionsList,
    };

    const mergedComponents = {
      ...defaultComponents,
      ...customComponents,
      LoadingIndicator,
    };

    if (asyncCall) {
      const loadOptions = (inputValue, callback) => callback(filterDataByLowerCase(inputValue, options));

      return (
        <AsyncSelect
          {...rest}
          ref={ref}
          menuIsOpen={isOpen}
          isLoading={loading}
          defaultOptions={options}
          loadOptions={rest?.loadOptions ? rest?.loadOptions : loadOptions}
          formatOptionLabel={printOptions}
          onMenuOpen={handleOpenMenu}
          onMenuClose={handleCloseMenu}
          theme={dropdownTheme}
          isDisabled={isDisabled}
          className={isDisabled ? 'opacity-80' : ''}
          components={mergedComponents}
          closeMenuOnSelect
          cacheOptions
          isOptionDisabled={(option) => option.isDisabled}
        />
      );
    }

    return (
      <Select
        closeMenuOnSelect
        {...rest}
        ref={ref}
        menuIsOpen={isOpen}
        options={options}
        formatOptionLabel={printOptions}
        onMenuOpen={handleOpenMenu}
        onMenuClose={handleCloseMenu}
        theme={dropdownTheme}
        isDisabled={isDisabled}
        className={isDisabled ? 'opacity-80' : ''}
        components={mergedComponents}
        isOptionDisabled={(option) => option.isDisabled}
        filterOption={createTurkishFilter()}
      />
    );
  }
);

SimpleDropdown.propTypes = SimpleDropdownPropTypes;

export default SimpleDropdown;
