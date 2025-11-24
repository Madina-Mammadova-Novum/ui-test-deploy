'use client';

import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { addDays } from 'date-fns';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, CheckBoxInput, DatePicker, FormDropdown, Input } from '@/elements';
import { CARGO_TYPE_KEY } from '@/lib/constants';
import { getCargoTypes } from '@/services/cargoTypes';
import { getPortsForSearchForm } from '@/services/port';
import { getProducts } from '@/services/product';
import { getTerminals } from '@/services/terminal';
import { getSearchSelector } from '@/store/selectors';
import { AdditionalDischargeForm, Captcha } from '@/units';
import {
  convertDataToOptions,
  convertTerminalDataToOptions,
  formatCurrency,
  getValueWithPath,
  shouldShowCaptcha,
} from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SearchFormFields = ({
  productState,
  setProductState,
  captchaRef,
  isAccountSearch = false,
  maxQuantity = null,
}) => {
  const { searchParams } = useSelector(getSearchSelector);

  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting, submitCount },
    setValue,
    getValues,
    control,
    trigger,
  } = useHookForm();

  const [initialLoading, setInitialLoading] = useState(false);
  const [portsLoader, setPortsLoader] = useState(false);
  const [additionalDischargeOptions, setAdditionalDischargeOptions] = useState({});
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
  const [captcha, setCaptcha] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  const watchedLaycanStart = useWatch({
    control,
    name: 'laycanStart',
  });

  const watchedLaycanEnd = useWatch({
    control,
    name: 'laycanEnd',
  });

  const watchedLoadPort = useWatch({
    control,
    name: 'loadPort',
  });

  const watchedLoadTerminal = useWatch({
    control,
    name: 'loadTerminal',
  });

  const watchedDischargePort = useWatch({
    control,
    name: 'dischargePort',
  });

  const showAdditionalDischargeValue = useWatch({
    control,
    name: 'showAdditionalDischarge',
  });

  const watchedCargoType = useWatch({
    control,
    name: 'cargoType',
  });

  const minDateForLaycanEnd = watchedLaycanStart ? new Date(watchedLaycanStart) : new Date();
  const maxDateForLaycanEnd = watchedLaycanStart ? addDays(new Date(watchedLaycanStart), 2) : null;

  const productsLimitExceeded = productState?.length >= 3;
  const isSavedSearch = getValues('isSavedSearch');
  const isAlternative = getValues('isAlternative');

  const handleMore = () => setPerList((prev) => prev + 100);

  const handleShowAdditionalDischargeChange = (e) => {
    setValue('showAdditionalDischarge', e.target.checked);

    // setShowAdditionalDischarge(e.target.checked);
    if (!e.target.checked) {
      // Set empty initial values instead of null to prevent "some" errors
      setValue('additionalDischargeOptions', {});
      setValue('sanctionedCountries', []);
      setValue('excludedCountries', []);
      setValue('excludeInternationallySanctioned', false);
      setAdditionalDischargeOptions({});
    }
  };

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);
    const portKeys = ['loadPort', 'dischargePort'];

    const terminalKeys = {
      loadPort: 'loadTerminal',
      dischargePort: 'dischargeTerminal',
    };

    const oppositePortKey = {
      loadPort: 'dischargePort',
      dischargePort: 'loadPort',
    };

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }

    // Check if user selected the same port that's already selected in the opposite field
    if (portKeys.includes(key)) {
      const oppositePort = getValues(oppositePortKey[key]);
      if (oppositePort && value && oppositePort.value === value.value) {
        // Clear the opposite port if same port is selected
        setValue(oppositePortKey[key], null);
        setValue(terminalKeys[oppositePortKey[key]], null);
      }
    }

    setValue(key, value);

    // Auto-set laycanEnd to laycanStart + 2 days when laycanStart changes
    if (key === 'laycanStart' && value) {
      // Format is already in yyyy-MM-dd from the DatePicker component
      const newLaycanEnd = addDays(new Date(value), 2);
      // We maintain the same string format as the input
      setValue('laycanEnd', newLaycanEnd.toISOString().split('T')[0]);
      clearErrors('laycanEnd');
    }

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
          data: convertTerminalDataToOptions(relatedTerminals),
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
      // Initialize the new product slot with empty values to prevent form state issues
      setValue(
        `products[${newProductId}]`,
        {
          product: null,
          density: '',
          quantity: '',
          tolerance: '',
        },
        { shouldValidate: false, shouldDirty: false }
      );

      setProductState((prevState) => [...prevState, newProductId]);
    }
  };

  const handleRemoveProduct = (id) => {
    // Clear errors for the product being removed
    clearErrors(`products[${id}]`);

    // Get all current products
    const allProducts = getValues('products') || [];

    // Build a mapping of current productState indices to their values
    const productMap = {};
    productState.forEach((productId) => {
      if (productId !== id && allProducts[productId]) {
        productMap[productId] = allProducts[productId];
      }
    });

    // Update productState first (remove the deleted id)
    const newProductState = productState.filter((product) => product !== id);
    setProductState(newProductState);

    // Rebuild the products array based on the new productState order
    const newProductsArray = [];
    newProductState.forEach((productId) => {
      newProductsArray[productId] = productMap[productId];
    });

    // Update form with new products array
    setValue('products', newProductsArray, { shouldValidate: false, shouldDirty: false });
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

  // Mark ports as disabled if they're selected in the opposite dropdown
  const getPortsWithDisabled = (excludePort) => {
    if (!excludePort?.value) return ports;
    return ports.map((port) => ({
      ...port,
      isDisabled: port.value === excludePort.value,
    }));
  };

  // Mark async loaded ports as disabled if they're selected in the opposite dropdown
  const getLoadOptionsWithDisabled = (excludePort) => (inputValue, callback) => {
    if (!inputValue) {
      callback(getPortsWithDisabled(excludePort));
      return;
    }

    debouncedLoadOptions(inputValue, (options) => {
      if (!excludePort?.value) {
        callback(options);
        return;
      }
      callback(
        options.map((port) => ({
          ...port,
          isDisabled: port.value === excludePort.value,
        }))
      );
    });
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
    if (!showAdditionalDischargeValue) setAdditionalDischargeOptions({});
  }, [showAdditionalDischargeValue]);

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
          const productId = currentProduct?.product?.value;
          const relatedProduct = relatedProductsMap[productId];

          if (relatedProduct) {
            currentProduct.product.density = relatedProduct?.density;
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
                  data: convertTerminalDataToOptions(loadPortTerminals),
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
                  data: convertTerminalDataToOptions(dischargePortTerminals),
                },
              }));
            })(),
        ]);
      }
    };

    if (isSavedSearch) setAdditionalDischargeOptions({ ...searchParams });

    fetchProducts();
    return () => {
      setValue('isSavedSearch', false);
    };
  }, [isSavedSearch]);

  useEffect(() => {
    if (!isAccountSearch && shouldShowCaptcha()) {
      setValue('captcha', captcha);
      trigger('captcha');
    }
  }, [captcha, setValue, trigger, isAccountSearch]);

  useEffect(() => {
    if (!isAccountSearch) {
      setShowCaptcha(!!watchedLaycanStart && !!watchedLaycanEnd && !!watchedLoadPort && !!watchedLoadTerminal);
    }
  }, [watchedLaycanStart, watchedLaycanEnd, watchedLoadPort, watchedLoadTerminal, isAccountSearch]);

  return (
    <div className="flex flex-col gap-y-4 md:flex-row">
      <div className="flex w-full flex-col gap-y-4 md:mr-5 md:border-r md:pr-5">
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <DatePicker
            label="laycan start"
            labelBadge="*"
            inputClass="w-full"
            containerClass="w-full"
            name="laycanStart"
            placeholder="Select Laycan Start"
            minDate={new Date()}
            onChange={(date) => handleChange('laycanStart', date)}
            error={errors.laycanStart?.message}
          />
          <DatePicker
            label="laycan end"
            labelBadge="*"
            inputClass="w-full"
            containerClass="w-full"
            name="laycanEnd"
            placeholder="Select Laycan End"
            minDate={minDateForLaycanEnd}
            maxDate={maxDateForLaycanEnd}
            onChange={(date) => handleChange('laycanEnd', date)}
            error={errors.laycanEnd?.message}
            disabled={!watchedLaycanStart}
          />
        </div>
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <FormDropdown
            asyncCall
            id="loadPort"
            name="loadPort"
            label="load port"
            labelBadge="*"
            options={getPortsWithDisabled(watchedDischargePort)}
            loading={portsLoader}
            onMenuScrollToBottom={handleMore}
            loadOptions={getLoadOptionsWithDisabled(watchedDischargePort)}
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
            labelBadge="*"
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('loadTerminal', option)}
            asyncCall
          />
        </div>
        <div className="flex flex-col gap-x-5 gap-y-2.5 3md:flex-row">
          <FormDropdown
            name="dischargePort"
            label="discharge port"
            labelBadge="*"
            options={getPortsWithDisabled(watchedLoadPort)}
            loading={portsLoader}
            loadOptions={getLoadOptionsWithDisabled(watchedLoadPort)}
            onMenuScrollToBottom={handleMore}
            disabled={initialLoading}
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargePort', option)}
            asyncCall
          />
          <FormDropdown
            name="dischargeTerminal"
            label="discharge terminal"
            labelBadge="*"
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
          checked={showAdditionalDischargeValue}
          onChange={handleShowAdditionalDischargeChange}
          labelStyles="text-blue hover:text-blue-darker text-xsm"
          boxStyles="!gap-1.5"
        >
          Add additional discharge options
        </CheckBoxInput>

        {showAdditionalDischargeValue && (
          <AdditionalDischargeForm showError={submitCount > 0} data={additionalDischargeOptions} />
        )}
      </div>

      <div className="flex w-full flex-col gap-y-4">
        <FormDropdown
          label="cargo type"
          labelBadge="*"
          name="cargoType"
          id="cargoType"
          options={cargoTypes}
          disabled={!cargoTypes.length}
          loading={initialLoading}
          onChange={(option) => handleChange('cargoType', option)}
          asyncCall
        />
        {productState?.map((productId, index) => {
          const selectedProduct = getValues(`products[${productId}].product`);
          const { density = {} } = selectedProduct || {};
          const isProductSelected = !!selectedProduct?.value;

          const minValue = parseFloat(density?.min?.toFixed(4)).toString();
          const maxValue = parseFloat(density?.max?.toFixed(4)).toString();

          const helperTextDensity = density.min && density.max ? `${minValue} - ${maxValue} mt/m³` : '';
          const helperTextTolerance = isProductSelected ? '1% - 20%' : '';
          const helperTextQuantity =
            isProductSelected && maxQuantity
              ? `1,000 - ${formatCurrency(maxQuantity)} MT`
              : isProductSelected
                ? '1,000 MT - ∞'
                : '';

          return (
            <div key={`product_${productId}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2.5 3md:flex-nowrap">
                <FormDropdown
                  onChange={async (option) => {
                    setSelected(!selected);
                    await handleChange(`products[${productId}].product`, option);
                    // Trigger density validation after product selection
                    const currentDensity = getValues(`products[${productId}].density`);
                    if (currentDensity) {
                      trigger(`products[${productId}].density`);
                    }
                  }}
                  name={`products[${productId}].product`}
                  loading={products.loading}
                  asyncCall
                  options={products.data}
                  disabled={!watchedCargoType || !products.data.length || isSubmitting}
                  label={`product #${index + 1}`}
                  labelBadge="*"
                  customStyles={{ className: 'w-full 3md:w-1/2' }}
                />
                <Input
                  {...register(`products[${productId}].density`)}
                  label="density"
                  labelBadge="*"
                  type="number"
                  placeholder="mt/m³"
                  customStyles="w-full 3md:w-2/5"
                  helperText={helperTextDensity}
                  error={errors.products ? errors.products[productId]?.density?.message : null}
                  disabled={!isProductSelected || isSubmitting}
                  min={String(density.min)}
                  max={String(density.max)}
                  step="any"
                />
                <Input
                  {...register(`products[${productId}].quantity`)}
                  label="Quantity"
                  labelBadge="*"
                  type="number"
                  placeholder="tons"
                  customStyles="w-full md:w-[45%] 3md:w-2/5"
                  helperText={helperTextQuantity}
                  error={errors.products ? errors.products[productId]?.quantity?.message : null}
                  disabled={!isProductSelected || isSubmitting}
                  min="1000"
                  max={maxQuantity ? String(maxQuantity) : undefined}
                />
                <Input
                  {...register(`products[${productId}].tolerance`)}
                  label="Tolerance"
                  labelBadge="*"
                  type="number"
                  placeholder="%"
                  customStyles="w-full md:w-[45%] 3md:w-1/5"
                  helperText={helperTextTolerance}
                  error={errors.products ? errors.products[productId]?.tolerance?.message : null}
                  disabled={!isProductSelected || isSubmitting}
                  min="1"
                  max="20"
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
                  disabled={isSubmitting}
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
        {!isAccountSearch && showCaptcha && shouldShowCaptcha() && <Captcha onChange={setCaptcha} ref={captchaRef} />}
      </div>
    </div>
  );
};

SearchFormFields.propTypes = {
  productState: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProductState: PropTypes.func.isRequired,
  captchaRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isAccountSearch: PropTypes.bool,
  maxQuantity: PropTypes.number,
};

export default SearchFormFields;
