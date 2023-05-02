'use client';

import React, { useEffect, useState } from 'react';

import { TrashIcon } from '@/assets/icons';
import PlusInCircleSVG from '@/assets/images/plusInCircle.svg';
import { Button, DatePicker, FormDropdown, Input } from '@/elements';
import { CARGO_TYPE_KEY } from '@/lib/constants';
import { getCargoTypes } from '@/services/cargoTypes';
import { getPorts } from '@/services/port';
import { getProducts } from '@/services/product';
import { getTerminals } from '@/services/terminal';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const SearchFormFields = () => {
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    unregister,
  } = useHookForm();

  const [productState, setProductState] = useState([1]);
  const [ports, setPorts] = useState([]);
  const [cargoTypes, setCargoTypes] = useState([]);
  const [products, setProducts] = useState({
    loading: false,
    data: [],
  });
  const [terminals, setTreminals] = useState({
    loadPortTerminals: {
      loading: false,
      data: [],
    },
    dischargePortTerminals: {
      loading: false,
      data: [],
    },
  });

  const productsLimitExceeded = productState.length >= 3;

  const handleChange = async (key, value) => {
    const error = getValueWithPath(errors, key);
    const portKeys = ['loadPort', 'dischargePort'];
    const terminalKeys = {
      loadPort: 'loadTerminal',
      dischargePort: 'dischargeTerminal',
    }

    if(JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }
    setValue(key, value);

    if (portKeys.includes(key)) {
      setValue(terminalKeys[key], null)
      setTreminals((prevState) => ({
        ...prevState,
        [`${key}Terminals`]: {
          loading: true,
          data: prevState[`${key}Terminals`].data,
        },
      }));

      const relatedTerminals = await getTerminals(value.value);
      setTreminals((prevState) => ({
        ...prevState,
        [`${key}Terminals`]: {
          loading: false,
          data: convertDataToOptions(relatedTerminals, 'id', 'name'),
        },
      }));
    }

    if (key === CARGO_TYPE_KEY) {
      productState.map((productId) => setValue(`products[${productId}].product`, null))
      setProducts((prevState) => ({
        ...prevState,
        loading: true,
      }));
      const relatedProducts = await getProducts(value.value);
      setProducts({
        loading: false,
        data: convertDataToOptions(relatedProducts, 'id', 'name'),
      });
    }
  };

  const handleAddProduct = () => {
    const availableProductIds = [1, 2, 3];
    setProductState((prevState) => [...prevState, availableProductIds.filter((el) => !prevState.includes(el))[0]]);
  };

  const handleRemoveProduct = (id) => {
    setProductState((prevState) => prevState.filter((product) => product !== id));
    unregister(`products[${id}]`);
    clearErrors(`products[${id}]`);
  };

  useEffect(() => {
    (async () => {
      const [portsData, cargoTypesData] = await Promise.all([getPorts(), getCargoTypes()]);
      setPorts(convertDataToOptions(portsData, 'id', 'name'));
      setCargoTypes(convertDataToOptions(cargoTypesData, 'id', 'name'));
    })();
  }, []);

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-y-4 pr-5 mr-5 border-r">
        <div className="flex flex-col 3md:flex-row gap-x-5">
          <DatePicker
            label="laycan start"
            inputClass="w-full"
            onChange={(date) => handleChange('laycanStart', date)}
            error={errors.laycanStart?.message}
          />
          <DatePicker
            label="laycan end"
            inputClass="w-full"
            onChange={(date) => handleChange('laycanEnd', date)}
            error={errors.laycanEnd?.message}
          />
        </div>
        <div className="flex flex-col 3md:flex-row gap-x-5">
          <FormDropdown
            name="loadPort"
            options={ports}
            id="loadPort"
            label="load port"
            customStyles={{ className: 'w-full', dropdownWidth: 3 }}
            onChange={(option) => handleChange('loadPort', option)}
          />
          <FormDropdown
            name="loadTerminal"
            asyncCall={terminals.loadPortTerminals.loading}
            options={terminals.loadPortTerminals.data}
            disabled={!terminals.loadPortTerminals.data.length}
            label="load terminal"
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('loadTerminal', option)}
          />
        </div>
        <div className="flex flex-col 3md:flex-row gap-x-5">
          <FormDropdown
            name="dischargePort"
            options={ports}
            label="discharge port"
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargePort', option)}
          />
          <FormDropdown
            name="dischargeTerminal"
            asyncCall={terminals.dischargePortTerminals.loading}
            options={terminals.dischargePortTerminals.data}
            disabled={!terminals.dischargePortTerminals.data.length}
            label="dischargee terminal"
            customStyles={{ className: 'w-full' }}
            onChange={(option) => handleChange('dischargeTerminal', option)}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <FormDropdown
          label="cargo type"
          name="cargoType"
          id="cargoType"
          options={cargoTypes}
          onChange={(option) => handleChange('cargoType', option)}
        />
        {productState.map((productId, index) => (
          <div key={`product_${productId}`}>
            <div className="flex flex-wrap 3md:flex-nowrap justify-between gap-x-5 gap-y-1">
              <FormDropdown
                onChange={(option) => handleChange(`products[${productId}].product`, option)}
                name={`products[${productId}].product`}
                asyncCall={products.loading}
                options={products.data}
                disabled={!products.data.length}
                label={`product #${index + 1}`}
                customStyles={{ className: 'w-full 3md:w-1/2' }}
              />
              <Input
                {...register(`products[${productId}].density`)}
                label="density"
                placeholder="mt/m³"
                customStyles="w-full 3md:w-2/5"
                error={errors.products ? errors.products[productId]?.density?.message : null}
                disabled={isSubmitting}
              />
              <Input
                {...register(`products[${productId}].quantity`)}
                label="Quantity"
                placeholder="tons"
                customStyles="w-[45%] 3md:w-2/5"
                error={errors.products ? errors.products[productId]?.quantity?.message : null}
                disabled={isSubmitting}
              />
              <Input
                {...register(`products[${productId}].tolerance`)}
                label="Tolerance"
                type="number"
                placeholder="%"
                customStyles="w-[45%] 3md:w-1/5"
                error={errors.products ? errors.products[productId]?.tolerance?.message : null}
                disabled={isSubmitting}
              />
            </div>
            {productState.length > 1 && (
              <Button
                buttonProps={{ text: 'Delete', variant: 'tertiary', size: 'small', icon: { after: <TrashIcon /> } }}
                customStyles="ml-auto !p-0"
                onClick={() => handleRemoveProduct(productId)}
              />
            )}
          </div>
        ))}
        <Button
          disabled={productsLimitExceeded}
          buttonProps={{
            text: 'Add more Products',
            variant: 'primary',
            size: 'small',
            icon: { before: <PlusInCircleSVG /> },
          }}
          customStyles="self-start text-xsm !px-0 !py-0"
          onClick={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default SearchFormFields;
