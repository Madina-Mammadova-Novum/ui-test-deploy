'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { AddressDetailsFormPropTypes } from '@/lib/types';

import { FormDropdown, Input } from '@/elements';
import { getCities } from '@/services';
import { convertDataToOptions } from '@/utils/helpers';

const AddressDetails = ({ title, type, countries = [] }) => {
  const [cities, setCities] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const fetchCities = async (id) => {
    const data = await getCities(id);
    const options = convertDataToOptions(data, 'cityId', 'cityName');
    return { options };
  };

  const handleCountryChange = async (data) => {
    clearErrors([`${type}CountryId`, `${type}CityId`]);

    const { value: countryId } = data;
    const { options } = await fetchCities(countryId);

    setValue(`${type}CountryId`, data);
    setValue(`${type}CityId`, null);

    if (options.length > 0) {
      setCities(options);
      setDisabled(false);
    }
  };

  const handleCityChange = (option) => {
    clearErrors(`${type}CityId`);
    setValue(`${type}CityId`, option);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        {title ?? <p className="text-black font-semibold text-sm">{title}</p>}
        <div className="grid grid-cols-2 gap-5">
          <FormDropdown
            name={`${type}CountryId`}
            label="Country"
            options={countries}
            onChange={handleCountryChange}
            async
          />
          <FormDropdown
            label="City"
            name={`${type}CityId`}
            options={cities}
            onChange={handleCityChange}
            disabled={disabled}
            async
          />
          <Input
            {...register(`${type}Province`)}
            label="State / Province / Region (optional)"
            placeholder="NY"
            error={errors[`${type}Province`]?.message}
            disabled={disabled || isSubmitting}
          />
          <Input
            {...register(`${type}PostalCode`)}
            type="text"
            label="Zip / Postal Code (optional)"
            placeholder="10012"
            error={errors[`${type}PostalCode`]?.message}
            disabled={disabled || isSubmitting}
          />
        </div>
        <Input
          {...register(`${type}Address`)}
          label="Address line #1"
          placeholder="Apartment, suite, unit, building, floor, etc."
          error={errors[`${type}Address`]?.message}
          disabled={disabled || isSubmitting}
        />
        <Input
          {...register(`${type}Address2`)}
          label="Address line #2 (optional)"
          placeholder="Apartment, suite, unit, building, floor, etc."
          error={errors[`${type}Address2`]?.message}
          disabled={disabled || isSubmitting}
        />
      </div>
    </div>
  );
};

AddressDetails.propTypes = AddressDetailsFormPropTypes;

export default AddressDetails;
