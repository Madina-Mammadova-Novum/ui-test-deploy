'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import classnames from 'classnames';

import { AddressDetailsFormPropTypes } from '@/lib/types';

import { FormDropdown, Input } from '@/elements';
import { getCities } from '@/services';
import { convertDataToOptions } from '@/utils/helpers';

const AddressDetails = ({ title, type, countries = [] }) => {
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const values = getValues();

  const { pending, pendingRequest } = values;

  const [cities, setCities] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const fetchCities = async (id) => {
    const data = await getCities(id);
    const options = convertDataToOptions(data, 'cityId', 'cityName');

    return { options };
  };

  const handleCountryChange = async (data) => {
    clearErrors([`${type}Country`, `${type}City`]);

    setValue(`${type}Country`, data);
    setValue(`${type}City`, null);

    setDisabled(true);
    setCities([]);

    const { value: countryId } = data;
    const { options } = await fetchCities(countryId);

    if (options.length > 0) {
      setCities(options);
      setDisabled(false);
    }
  };

  const handleCityChange = (option) => {
    clearErrors(`${type}City`);
    setValue(`${type}City`, option);
  };

  useEffect(() => {
    if (getValues(`${type}Country`) || getValues(`${type}City`)) {
      setDisabled(false);
    }
  }, [getValues, type]);

  const renderBadge = (fieldType) => {
    if (pendingRequest) {
      getValues(`${type}Country`);
      const field = `${type}${fieldType}`;
      const fieldValue = getValues(field);
      const isPending = pending[field] === fieldValue;
      const colorClass = isPending ? 'text-green' : 'text-blue';

      return <p className={classnames('font-bold', colorClass)}>{pending[field]}</p>;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        {title ?? <p className="text-black font-semibold text-sm">{title}</p>}
        <div className="grid grid-cols-2 gap-5">
          <FormDropdown
            name={`${type}Country`}
            label="Country"
            disabled={countries?.length === 0}
            options={countries}
            onChange={handleCountryChange}
          />
          <FormDropdown
            label="City"
            name={`${type}City`}
            options={cities}
            onChange={handleCityChange}
            loading={disabled}
            disabled={disabled || countries?.length === 0}
            asyncCall
          />
          <Input
            {...register(`${type}Province`)}
            label="State / Province / Region (optional)"
            labelBadge={renderBadge('Province')}
            placeholder="NY"
            error={errors[`${type}Province`]?.message}
            disabled={disabled || isSubmitting}
          />
          <Input
            {...register(`${type}PostalCode`)}
            type="text"
            label="Zip / Postal Code (optional)"
            labelBadge={renderBadge('PostalCode')}
            placeholder="10012"
            error={errors[`${type}PostalCode`]?.message}
            disabled={disabled || isSubmitting}
          />
        </div>
        <Input
          {...register(`${type}Address`)}
          label="Address line #1"
          labelBadge={renderBadge('Address')}
          placeholder="Apartment, suite, unit, building, floor, etc."
          error={errors[`${type}Address`]?.message}
          disabled={disabled || isSubmitting}
        />
        <Input
          {...register(`${type}Address2`)}
          label="Address line #2 (optional)"
          labelBadge={renderBadge('Address2')}
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
