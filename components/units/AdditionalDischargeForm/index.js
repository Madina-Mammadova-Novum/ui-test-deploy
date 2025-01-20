/**
 * @component AdditionalDischargeForm
 * @description Reusable form component for additional discharge options with basin and country selection
 * @props {Object} data - Initial data for the form
 * @maritime Handles basin selection and sanctioned countries for maritime routes
 */

'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useWatch } from 'react-hook-form';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Button, CheckBoxInput, FormDropdown, Input, Label, Loader } from '@/elements';
import { Flag, NestedCheckboxList } from '@/units';
import { useHookForm } from '@/utils/hooks';
import { useBasinSelection } from '@/utils/hooks/useBasinSelection';
import { useSanctionedCountries } from '@/utils/hooks/useSanctionedCountries';

const AdditionalDischargeForm = ({ data = {}, showError = false, showResetButton = true, isCounteroffer = false }) => {
  const form = useHookForm() || {};
  const { formState: { errors, submitCount } = {}, setValue, clearErrors, control } = form;

  const {
    basins,
    searchQuery,
    searchLoading,
    expandedBasins,
    setExpandedBasins,
    setSearchQuery,
    handleBasinChange,
    searchBasins,
    fetchInitialBasins,
    resetBasins,
    isAllSelected,
    handleSelectAll,
  } = useBasinSelection(setValue, clearErrors, data, isCounteroffer);

  const {
    countries,
    countriesLoading,
    handleCountryChange,
    handleSanctionCheckboxChange,
    fetchCountries,
    resetSanctionedCountries,
  } = useSanctionedCountries(setValue, data);

  const formExcludeInternationallySanctioned = useWatch({
    control,
    name: 'excludeInternationallySanctioned',
    defaultValue: false,
  });

  const formExcludedCountries = useWatch({
    control,
    name: 'excludedCountries',
    defaultValue: [],
  });

  // Function to check if country or its ports are selected in basins
  const isCountrySelectedInBasins = useCallback(
    (countryId) => {
      return basins.some((basin) =>
        basin.subBasins?.some((subBasin) =>
          subBasin.countries?.some((country) => {
            if (country.id === countryId) {
              return country.selected || country.ports?.some((port) => port.selected);
            }
            return false;
          })
        )
      );
    },
    [basins]
  );

  // Filter and prepare countries with disabled state
  const countriesWithDisabled = useMemo(() => {
    return countries.map((country) => ({
      ...country,
      isDisabled: isCountrySelectedInBasins(country.value),
    }));
  }, [countries, isCountrySelectedInBasins]);

  // Update excluded countries when basin selection changes
  useEffect(() => {
    const newExcludedCountries = formExcludedCountries.filter((country) => !isCountrySelectedInBasins(country.value));

    if (newExcludedCountries.length !== formExcludedCountries.length) {
      setValue('excludedCountries', newExcludedCountries);
    }
  }, [basins, formExcludedCountries, setValue, isCountrySelectedInBasins]);

  // Use ref to maintain stable reference to searchBasins
  const searchBasinsRef = useRef(searchBasins);
  useEffect(() => {
    searchBasinsRef.current = searchBasins;
  }, [searchBasins]);

  const handleSearchChange = useCallback(
    ({ target: { value } }) => {
      setSearchQuery(value);
      searchBasins(value);
    },
    [setSearchQuery, searchBasins]
  );

  const handleReset = useCallback(async () => {
    resetBasins();
    resetSanctionedCountries();
  }, [resetBasins, resetSanctionedCountries]);

  // Initialize data only once on mount
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchInitialBasins(), fetchCountries()]);
      setValue('excludeInternationallySanctioned', data?.excludeInternationallySanctioned || false);
    };

    initializeData();
  }, [data]);

  const getSubItems = useCallback((item) => {
    if (item.subBasins) return item.subBasins;
    if (item.countries) return item.countries;
    if (item.ports) return item.ports;
    return [];
  }, []);

  const isSelected = useCallback((item) => {
    return item.selected || false;
  }, []);

  const hasIndeterminate = useCallback((item) => {
    if (item.subBasins) {
      return (
        !item.selected &&
        item.subBasins.some(
          (sb) => sb.selected || sb.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected))
        )
      );
    }
    if (item.countries) {
      return !item.selected && item.countries.some((c) => c.selected || (c.ports || []).some((p) => p.selected));
    }
    if (item.ports) {
      return !item.selected && item.ports.some((p) => p.selected);
    }
    return false;
  }, []);

  const renderItem = useCallback((item) => {
    if (item.countries) {
      return item.name;
    }
    if (item.codeISO2) {
      return (
        <div className="flex items-center">
          <Flag countryCode={item.codeISO2} className="mr-1.5" />
          {item.name}
        </div>
      );
    }
    if (!item.countries && !item.codeISO2 && !item.subBasins && !item.ports) {
      return <span className="text-xsm text-gray-600">{item.name}</span>;
    }
    return item.name;
  }, []);

  const shouldShowError = useCallback(() => {
    return showError && submitCount > 0 && errors?.additionalDischargeOptions;
  }, [showError, submitCount, errors]);

  const isDisabled = useCallback(
    (item) => {
      // If item is a basin
      if (item.subBasins) {
        // Check if all countries in all sub-basins are in excluded list
        return item.subBasins.every((subBasin) =>
          subBasin.countries.every((country) => formExcludedCountries.some((excluded) => excluded.value === country.id))
        );
      }
      // If item has countries, it's a sub-basin
      if (item.countries) {
        // Check if all countries in this sub-basin are in excluded list
        return item.countries.every((country) =>
          formExcludedCountries.some((excluded) => excluded.value === country.id)
        );
      }
      // If item has codeISO2, it's a country
      if (item.codeISO2) {
        return formExcludedCountries.some((country) => country.value === item.id);
      }
      // For ports, check if parent country is excluded
      if (!item.countries && !item.codeISO2 && !item.subBasins && !item.ports) {
        // Find the parent country of this port
        const parentCountry = basins
          .flatMap((basin) => basin.subBasins)
          .flatMap((subBasin) => subBasin.countries)
          .find((country) => country.ports?.some((port) => port.id === item.id));

        // Port is disabled if its parent country is disabled
        if (parentCountry) {
          return formExcludedCountries.some((country) => country.value === parentCountry.id);
        }
      }
      return false;
    },
    [formExcludedCountries, basins]
  );

  if (searchLoading) {
    return (
      <div className="relative flex h-72 w-full items-center justify-center">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <div className={classNames('mb-2 flex flex-col', { 'gap-y-2.5': isCounteroffer })}>
          <div className="flex flex-wrap items-center justify-between">
            <Label className="mb-0.5 block whitespace-nowrap text-xs-sm">Additional Discharge Options</Label>
            {!isCounteroffer && (
              <div className="flex items-center gap-x-2">
                <CheckBoxInput
                  name="isAllSelected"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  customStyles="accent-blue"
                  labelStyles="text-black text-xsm"
                  disabled={searchLoading || !!searchQuery}
                  boxStyles="!gap-1.5"
                >
                  Select All
                </CheckBoxInput>
                {showResetButton && (
                  <Button
                    customStyles="text-blue hover:text-blue-darker"
                    buttonProps={{
                      text: 'Reset All',
                      variant: 'tertiary',
                      size: 'small',
                    }}
                    onClick={handleReset}
                    disabled={searchLoading}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-x-2">
            <Input
              type="text"
              placeholder="Search discharge options..."
              value={searchQuery}
              onChange={handleSearchChange}
              customStyles="max-w-72 w-full"
              disabled={searchLoading}
            />
          </div>
        </div>
        <div
          className={`max-h-[20.5rem] overflow-y-auto rounded border p-4 ${shouldShowError() ? 'border-red-500' : ''}`}
        >
          {!searchLoading && basins.length > 0 && (
            <NestedCheckboxList
              items={basins}
              expanded={expandedBasins}
              onToggleExpand={(key) => setExpandedBasins((prev) => ({ ...prev, [key]: !prev[key] }))}
              onChange={handleBasinChange}
              renderItem={renderItem}
              getSubItems={getSubItems}
              isSelected={isSelected}
              hasIndeterminate={hasIndeterminate}
              isDisabled={isDisabled}
              isCounteroffer={isCounteroffer}
            />
          )}
          {!searchLoading && basins.length === 0 && (
            <div className="flex items-center justify-center py-8 text-xsm text-gray-500">
              <span>No discharge options found{searchQuery ? ` for "${searchQuery}"` : ''}</span>
            </div>
          )}
        </div>

        {shouldShowError() && (
          <span className="text-xsm text-red-500">{errors.additionalDischargeOptions.message}</span>
        )}
      </div>

      <FormDropdown
        label="Excluded Destinations"
        name="excludedCountries"
        options={countriesWithDisabled}
        value={formExcludedCountries}
        isMulti
        loading={countriesLoading}
        closeMenuOnSelect={false}
        customStyles={{ className: 'w-full' }}
        onChange={handleCountryChange}
        placeholder="Select one or more countries..."
        disabled={isCounteroffer}
      />
      <CheckBoxInput
        name="excludeInternationallySanctioned"
        checked={formExcludeInternationallySanctioned}
        onChange={handleSanctionCheckboxChange}
        customStyles="accent-blue"
        labelStyles="text-black text-xsm"
        disabled={isCounteroffer}
        boxStyles="!gap-1.5"
      >
        Exclude internationally sanctioned countries
      </CheckBoxInput>
    </div>
  );
};

const CountryShape = PropTypes.shape({
  countryId: PropTypes.string,
  countryName: PropTypes.string,
  countryCode: PropTypes.string,
  ports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
});

const SubBasinShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  countries: PropTypes.arrayOf(CountryShape),
});

const AdditionalDischargeOptionShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  subBasins: PropTypes.arrayOf(SubBasinShape),
});

AdditionalDischargeForm.propTypes = {
  data: PropTypes.shape({
    additionalDischargeOptions: PropTypes.shape({
      isAllSelected: PropTypes.bool,
      selected: PropTypes.arrayOf(AdditionalDischargeOptionShape),
    }),
    sanctionedCountries: PropTypes.arrayOf(CountryShape),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
  showError: PropTypes.bool,
  showResetButton: PropTypes.bool,
  isCounteroffer: PropTypes.bool,
};

export default AdditionalDischargeForm;
