/**
 * @component AdditionalDischargeForm
 * @description Reusable form component for additional discharge options with basin and country selection
 * @props {Object} data - Initial data for the form
 * @maritime Handles basin selection and sanctioned countries for maritime routes
 */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { Button, CheckBoxInput, FormDropdown, Input, Label } from '@/elements';
import { getCountries } from '@/services/country';
import { getAdditionalDischargeOptions } from '@/services/port';
import { Flag, NestedCheckboxList } from '@/units';
import { countriesOptions } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const AdditionalDischargeForm = ({ data = {}, showError = false }) => {
  const form = useHookForm() || {};
  const { formState: { errors, submitCount } = {}, setValue, clearErrors, control } = form;

  const [basins, setBasins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [expandedBasins, setExpandedBasins] = useState({});
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);

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

  const updateBasins = (newBasins) => {
    setBasins(newBasins);

    const additionalDischargeOptions = newBasins
      .filter((basin) => basin.subBasins.some((sb) => sb.countries.some((c) => c.selected)))
      .map((basin) => ({
        basinId: basin.id,
        subBasins: basin.subBasins
          .filter((sb) => sb.countries.some((c) => c.selected))
          .map((subBasin) => ({
            id: subBasin.id,
            countryIds: subBasin.countries.filter((country) => country.selected).map((country) => country.id),
          }))
          .filter((sb) => sb.countryIds.length > 0),
      }))
      .filter((basin) => basin.subBasins.length > 0);

    setValue('additionalDischargeOptions', additionalDischargeOptions, {
      shouldValidate: false,
    });

    if (additionalDischargeOptions.length > 0) {
      clearErrors('additionalDischargeOptions');
    }
  };

  const handleCountryChange = (selectedOptions) => {
    setValue('excludedCountries', selectedOptions || []);
    setValue(
      'sanctionedCountryIds',
      (selectedOptions || []).map((option) => option.value)
    );
  };

  const handleSanctionCheckboxChange = (e) => {
    setValue('excludeInternationallySanctioned', e.target.checked);
  };

  const fetchInitialBasins = async () => {
    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query: '' });
      if (response?.data) {
        const selectedBasinsMap = new Map();
        const selectedSubBasinsMap = new Map();

        data?.additionalDischargeOptions?.forEach((opt) => {
          selectedBasinsMap.set(opt.basinId, opt);
          opt.subBasins.forEach((subBasin) => {
            selectedSubBasinsMap.set(subBasin.id, subBasin);
          });
        });

        const updatedBasins = response.data.map((basin) => {
          const updatedSubBasins = basin.subBasins.map((subBasin) => {
            const matchingSubBasin = selectedSubBasinsMap.get(subBasin.id);
            const updatedCountries = subBasin.countries.map((country) => ({
              ...country,
              selected: matchingSubBasin?.countryIds.includes(country.id) || false,
            }));

            const hasSelectedCountries = updatedCountries.some((c) => c.selected);
            return {
              ...subBasin,
              selected: hasSelectedCountries && updatedCountries.every((c) => c.selected),
              countries: updatedCountries,
            };
          });

          const hasSelectedSubBasins = updatedSubBasins.some((sb) => sb.countries.some((c) => c.selected));
          return {
            ...basin,
            selected: hasSelectedSubBasins && updatedSubBasins.every((sb) => sb.selected),
            subBasins: updatedSubBasins,
          };
        });

        setBasins(updatedBasins);
        setValue('additionalDischargeOptions', data?.additionalDischargeOptions || []);
      }
    } catch (error) {
      console.error('Error fetching initial basins:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const searchBasins = async (query) => {
    if (!query) {
      await fetchInitialBasins();
      return;
    }
    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query });
      if (response?.data) {
        setBasins(response.data);
      }
    } catch (error) {
      console.error('Error searching basins:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const debouncedSearchBasins = useCallback(
    debounce((query) => searchBasins(query), 400),
    []
  );

  const handleSearchChange = (e) => {
    /* eslint-disable prefer-destructuring */
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearchBasins(value);
  };

  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await getCountries();
      if (response?.data) {
        const formattedCountries = countriesOptions(response.data);
        setCountries(formattedCountries);

        if (data?.sanctionedCountryIds?.length > 0) {
          const initialSelectedCountries = data.sanctionedCountryIds
            .map((id) => formattedCountries.find((country) => country.value === id))
            .filter(Boolean);

          setValue('excludedCountries', initialSelectedCountries);
          setValue('sanctionedCountryIds', data.sanctionedCountryIds);
        }
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setCountriesLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialBasins();
    fetchCountries();
    setValue('excludeInternationallySanctioned', data?.excludeInternationallySanctioned || false);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchBasins.cancel();
    };
  }, []);

  const handleBasinChange = useCallback(
    (item, checked, itemType) => {
      const updatedBasins = basins.map((basin) => {
        if (itemType === 'basin' && basin.id === item.id) {
          // Handle basin selection
          return {
            ...basin,
            selected: checked,
            subBasins: basin.subBasins.map((sb) => ({
              ...sb,
              selected: checked,
              countries: sb.countries.map((c) => ({
                ...c,
                selected: checked,
              })),
            })),
          };
        }
        if (itemType === 'subBasin') {
          // Handle sub-basin selection
          if (basin.subBasins.some((sb) => sb.id === item.id)) {
            const updatedSubBasins = basin.subBasins.map((sb) => {
              if (sb.id === item.id) {
                return {
                  ...sb,
                  selected: checked,
                  countries: sb.countries.map((c) => ({
                    ...c,
                    selected: checked,
                  })),
                };
              }
              return sb;
            });

            return {
              ...basin,
              subBasins: updatedSubBasins,
              selected: updatedSubBasins.every((sb) => sb.selected),
            };
          }
        }
        if (itemType === 'country') {
          // Handle country selection
          const updatedSubBasins = basin.subBasins.map((sb) => {
            const countryInSubBasin = sb.countries.find((c) => c.id === item.id);
            if (countryInSubBasin && item.subBasinId === sb.id) {
              const updatedCountries = sb.countries.map((c) => ({
                ...c,
                selected: c.id === item.id ? checked : c.selected,
              }));

              return {
                ...sb,
                selected: updatedCountries.every((c) => c.selected),
                countries: updatedCountries,
              };
            }
            return sb;
          });

          return {
            ...basin,
            subBasins: updatedSubBasins,
            selected: updatedSubBasins.every((sb) => sb.selected),
          };
        }
        return basin;
      });

      updateBasins(updatedBasins);
    },
    [basins]
  );

  const getSubItems = useCallback((item) => {
    if (item.subBasins) return item.subBasins;
    if (item.countries) return item.countries;
    return [];
  }, []);

  const isSelected = useCallback((item) => {
    return item.selected || false;
  }, []);

  const hasIndeterminate = useCallback((item) => {
    if (item.subBasins) {
      return !item.selected && item.subBasins.some((sb) => sb.selected || sb.countries.some((c) => c.selected));
    }
    if (item.countries) {
      return !item.selected && item.countries.some((c) => c.selected);
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
    return item.name;
  }, []);

  const shouldShowError = () => {
    return showError && submitCount > 0 && errors?.additionalDischargeOptions;
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <div className="mb-2 flex flex-col">
          <div className="flex items-center justify-between">
            <Label className="mb-0.5 block whitespace-nowrap text-xs-sm">Additional Discharge Options </Label>
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
            <Button
              customStyles="text-blue hover:text-blue-darker"
              buttonProps={{
                text: 'Reset All',
                variant: 'tertiary',
                size: 'small',
              }}
              onClick={() => {
                setSearchQuery('');
                const resetBasins = basins.map((basin) => ({
                  ...basin,
                  selected: false,
                  subBasins: basin.subBasins.map((subBasin) => ({
                    ...subBasin,
                    selected: false,
                    countries: subBasin.countries.map((country) => ({
                      ...country,
                      selected: false,
                    })),
                  })),
                }));
                updateBasins(resetBasins);
                setValue('additionalDischargeOptions', []);
                setValue('sanctionedCountryIds', []);
                setValue('excludedCountries', []);
                setValue('excludeInternationallySanctioned', false);
                fetchInitialBasins();
              }}
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
        label="Exclude Sanctioned Countries"
        name="excludedCountries"
        options={countries}
        value={formExcludedCountries}
        isMulti
        loading={countriesLoading}
        closeMenuOnSelect={false}
        customStyles={{ className: 'w-full' }}
        onChange={handleCountryChange}
        placeholder="Select countries to exclude from search..."
      />
      <CheckBoxInput
        name="excludeInternationallySanctioned"
        checked={formExcludeInternationallySanctioned}
        onChange={handleSanctionCheckboxChange}
        customStyles="accent-blue"
        labelStyles="text-black text-xsm"
      >
        Exclude internationally sanctioned countries in search results
      </CheckBoxInput>
    </div>
  );
};

const SubBasinShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  countryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const AdditionalDischargeOptionShape = PropTypes.shape({
  basinId: PropTypes.string.isRequired,
  subBasins: PropTypes.arrayOf(SubBasinShape).isRequired,
});

AdditionalDischargeForm.propTypes = {
  data: PropTypes.shape({
    additionalDischargeOptions: PropTypes.arrayOf(AdditionalDischargeOptionShape),
    sanctionedCountryIds: PropTypes.arrayOf(PropTypes.string),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
  showError: PropTypes.bool,
};

export default AdditionalDischargeForm;
