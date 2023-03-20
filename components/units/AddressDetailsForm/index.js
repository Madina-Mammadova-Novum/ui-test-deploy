'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import PropTypes from 'prop-types';

import { Dropdown, Input } from '@/elements';
import { getCities } from '@/services';

const AddressDetails = ({ title, type, countries }) => {
  const [cities, setCities] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const handleCountryChange = async (option) => {
    clearErrors([`${type}CountryId`, `${type}CityId`]);

    const { value: countryId } = option;
    const data = await getCities(countryId);
    const citiesOptions = data.map(({ cityId, cityName }) => {
      return { value: cityId, label: cityName };
    });
    setValue(`${type}CountryId`, option);
    setValue(`${type}CityId`, null);
    setDisabled(true);
    setCities(citiesOptions);
  };

  const handleCityChange = (option) => {
    setValue(`${type}CityId`, option);
    setDisabled(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        {title ?? <p className="text-black font-semibold text-sm">{title}</p>}
        <div className="grid grid-cols-0 md:grid-cols-2 gap-5">
          <Dropdown label="Country" name={`${type}CountryId`} options={countries} onChange={handleCountryChange} />
          <Dropdown
            label="City"
            name={`${type}CityId`}
            options={cities}
            onChange={handleCityChange}
            disabled={cities.length === 0}
          />
          <Input
            {...register(`${type}State`)}
            label="State / Province / Region (optional)"
            placeholder="NY"
            error={errors[`${type}State`]?.message}
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
          {...register(`${type}AddressOptional`)}
          label="Address line #2 (optional)"
          placeholder="Apartment, suite, unit, building, floor, etc."
          error={errors[`${type}AddressOptional`]?.message}
          disabled={disabled || isSubmitting}
        />
      </div>
    </div>
  );
};

AddressDetails.defaultProps = {
  title: '',
  countries: [{}],
};

AddressDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({})),
};

export default AddressDetails;
