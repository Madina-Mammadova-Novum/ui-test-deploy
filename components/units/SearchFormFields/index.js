'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addDays } from 'date-fns';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import AngleDownSVG from '@/assets/images/angleDown.svg';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, CheckBoxInput, DatePicker, FormDropdown, Input } from '@/elements';
import { CARGO_TYPE_KEY } from '@/lib/constants';
import { getCargoTypes } from '@/services/cargoTypes';
import { getCountries } from '@/services/country';
import { getAdditionalDischargeOptions, getPortsForSearchForm } from '@/services/port';
import { getProducts } from '@/services/product';
import { getTerminals } from '@/services/terminal';
import { setSearchParams } from '@/store/entities/search/slice';
import { getSearchSelector } from '@/store/selectors';
import { Flag } from '@/units';
import { convertDataToOptions, countriesOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SearchFormFields = ({ productState, setProductState }) => {
  const dispatch = useDispatch();
  const { searchParams } = useSelector(getSearchSelector);

  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    control,
  } = useHookForm();

  const [initialLoading, setInitialLoading] = useState(false);
  const [portsLoader, setPortsLoader] = useState(false);

  const [ports, setPorts] = useState([]);
  const [perList, setPerList] = useState(100);
  const [cargoTypes, setCargoTypes] = useState([]);
  const [selected, setSelected] = useState(false);
  const [products, setProducts] = useState({
    loading: false,
    data: [],
  });
  const [terminals, setTerminals] = useState({
    loadPortTerminals: {
      loading: false,
      data: [],
    },
    dischargePortTerminals: {
      loading: false,
      data: [],
    },
  });

  // Add state for selected countries
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [includeInternationalSanctions, setIncludeInternationalSanctions] = useState(false);

  // Add basins state
  const [basins, setBasins] = useState([]);

  const laycanStart = useWatch({
    control,
    name: 'laycanStart',
  });

  const minDateForLaycanEnd = laycanStart ? new Date(laycanStart) : new Date();
  const maxDateForLaycanEnd = laycanStart ? addDays(new Date(laycanStart), 2) : null;

  const productsLimitExceeded = productState?.length >= 3;
  const isSavedSearch = getValues('isSavedSearch');
  const isAlternative = getValues('isAlternative');

  const handleMore = () => setPerList((prev) => prev + 100);

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);
    const portKeys = ['loadPort', 'dischargePort'];

    const terminalKeys = {
      loadPort: 'loadTerminal',
      dischargePort: 'dischargeTerminal',
    };

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }

    setValue(key, value);

    if (portKeys.includes(key)) {
      setValue(terminalKeys[key], null);

      setTerminals((prevState) => ({
        ...prevState,
        [`${key}Terminals`]: {
          loading: true,
          data: prevState[`${key}Terminals`].data,
        },
      }));

      const relatedTerminals = await getTerminals(value.value);

      setTerminals((prevState) => ({
        ...prevState,
        [`${key}Terminals`]: {
          loading: false,
          data: convertDataToOptions(relatedTerminals, 'id', 'name'),
        },
      }));
    }

    if (key === CARGO_TYPE_KEY) {
      productState?.map((productId) => setValue(`products[${productId}].product`, null));
      setProducts((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const relatedProducts = await getProducts(value.value);

      setProducts({
        loading: false,
        data: convertDataToOptions(relatedProducts, 'id', 'name').map((product) => ({
          ...product,
          density: relatedProducts.data.find(({ id }) => id === product.value).density,
        })),
      });
    }
  };

  const handleAddProduct = () => {
    const availableProductIds = [0, 1, 2];
    const currentProductIndexes = productState;

    const newProductId = availableProductIds.find((el) => !currentProductIndexes.includes(el));

    if (newProductId !== undefined) {
      setProductState((prevState) => [...prevState, newProductId]);

      const updatedProductsByIndex = [...(searchParams?.productsByIndex || [0]), newProductId];
      const updatedSearchParams = {
        ...searchParams,
        productsByIndex: updatedProductsByIndex,
      };

      dispatch(setSearchParams(updatedSearchParams));
    }
  };

  const handleRemoveProduct = (id) => {
    clearErrors(`products[${id}]`);
    const currentProducts = getValues('products');

    const updatedProducts = currentProducts.filter((_, index) => index !== id);

    setValue('products', updatedProducts);

    setProductState((prevState) => (id === 0 ? prevState.slice(0, -1) : prevState.filter((product) => product !== id)));

    const updatedProductsByIndex =
      id === 0
        ? (searchParams?.productsByIndex || []).slice(0, -1) // remove last if `id` is `0`
        : searchParams?.productsByIndex.filter((_, index) => index !== id); // remove by `id` otherwise

    const updatedSearchParamsProducts = searchParams?.products.filter((_, index) => index !== id);

    const updatedSearchParams = {
      ...searchParams,
      products: updatedSearchParamsProducts,
      productsByIndex: updatedProductsByIndex,
    };

    dispatch(setSearchParams(updatedSearchParams));
  };

  const getCargoes = async () => {
    setInitialLoading(true);
    const cargoTypesData = await getCargoTypes();
    setCargoTypes(convertDataToOptions(cargoTypesData, 'id', 'name'));
    setInitialLoading(false);
  };

  const getPorts = async () => {
    setPortsLoader(true);
    const { data } = await getPortsForSearchForm({ pageSize: perList });
    setPorts(dropDownOptionsAdapter({ data }));
    setPortsLoader(false);
  };

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    const { data } = await getPortsForSearchForm({ query: inputValue, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  }, 400);

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback(ports);
      return;
    }
    debouncedLoadOptions(inputValue, callback);
  };

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

  useEffect(() => {
    getCargoes();
  }, []);

  useEffect(() => {
    getPorts();
  }, [perList]);

  useEffect(() => {
    const fetchProducts = async () => {
      const cargoType = getValues('cargoType');
      const currentProducts = getValues('products');

      if (isSavedSearch || isAlternative) {
        const relatedProducts = await getProducts(cargoType.value);

        const relatedProductsMap = relatedProducts?.data?.reduce((map, product) => {
          map[product.id] = product;
          return map;
        }, {});

        currentProducts.forEach((currentProduct) => {
          const productId = currentProduct.product.value;
          const relatedProduct = relatedProductsMap[productId];

          if (relatedProduct) {
            currentProduct.product.density = relatedProduct.density;
          }
        });

        setValue('products', currentProducts);

        setProducts({
          loading: false,
          data: convertDataToOptions(relatedProducts, 'id', 'name').map((product) => ({
            ...product,
            density: relatedProducts.data.find(({ id }) => id === product.value).density,
          })),
        });

        const loadPort = getValues('loadPort');
        const dischargePort = getValues('dischargePort');

        await Promise.all([
          loadPort?.value &&
            (async () => {
              setTerminals((prev) => ({
                ...prev,
                loadPortTerminals: { loading: true, data: prev.loadPortTerminals.data },
              }));

              const loadPortTerminals = await getTerminals(loadPort.value);

              setTerminals((prev) => ({
                ...prev,
                loadPortTerminals: {
                  loading: false,
                  data: convertDataToOptions(loadPortTerminals, 'id', 'name'),
                },
              }));
            })(),

          dischargePort?.value &&
            (async () => {
              setTerminals((prev) => ({
                ...prev,
                dischargePortTerminals: { loading: true, data: prev.dischargePortTerminals.data },
              }));

              const dischargePortTerminals = await getTerminals(dischargePort.value);

              setTerminals((prev) => ({
                ...prev,
                dischargePortTerminals: {
                  loading: false,
                  data: convertDataToOptions(dischargePortTerminals, 'id', 'name'),
                },
              }));
            })(),
        ]);
      }
    };

    fetchProducts();

    return () => {
      setValue('isSavedSearch', false);
    };
  }, [isSavedSearch]);

  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(false);

  const fetchCountries = async () => {
    setCountriesLoading(true);
    try {
      const response = await getCountries();
      if (response?.data) {
        setCountries(countriesOptions(response.data));
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setCountriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle country selection changes
  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions || []);
  };

  // Handle checkbox change
  const handleSanctionCheckboxChange = (e) => {
    setIncludeInternationalSanctions(e.target.checked);
  };

  // Add function to handle basin updates
  const updateBasins = (newBasins) => {
    setBasins(newBasins);
    // Here you can also update form values or dispatch actions if needed
    const selectedRegions = {
      basins: newBasins.filter((b) => b.selected).map((b) => b.id),
      subBasins: newBasins.flatMap((b) => b.subBasins.filter((sb) => sb.selected).map((sb) => sb.id)),
      countries: newBasins.flatMap((b) =>
        b.subBasins.flatMap((sb) => sb.countries.filter((c) => c.selected).map((c) => c.id))
      ),
    };
    setValue('selectedRegions', selectedRegions);
  };

  const [showAdditionalDischarge, setShowAdditionalDischarge] = useState(false);
  const [isDataExpanded, setIsDataExpanded] = useState(false);
  const [expandedBasins, setExpandedBasins] = useState({});

  const toggleBasin = (basinId) => {
    setExpandedBasins((prev) => ({
      ...prev,
      [basinId]: !prev[basinId],
    }));
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchInitialBasins = async () => {
    setSearchLoading(true);
    try {
      const response = await getAdditionalDischargeOptions({ query: '' });
      if (response?.data) {
        setBasins(response.data);
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

  useEffect(() => {
    fetchInitialBasins();
    return () => {
      debouncedSearchBasins.cancel();
    };
  }, []);

  // Update search input handler
  const handleSearchChange = (e) => {
    /* eslint-disable prefer-destructuring */
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearchBasins(value);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="flex w-full flex-col gap-y-4 sm:mr-5 sm:border-r sm:pr-5">
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <DatePicker
            label="laycan start"
            inputClass="w-full"
            containerClass="w-full"
            name="laycanStart"
            minDate={new Date()}
            onChange={(date) => handleChange('laycanStart', date)}
            error={errors.laycanStart?.message}
          />
          <DatePicker
            label="laycan end"
            inputClass="w-full"
            containerClass="w-full"
            name="laycanEnd"
            minDate={minDateForLaycanEnd}
            maxDate={maxDateForLaycanEnd}
            onChange={(date) => handleChange('laycanEnd', date)}
            error={errors.laycanEnd?.message}
            disabled={!laycanStart}
          />
        </div>
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <FormDropdown
            asyncCall
            id="loadPort"
            name="loadPort"
            label="load port"
            options={ports}
            loading={portsLoader}
            onMenuScrollToBottom={handleMore}
            loadOptions={loadOptions}
            disabled={initialLoading}
            customStyles={{ className: 'w-full', dropdownWidth: 3 }}
            onChange={(option) => handleChange('loadPort', option)}
          />
          <FormDropdown
            name="loadTerminal"
            loading={terminals.loadPortTerminals.loading}
            options={terminals.loadPortTerminals.data}
            disabled={!terminals.loadPortTerminals.data.length}
            label="load terminal"
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('loadTerminal', option)}
            asyncCall
          />
        </div>
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <FormDropdown
            name="dischargePort"
            label="discharge port"
            options={ports}
            loading={portsLoader}
            loadOptions={loadOptions}
            onMenuScrollToBottom={handleMore}
            disabled={initialLoading}
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargePort', option)}
            asyncCall
          />
          <FormDropdown
            name="dischargeTerminal"
            label="discharge terminal"
            loading={terminals.dischargePortTerminals.loading}
            options={terminals.dischargePortTerminals.data}
            disabled={!terminals.dischargePortTerminals.data.length}
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargeTerminal', option)}
            asyncCall
          />
        </div>

        <CheckBoxInput
          name="showAdditionalDischarge"
          checked={showAdditionalDischarge}
          onChange={(e) => setShowAdditionalDischarge(e.target.checked)}
          labelStyles="text-black text-xsm"
        >
          Add additional discharge options
        </CheckBoxInput>

        {showAdditionalDischarge && (
          <>
            <div className="mb-4">
              <div className="mb-2 flex flex-col gap-2">
                <h4 className="text-sm font-medium">Additional Discharge Options</h4>
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
                      fetchInitialBasins();
                    }}
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto rounded border p-4">
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
                                        el.indeterminate =
                                          !subBasin.selected && subBasin.countries.some((c) => c.selected);
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
            </div>

            <FormDropdown
              label="Exclude Sanctioned Countries"
              name="excludedCountries"
              options={countries}
              value={selectedCountries}
              isMulti
              loading={countriesLoading}
              closeMenuOnSelect={false}
              customStyles={{ className: 'w-full' }}
              onChange={handleCountryChange}
              placeholder="Select countries to exclude from search..."
            />
            <CheckBoxInput
              name="includeInternationalSanctions"
              checked={includeInternationalSanctions}
              onChange={handleSanctionCheckboxChange}
              customStyles="accent-blue"
              labelStyles="text-black text-xsm"
            >
              Exclude internationally sanctioned countries in search results
            </CheckBoxInput>

            <div className="mt-4 border-t pt-4">
              <div className="mb-2 flex w-full items-center justify-between">
                <h4 className="text-sm font-medium">Selected Data (We will remove this section)</h4>
                <Button
                  buttonProps={{
                    text: isDataExpanded ? 'Hide' : 'Show',
                    variant: 'tertiary',
                    size: 'small',
                  }}
                  onClick={() => setIsDataExpanded(!isDataExpanded)}
                  customStyles="text-blue hover:text-blue-darker"
                />
              </div>
              {isDataExpanded && (
                <pre className="text-xs overflow-auto rounded border bg-gray-50 p-4">
                  {JSON.stringify(
                    {
                      basins: basins
                        .filter(
                          (b) =>
                            b.selected || b.subBasins.some((sb) => sb.selected || sb.countries.some((c) => c.selected))
                        )
                        .map((basin) => ({
                          id: basin.id,
                          name: basin.name,
                          subBasins: basin.subBasins
                            .filter((sb) => sb.selected || sb.countries.some((c) => c.selected))
                            .map((subBasin) => ({
                              id: subBasin.id,
                              name: subBasin.name,
                              countries: subBasin.countries
                                .filter((c) => c.selected)
                                .map((country) => ({
                                  id: country.id,
                                  name: country.name,
                                })),
                            })),
                        })),
                      sanctionedCountries: selectedCountries.map((country) => ({
                        id: country.value,
                        name: country.label,
                      })),
                      excludeInternationallySanctioned: includeInternationalSanctions,
                    },
                    null,
                    2
                  )}
                </pre>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex w-full flex-col gap-y-4">
        <FormDropdown
          label="cargo type"
          name="cargoType"
          id="cargoType"
          options={cargoTypes}
          disabled={!cargoTypes.length}
          loading={initialLoading}
          onChange={(option) => handleChange('cargoType', option)}
          asyncCall
        />
        {productState?.map((productId, index) => {
          const { density = {} } = getValues(`products[${productId}].product`) || {};

          const minValue = parseFloat(density?.min?.toFixed(4)).toString();
          const maxValue = parseFloat(density?.max?.toFixed(4)).toString();

          const helperTextDensity = `${minValue} - ${maxValue}`;

          return (
            <div key={`product_${productId}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2.5 3md:flex-nowrap">
                <FormDropdown
                  onChange={(option) => {
                    setSelected(!selected);
                    handleChange(`products[${productId}].product`, option);
                  }}
                  name={`products[${productId}].product`}
                  loading={products.loading}
                  asyncCall
                  options={products.data}
                  disabled={!products.data.length}
                  label={`product #${index + 1}`}
                  customStyles={{ className: 'w-full 3md:w-1/2' }}
                />
                <Input
                  {...register(`products[${productId}].density`)}
                  label="density"
                  type="number"
                  placeholder="mt/m³"
                  customStyles="w-full 3md:w-2/5"
                  helperText={density.min && helperTextDensity}
                  error={errors.products ? errors.products[productId]?.density?.message : null}
                  disabled={isSubmitting}
                  min={String(density.min)}
                  max={String(density.max)}
                  step="any"
                />
                <Input
                  {...register(`products[${productId}].quantity`)}
                  label="Quantity"
                  type="number"
                  placeholder="tons"
                  customStyles="w-full sm:w-[45%] 3md:w-2/5"
                  error={errors.products ? errors.products[productId]?.quantity?.message : null}
                  disabled={isSubmitting}
                />
                <Input
                  {...register(`products[${productId}].tolerance`)}
                  label="Tolerance"
                  type="number"
                  placeholder="%"
                  customStyles="w-full sm:w-[45%] 3md:w-1/5"
                  error={errors.products ? errors.products[productId]?.tolerance?.message : null}
                  disabled={isSubmitting}
                />
              </div>
              {productState?.length > 1 && (
                <Button
                  buttonProps={{
                    text: 'Delete',
                    variant: 'tertiary',
                    size: 'small',
                    icon: { after: <TrashAltSVG viewBox="0 0 24 24" className="h-5 w-5 fill-black" /> },
                  }}
                  customStyles="ml-auto !p-0"
                  onClick={() => handleRemoveProduct(productId)}
                />
              )}
            </div>
          );
        })}

        <Button
          disabled={productsLimitExceeded}
          buttonProps={{
            text: 'Add more Products',
            variant: 'primary',
            size: 'small',
            icon: { before: <PlusCircleSVG className="fill-blue group-hover:fill-blue-darker" /> },
          }}
          customStyles="self-start text-xsm !px-0 !py-0"
          onClick={handleAddProduct}
        />
      </div>
    </div>
  );
};

SearchFormFields.propTypes = {
  productState: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProductState: PropTypes.func.isRequired,
};

export default SearchFormFields;
