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

import AngleDownSVG from '@/assets/images/angleDown.svg';
import { Button, CheckBoxInput, FormDropdown, Input } from '@/elements';
import { getCountries } from '@/services/country';
import { getAdditionalDischargeOptions } from '@/services/port';
import { Flag } from '@/units';
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

  // Local state for when form context isn't available
  const [localExcludedCountries, setLocalExcludedCountries] = useState(data?.sanctionedCountryIds || []);
  const [localExcludeInternationallySanctioned, setLocalExcludeInternationallySanctioned] = useState(
    data?.excludeInternationallySanctioned || false
  );

  // Form values when form context is available
  /* eslint-disable */
  const formExcludedCountries = control
    ? useWatch({
        control,
        name: 'excludedCountries',
        defaultValue: data?.sanctionedCountryIds || [],
      })
    : [];

  const formExcludeInternationallySanctioned = control
    ? useWatch({
        control,
        name: 'excludeInternationallySanctioned',
        defaultValue: data?.excludeInternationallySanctioned || false,
      })
    : false;

  // Use form values if available, otherwise use local state
  const excludedCountries = control ? formExcludedCountries : localExcludedCountries;
  const excludeInternationallySanctioned = control
    ? formExcludeInternationallySanctioned
    : localExcludeInternationallySanctioned;

  const toggleBasin = (basinId) => {
    setExpandedBasins((prev) => ({
      ...prev,
      [basinId]: !prev[basinId],
    }));
  };

  const updateBasins = (newBasins) => {
    setBasins(newBasins);

    const additionalDischargeOptions = newBasins
      .filter(
        (basin) => basin.selected || basin.subBasins.some((sb) => sb.selected || sb.countries.some((c) => c.selected))
      )
      .map((basin) => ({
        basinId: basin.id,
        subBasins: basin.subBasins
          .filter((sb) => sb.selected || sb.countries.some((c) => c.selected))
          .map((subBasin) => ({
            id: subBasin.id,
            countryIds: subBasin.countries.filter((country) => country.selected).map((country) => country.id),
          }))
          .filter((sb) => sb.countryIds.length > 0),
      }))
      .filter((basin) => basin.subBasins.length > 0);

    setValue?.('additionalDischargeOptions', additionalDischargeOptions, {
      shouldValidate: false,
    });

    if (additionalDischargeOptions.length > 0) {
      clearErrors?.('additionalDischargeOptions');
    }
  };

  const handleCountryChange = (selectedOptions) => {
    if (control) {
      setValue?.('excludedCountries', selectedOptions || []);
      setValue?.(
        'sanctionedCountryIds',
        (selectedOptions || []).map((option) => option.value)
      );
    } else {
      setLocalExcludedCountries(selectedOptions || []);
    }
  };

  const handleSanctionCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    if (control) {
      setValue?.('excludeInternationallySanctioned', isChecked);
    } else {
      setLocalExcludeInternationallySanctioned(isChecked);
    }
  };

  const fetchInitialBasins = async () => {
    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query: '' });
      if (response?.data) {
        // First, create a map of selected options for easier lookup
        const selectedBasinsMap = new Map();
        const selectedSubBasinsMap = new Map();
        const selectedCountryIds = new Set();

        data?.additionalDischargeOptions?.forEach((opt) => {
          selectedBasinsMap.set(opt.basinId, opt);
          opt.subBasins.forEach((subBasin) => {
            selectedSubBasinsMap.set(subBasin.id, subBasin);
            subBasin.countryIds.forEach((id) => selectedCountryIds.add(id));
          });
        });

        // Update basins with selected state
        const updatedBasins = response.data.map((basin) => ({
          ...basin,
          selected: false, // Will be updated based on subBasins
          subBasins: basin.subBasins.map((subBasin) => {
            const matchingSubBasin = selectedSubBasinsMap.get(subBasin.id);
            const updatedCountries = subBasin.countries.map((country) => ({
              ...country,
              selected: matchingSubBasin?.countryIds.includes(country.id) || false,
            }));

            // Only mark subBasin as selected if it has matching countries and all of them are selected
            const hasSelectedCountries = updatedCountries.some((country) => country.selected);
            const allMatchingCountriesSelected =
              hasSelectedCountries &&
              updatedCountries
                .filter((country) => matchingSubBasin?.countryIds.includes(country.id))
                .every((country) => country.selected);

            return {
              ...subBasin,
              selected: allMatchingCountriesSelected,
              countries: updatedCountries,
            };
          }),
        }));

        // Update basin selected state based on subBasins that have selected countries
        const finalBasins = updatedBasins.map((basin) => ({
          ...basin,
          selected: basin.subBasins.some(
            (subBasin) => subBasin.selected && subBasin.countries.some((country) => country.selected)
          ),
        }));

        setBasins(finalBasins);
        setValue?.('additionalDischargeOptions', data?.additionalDischargeOptions || []);
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

        // Set initial excluded countries after countries are loaded
        if (data?.sanctionedCountryIds?.length > 0) {
          const initialSelectedCountries = data.sanctionedCountryIds
            .map((id) => formattedCountries.find((country) => country.value === id))
            .filter(Boolean);

          setValue?.('excludedCountries', initialSelectedCountries);
          setValue?.('sanctionedCountryIds', data.sanctionedCountryIds);
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

    // Set initial excluded countries with proper format
    if (data?.sanctionedCountryIds?.length > 0) {
      setValue?.(
        'excludedCountries',
        data.sanctionedCountryIds.map((id) => ({ value: id, label: id }))
      );
      setValue?.('sanctionedCountryIds', data.sanctionedCountryIds);
    }

    // Set initial excludeInternationallySanctioned value
    setValue?.('excludeInternationallySanctioned', data?.excludeInternationallySanctioned || false);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchBasins.cancel();
    };
  }, []);

  const shouldShowError = () => {
    return showError && submitCount > 0 && errors?.additionalDischargeOptions;
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div>
        <div className="mb-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Additional Discharge Options</h4>
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
                setValue?.('additionalDischargeOptions', []);
                setValue?.('sanctionedCountryIds', []);
                setValue?.('excludedCountries', []);
                setValue?.('excludeInternationallySanctioned', false);
                fetchInitialBasins();
              }}
            />
          </div>
        </div>
        <div className={`max-h-80 overflow-y-auto rounded border p-4 ${shouldShowError() ? 'border-red-500' : ''}`}>
          {basins.length > 0 ? (
            basins.map((basin) => (
              <div key={basin.id} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between">
                  <label className="flex items-center font-medium">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                      checked={basin.selected}
                      ref={(el) => {
                        if (el) {
                          el.indeterminate =
                            !basin.selected &&
                            basin.subBasins.some((sb) => sb.selected || sb.countries.some((c) => c.selected));
                        }
                      }}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const updatedBasins = basins.map((b) => {
                          if (b.id === basin.id) {
                            return {
                              ...b,
                              selected: isChecked,
                              subBasins: b.subBasins.map((sb) => ({
                                ...sb,
                                selected: isChecked,
                                countries: sb.countries.map((c) => ({
                                  ...c,
                                  selected: isChecked,
                                })),
                              })),
                            };
                          }
                          return b;
                        });
                        updateBasins(updatedBasins);
                      }}
                    />
                    {basin.name}
                  </label>
                  <button type="button" onClick={() => toggleBasin(basin.id)} className="flex items-center p-1">
                    <AngleDownSVG
                      className={`h-5 w-5 transform fill-blue transition-transform duration-200 ${
                        expandedBasins[basin.id] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                {expandedBasins[basin.id] && (
                  <div className="ml-6 mt-2">
                    {basin.subBasins.map((subBasin) => (
                      <div key={subBasin.id} className="mb-3 last:mb-0">
                        <div className="flex items-center">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                              checked={subBasin.selected}
                              ref={(el) => {
                                if (el) {
                                  el.indeterminate = !subBasin.selected && subBasin.countries.some((c) => c.selected);
                                }
                              }}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const updatedBasins = basins.map((b) => {
                                  if (b.id === basin.id) {
                                    const updatedSubBasins = b.subBasins.map((sb) => {
                                      if (sb.id === subBasin.id) {
                                        return {
                                          ...sb,
                                          selected: isChecked,
                                          countries: sb.countries.map((c) => ({
                                            ...c,
                                            selected: isChecked,
                                          })),
                                        };
                                      }
                                      return sb;
                                    });

                                    return {
                                      ...b,
                                      selected: updatedSubBasins.every((sb) => sb.selected),
                                      subBasins: updatedSubBasins,
                                    };
                                  }
                                  return b;
                                });
                                updateBasins(updatedBasins);
                              }}
                            />
                            {subBasin.name}
                          </label>
                        </div>
                        <div className="mt-2 space-y-1.5 pl-6">
                          {subBasin.countries.map((country) => (
                            <div key={country.id}>
                              <label className="flex items-center text-sm">
                                <input
                                  type="checkbox"
                                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
                                  checked={country.selected}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const updatedBasins = basins.map((b) => {
                                      if (b.id === basin.id) {
                                        const updatedSubBasins = b.subBasins.map((sb) => {
                                          if (sb.id === subBasin.id) {
                                            const updatedCountries = sb.countries.map((c) => ({
                                              ...c,
                                              selected: c.id === country.id ? isChecked : c.selected,
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
                                          ...b,
                                          selected: updatedSubBasins.every((sb) => sb.selected),
                                          subBasins: updatedSubBasins,
                                        };
                                      }
                                      return b;
                                    });
                                    updateBasins(updatedBasins);
                                  }}
                                />
                                <div className="flex items-center">
                                  <Flag countryCode={country.codeISO2} className="mr-1.5" />
                                  {country.name}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
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
        value={excludedCountries}
        isMulti
        loading={countriesLoading}
        closeMenuOnSelect={false}
        customStyles={{ className: 'w-full' }}
        onChange={handleCountryChange}
        placeholder="Select countries to exclude from search..."
      />
      <CheckBoxInput
        name="excludeInternationallySanctioned"
        checked={excludeInternationallySanctioned}
        onChange={handleSanctionCheckboxChange}
        customStyles="accent-blue"
        labelStyles="text-black text-xsm"
      >
        Exclude internationally sanctioned countries in search results
      </CheckBoxInput>
    </div>
  );
};

AdditionalDischargeForm.propTypes = {
  data: PropTypes.shape({
    additionalDischargeOptions: PropTypes.arrayOf(
      PropTypes.shape({
        basinId: PropTypes.string,
        subBasins: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            countryIds: PropTypes.arrayOf(PropTypes.string),
          })
        ),
      })
    ),
    sanctionedCountryIds: PropTypes.arrayOf(PropTypes.string),
    excludeInternationallySanctioned: PropTypes.bool,
  }),
  showError: PropTypes.bool,
};

export default AdditionalDischargeForm;
