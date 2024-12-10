'use client';

import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addDays } from 'date-fns';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import MinusCircleSVG from '@/assets/images/minusCircle.svg';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, CheckBoxInput, DatePicker, FormDropdown, Input } from '@/elements';
import { CARGO_TYPE_KEY } from '@/lib/constants';
import { getCargoTypes } from '@/services/cargoTypes';
import { getPortsForSearchForm } from '@/services/port';
import { getProducts } from '@/services/product';
import { getTerminals } from '@/services/terminal';
import { setSearchParams } from '@/store/entities/search/slice';
import { getSearchSelector } from '@/store/selectors';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
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
  const [basins, setBasins] = useState([
    {
      id: '1',
      name: 'MEDITERRANEN',
      selected: false,
      subBasins: [
        {
          id: '2',
          name: 'BLACK SEA',
          selected: false,
          countries: [
            {
              id: '101',
              name: 'TURKEY',
              selected: false,
            },
            {
              id: '102',
              name: 'BULGARIA',
              selected: false,
            },
            {
              id: '103',
              name: 'ROMANIA',
              selected: false,
            },
            {
              id: '104',
              name: 'UKRAINE',
              selected: false,
            },
            {
              id: '105',
              name: 'RUSSIA',
              selected: false,
            },
            {
              id: '106',
              name: 'GEORGIA',
              selected: false,
            },
          ],
        },
        {
          id: '3',
          name: 'AEGEAN SEA',
          selected: false,
          countries: [
            {
              id: '107',
              name: 'TURKEY',
              selected: false,
            },
            {
              id: '108',
              name: 'GREECE',
              selected: false,
            },
          ],
        },
        {
          id: '4',
          name: 'ADRIATIC SEA',
          selected: false,
          countries: [
            {
              id: '109',
              name: 'ITALY',
              selected: false,
            },
            {
              id: '110',
              name: 'CROATIA',
              selected: false,
            },
            {
              id: '111',
              name: 'ALBANIA',
              selected: false,
            },
            {
              id: '112',
              name: 'MONTENEGRO',
              selected: false,
            },
            {
              id: '113',
              name: 'SLOVENIA',
              selected: false,
            },
          ],
        },
        {
          id: '5',
          name: 'TYRRHENIAN SEA',
          selected: false,
          countries: [
            {
              id: '114',
              name: 'ITALY',
              selected: false,
            },
            {
              id: '115',
              name: 'FRANCE',
              selected: false,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'ATLANTIC OCEAN',
      selected: false,
      subBasins: [
        {
          id: '6',
          name: 'NORTH SEA',
          selected: false,
          countries: [
            {
              id: '116',
              name: 'NORWAY',
              selected: false,
            },
            {
              id: '117',
              name: 'UNITED KINGDOM',
              selected: false,
            },
            {
              id: '118',
              name: 'NETHERLANDS',
              selected: false,
            },
            {
              id: '119',
              name: 'BELGIUM',
              selected: false,
            },
            {
              id: '120',
              name: 'GERMANY',
              selected: false,
            },
            {
              id: '121',
              name: 'DENMARK',
              selected: false,
            },
          ],
        },
        {
          id: '7',
          name: 'CARIBBEAN SEA',
          selected: false,
          countries: [
            {
              id: '122',
              name: 'VENEZUELA',
              selected: false,
            },
            {
              id: '123',
              name: 'COLOMBIA',
              selected: false,
            },
            {
              id: '124',
              name: 'PANAMA',
              selected: false,
            },
            {
              id: '125',
              name: 'JAMAICA',
              selected: false,
            },
            {
              id: '126',
              name: 'CUBA',
              selected: false,
            },
            {
              id: '127',
              name: 'DOMINICAN REPUBLIC',
              selected: false,
            },
            {
              id: '128',
              name: 'TRINIDAD AND TOBAGO',
              selected: false,
            },
          ],
        },
        {
          id: '8',
          name: 'BAY OF BISCAY',
          selected: false,
          countries: [
            {
              id: '129',
              name: 'FRANCE',
              selected: false,
            },
            {
              id: '130',
              name: 'SPAIN',
              selected: false,
            },
            {
              id: '131',
              name: 'PORTUGAL',
              selected: false,
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'INDIAN OCEAN',
      selected: false,
      subBasins: [
        {
          id: '9',
          name: 'ARABIAN SEA',
          selected: false,
          countries: [
            {
              id: '132',
              name: 'INDIA',
              selected: false,
            },
            {
              id: '133',
              name: 'PAKISTAN',
              selected: false,
            },
            {
              id: '134',
              name: 'OMAN',
              selected: false,
            },
            {
              id: '135',
              name: 'YEMEN',
              selected: false,
            },
            {
              id: '136',
              name: 'UAE',
              selected: false,
            },
          ],
        },
        {
          id: '10',
          name: 'BAY OF BENGAL',
          selected: false,
          countries: [
            {
              id: '137',
              name: 'INDIA',
              selected: false,
            },
            {
              id: '138',
              name: 'BANGLADESH',
              selected: false,
            },
            {
              id: '139',
              name: 'MYANMAR',
              selected: false,
            },
            {
              id: '140',
              name: 'THAILAND',
              selected: false,
            },
            {
              id: '141',
              name: 'SRI LANKA',
              selected: false,
            },
          ],
        },
      ],
    },
  ]);

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

  const mockCountries = [
    { value: 'us', label: 'United States', countryFlag: 'us' },
    { value: 'gb', label: 'United Kingdom', countryFlag: 'gb' },
    { value: 'de', label: 'Germany', countryFlag: 'de' },
    { value: 'fr', label: 'France', countryFlag: 'fr' },
    { value: 'es', label: 'Spain', countryFlag: 'es' },
    { value: 'it', label: 'Italy', countryFlag: 'it' },
    { value: 'nl', label: 'Netherlands', countryFlag: 'nl' },
    { value: 'sg', label: 'Singapore', countryFlag: 'sg' },
    { value: 'jp', label: 'Japan', countryFlag: 'jp' },
    { value: 'au', label: 'Australia', countryFlag: 'au' },
    { value: 'ca', label: 'Canada', countryFlag: 'ca' },
    { value: 'br', label: 'Brazil', countryFlag: 'br' },
    { value: 'in', label: 'India', countryFlag: 'in' },
    { value: 'za', label: 'South Africa', countryFlag: 'za' },
    { value: 'ae', label: 'UAE', countryFlag: 'ae' },
    { value: 'sa', label: 'Saudi Arabia', countryFlag: 'sa' },
    { value: 'tr', label: 'Turkey', countryFlag: 'tr' },
    { value: 'my', label: 'Malaysia', countryFlag: 'my' },
    { value: 'id', label: 'Indonesia', countryFlag: 'id' },
    { value: 'th', label: 'Thailand', countryFlag: 'th' },
    { value: 'eg', label: 'Egypt', countryFlag: 'eg' },
    { value: 'gr', label: 'Greece', countryFlag: 'gr' },
    { value: 'no', label: 'Norway', countryFlag: 'no' },
    { value: 'dk', label: 'Denmark', countryFlag: 'dk' },
    { value: 'fi', label: 'Finland', countryFlag: 'fi' },
  ];

  // Handle country selection changes
  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions || []);

    /* eslint-disable no-console */
    console.log('Selected countries to exclude:', selectedOptions);
  };

  // Handle checkbox change
  const handleSanctionCheckboxChange = (e) => {
    setIncludeInternationalSanctions(e.target.checked);
    console.log('Include internationally sanctioned countries:', e.target.checked);
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

        <Button
          buttonProps={{
            text: showAdditionalDischarge
              ? 'Hide additional discharge countries'
              : 'Add additional discharge countries',
            variant: 'primary',
            size: 'small',
            icon: {
              before: showAdditionalDischarge ? (
                <MinusCircleSVG className="fill-blue group-hover:fill-blue-darker" />
              ) : (
                <PlusCircleSVG className="fill-blue group-hover:fill-blue-darker" />
              ),
            },
          }}
          customStyles="self-start text-xsm !px-0 !py-0 mt-4"
          onClick={() => setShowAdditionalDischarge(!showAdditionalDischarge)}
        />

        {showAdditionalDischarge && (
          <>
            <div className="mb-4 mt-4">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-medium">Additional Discharge Regions</h4>
                <Button
                  customStyles="text-blue hover:text-blue-darker"
                  buttonProps={{
                    text: 'Reset All',
                    variant: 'tertiary',
                    size: 'small',
                  }}
                  onClick={() => {
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
                  }}
                />
              </div>
              <div className="max-h-80 overflow-y-auto rounded border p-4">
                {basins.map((basin) => (
                  <div key={basin.id} className="mb-4 last:mb-0">
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
                    <div className="ml-6 mt-2">
                      {basin.subBasins.map((subBasin) => (
                        <div key={subBasin.id} className="mb-2 last:mb-0">
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
                          <div className="ml-6 mt-1">
                            {subBasin.countries.map((country) => (
                              <div key={country.id} className="mb-1 last:mb-0">
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
                                  {country.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FormDropdown
              label="Exclude Sanctioned Countries"
              name="excludedCountries"
              options={mockCountries}
              value={selectedCountries}
              isMulti
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
            >
              <span className="text-xsm">Include internationally sanctioned countries in search results</span>
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
