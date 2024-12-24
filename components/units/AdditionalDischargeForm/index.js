/**
 * @component AdditionalDischargeForm
 * @description Reusable form component for additional discharge options with basin and country selection
 * @props {Object} data - Initial data for the form
 * @maritime Handles basin selection and sanctioned countries for maritime routes
 */

'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { Button, CheckBoxInput, FormDropdown, Input, Label } from '@/elements';
import { Flag, NestedCheckboxList } from '@/units';
import { useHookForm } from '@/utils/hooks';
import { useBasinSelection } from '@/utils/hooks/useBasinSelection';
import { useSanctionedCountries } from '@/utils/hooks/useSanctionedCountries';

const AdditionalDischargeForm = ({ data = {}, showError = false, showResetButton = true }) => {
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
  } = useBasinSelection(setValue, clearErrors, data);

  const {
    countries,
    countriesLoading,
    handleCountryChange,
    handleSanctionCheckboxChange,
    fetchCountries,
    resetSanctionedCountries,
  } = useSanctionedCountries(setValue, data);

  const formExcludedCountries = useWatch({
    control,
    name: 'excludedCountries',
    defaultValue: [],
  });

  const formExcludeInternationallySanctioned = useWatch({
    control,
    name: 'excludeInternationallySanctioned',
    defaultValue: false,
  });

  // Use ref to maintain stable reference to searchBasins
  const searchBasinsRef = useRef(searchBasins);
  useEffect(() => {
    searchBasinsRef.current = searchBasins;
  }, [searchBasins]);

  const debouncedSearchBasins = useCallback(
    debounce((query) => searchBasinsRef.current(query), 400),
    [] // No dependencies needed as we use ref
  );

  const handleSearchChange = useCallback(
    (e) => {
      /* eslint-disable prefer-destructuring */
      const value = e.target.value;
      setSearchQuery(value);
      debouncedSearchBasins(value);
    },
    [setSearchQuery, debouncedSearchBasins]
  );

  const handleReset = useCallback(() => {
    resetBasins();
    resetSanctionedCountries();
    fetchInitialBasins();
  }, [resetBasins, resetSanctionedCountries, fetchInitialBasins]);

  // Initialize data only once on mount
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchInitialBasins(), fetchCountries()]);
      setValue('excludeInternationallySanctioned', data?.excludeInternationallySanctioned || false);
    };

    initializeData();
  }, []); // Empty dependency array as we want this to run only once on mount

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearchBasins.cancel();
    };
  }, [debouncedSearchBasins]);

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
      return <span className="text-gray-600">{item.name}</span>;
    }
    return item.name;
  }, []);

  const shouldShowError = useCallback(() => {
    return showError && submitCount > 0 && errors?.additionalDischargeOptions;
  }, [showError, submitCount, errors]);

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <div className="mb-2 flex flex-col">
          <div className="flex flex-wrap items-center justify-between">
            <Label className="mb-0.5 block whitespace-nowrap text-xs-sm">Additional Discharge Options </Label>
            <div className="flex items-center gap-x-2">
              <CheckBoxInput
                name="isAllSelected"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                customStyles="accent-blue"
                labelStyles="text-black text-xsm"
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
                />
              )}
            </div>
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
        <div className={`max-h-80 overflow-y-auto rounded border p-4 ${shouldShowError() ? 'border-red-500' : ''}`}>
          {basins.length > 0 ? (
            <NestedCheckboxList
              items={basins}
              expanded={expandedBasins}
              onToggleExpand={(key) => setExpandedBasins((prev) => ({ ...prev, [key]: !prev[key] }))}
              onChange={handleBasinChange}
              renderItem={renderItem}
              getSubItems={getSubItems}
              isSelected={isSelected}
              hasIndeterminate={hasIndeterminate}
              customStyles={{
                container: 'space-y-1.5',
                subItems: 'space-y-0.5',
              }}
            />
          ) : (
            <div className="flex items-center justify-center py-8 text-gray-500">
              {searchLoading ? (
                <span>Loading discharge options...</span>
              ) : (
                <span>No discharge options found{searchQuery ? ` for "${searchQuery}"` : ''}</span>
              )}
            </div>
          )}
        </div>

        {shouldShowError() && <span className="text-sm text-red-500">{errors.additionalDischargeOptions.message}</span>}
      </div>

      <FormDropdown
        label="Excluded Destinations"
        name="excludedCountries"
        options={countries}
        value={formExcludedCountries}
        isMulti
        loading={countriesLoading}
        closeMenuOnSelect={false}
        customStyles={{ className: 'w-full' }}
        onChange={handleCountryChange}
        placeholder="Select one or more countries..."
      />
      <CheckBoxInput
        name="excludeInternationallySanctioned"
        checked={formExcludeInternationallySanctioned}
        onChange={handleSanctionCheckboxChange}
        customStyles="accent-blue"
        labelStyles="text-black text-xsm"
      >
        Exclude internationally sanctioned countries
      </CheckBoxInput>
    </div>
  );
};

const CountryShape = PropTypes.shape({
  countryId: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  ports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ),
});

const SubBasinShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(CountryShape).isRequired,
});

const AdditionalDischargeOptionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subBasins: PropTypes.arrayOf(SubBasinShape).isRequired,
});

AdditionalDischargeForm.propTypes = {
  data: PropTypes.shape({
    additionalDischargeOptions: PropTypes.arrayOf(AdditionalDischargeOptionShape),
    sanctionedCountries: PropTypes.arrayOf(CountryShape),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
  showError: PropTypes.bool,
  showResetButton: PropTypes.bool,
};

export default AdditionalDischargeForm;
