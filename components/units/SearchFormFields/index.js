'use client';

import React, { useState } from 'react'
import { Button, DatePicker, Dropdown, Input } from '@/elements';
import { getValueWithPath, getFilledArray } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';
import { TrashIcon } from '@/assets/icons';
import PlusInCircleSVG from "@/assets/images/plusInCircle.svg"

const SearchFormFields = () => {
  const {
    register,
    clearErrors,
    formState: { errors, isSubmitting },
    setValue,
  } = useHookForm();

  const [productState, setProductState] = useState([0])

  const productsLimitExceeded = productState.length >= 3

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);
    if (error) {
      clearErrors(key);
    }
    setValue(key, value);
  };

  const handleAddProduct = () => {
    setProductState(prevState => (getFilledArray(prevState.length + 1)))
  }

  const handleRemoveProduct = (id) => {
    setProductState(prevState => prevState.filter(product => product !== id))
    setValue(`products[${id}]`, null)
    clearErrors(`products[${id}]`)
  }

  const testOption = [{ label: 'testLabel', value: 'testValue' }];

  return (
    <div className="flex">
      <div className="w-full flex flex-col gap-y-4 pr-5 mr-5 border-r">
        <div className="flex flex-col 3sm:flex-row gap-x-5">
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
        <div className="flex flex-col 3sm:flex-row gap-x-5">
          <Dropdown
            name="loadPort"
            value="54"
            options={testOption}
            id="loadPort"
            label="load port"
            customStyles="w-full"
            onChange={(option) => handleChange('loadPort', option)}
          />
          <Dropdown
            name="loadTerminal"
            options={testOption}
            label="load terminal"
            customStyles="w-full"
            onChange={(option) => handleChange('loadTerminal', option)}
          />
        </div>
        <div className="flex flex-col 3sm:flex-row gap-x-5">
          <Dropdown
            name="dischargePort"
            options={testOption}
            label="discharge port"
            customStyles="w-full"
            onChange={(option) => handleChange('dischargePort', option)}
          />
          <Dropdown
            name="dischargeTerminal"
            options={testOption}
            label="dischargee terminal"
            customStyles="w-full"
            onChange={(option) => handleChange('dischargeTerminal', option)}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4">
        <Dropdown
          label="cargo type"
          name="cargoType"
          id="cargoType"
          options={testOption}
          onChange={(option) => handleChange('cargoType', option)}
        />
        {productState.map((index) => (
          <div key={`product_${index}`}>
            <div className="flex flex-wrap 3sm:flex-nowrap justify-between gap-x-5 gap-y-1">
              <Dropdown
                onChange={(option) => handleChange(`products[${index}].product`, option)}
                name={`products[${index}].product`}
                options={testOption}
                label={`product #${index + 1}`}
                customStyles="w-full 3sm:w-1/2"
              />
              <Input
                {...register(`products[${index}].density`)}
                label="density"
                placeholder="mt/m³"
                customStyles="w-full 3sm:w-2/5"
                error={errors.products ? errors.products[index]?.density?.message : null}
                disabled={isSubmitting}
              />
              <Input
                {...register(`products[${index}].quantity`)}
                label="quantity"
                placeholder="tons"
                customStyles="w-[45%] 3sm:w-2/5"
                error={errors.products ? errors.products[index]?.quantity?.message : null}
                disabled={isSubmitting}
              />
              <Input
                {...register(`products[${index}].tolerance`)}
                label="tolerance"
                type="number"
                placeholder="%"
                customStyles="w-[45%] 3sm:w-1/5"
                error={errors.products ? errors.products[index]?.tolerance?.message : null}
                disabled={isSubmitting}
              />
            </div>
            {!!index && (
              <Button 
                buttonProps={{ text: "Delete", variant: "tertiary", size: "small", suffixIcon: <TrashIcon /> }} 
                customStyles="ml-auto !p-0"
                onClick={() => handleRemoveProduct(index)}
              />
            )}
          </div>
        ))}
        <Button 
          disabled={productsLimitExceeded}
          buttonProps={{ text: "Add more Products", variant: "primary", size: "small", icon: <PlusInCircleSVG />}} 
          customStyles="self-start text-xsm" 
          onClick={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default SearchFormFields;
