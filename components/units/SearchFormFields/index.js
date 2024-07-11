'use client';

import React, { useEffect, useState } from 'react';

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
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SearchFormFields = ({ productState, setProductState }) => {
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    unregister,
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

  const productsLimitExceeded = productState?.length >= 3;

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
    setProductState((prevState) => [...prevState, availableProductIds.filter((el) => !prevState.includes(el))[0]]);
  };

  const handleRemoveProduct = (id) => {
    clearErrors(`products[${id}]`);
    unregister(`products[${id}]`);
    setProductState((prevState) => prevState.filter((product) => product !== id));
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

  const loadOptions = async (inputValue, callback) => {
    const { data } = await getPortsForSearchForm({ query: inputValue, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  };

  useEffect(() => {
    getCargoes();
  }, []);

  useEffect(() => {
    getPorts();
  }, [perList]);

  useEffect(() => {
    const fetchProducts = async () => {
      const isAlternative = getValues('isAlternative');
      const cargoType = getValues('cargoType');
      const currentProducts = getValues('products');

      if (isAlternative) {
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
      }
    };

    fetchProducts();

    return () => {
      setValue('isAlternative', false);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full flex flex-col gap-y-4 sm:pr-5 sm:mr-5 sm:border-r">
        <div className="flex flex-col 3md:flex-row gap-x-5 gap-y-2.5">
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
            minDate={new Date()}
            onChange={(date) => handleChange('laycanEnd', date)}
            error={errors.laycanEnd?.message}
          />
        </div>
        <div className="flex flex-col 3md:flex-row gap-x-5 gap-y-2.5">
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
        <div className="flex flex-col 3md:flex-row gap-x-5 gap-y-2.5">
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
            label="dischargee terminal"
            loading={terminals.dischargePortTerminals.loading}
            options={terminals.dischargePortTerminals.data}
            disabled={!terminals.dischargePortTerminals.data.length}
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargeTerminal', option)}
            asyncCall
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4">
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
              <div className="flex flex-wrap 3md:flex-nowrap justify-between gap-x-5 gap-y-2.5 items-baseline">
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
                    icon: { after: <TrashAltSVG viewBox="0 0 24 24" className="fill-black w-5 h-5" /> },
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
