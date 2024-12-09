'use client';

import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addDays } from 'date-fns';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, DatePicker, FormDropdown, Input } from '@/elements';
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

  console.log({ ports });

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
      </div>
    </div>
  );
};

SearchFormFields.propTypes = {
  productState: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProductState: PropTypes.func.isRequired,
};

export default SearchFormFields;
