'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import classNames from 'classnames';
import debounce from 'lodash/debounce';

import { AddressDetailsFormPropTypes } from '@/lib/types';

import { FormDropdown, Input } from '@/elements';
import { ADDRESS_FORM } from '@/lib/constants';
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
  const [citiesLoader, setCitiesLoader] = useState(false);
  const [perList, setPerList] = useState(ADDRESS_FORM.PER_LIST_INITIAL);
  const [disabled, setDisabled] = useState(false);

  const fetchCities = async (
    countryId,
    { query = '', skip = 0, pageSize = ADDRESS_FORM.DEBOUNCED_LOAD_PAGE_SIZE } = {}
  ) => {
    const response = await getCities(countryId, { query, skip, pageSize });
    const options = convertDataToOptions(response, 'cityId', 'cityName');

    return { options };
  };

  const loadCities = async (countryId) => {
    setCitiesLoader(true);
    const { options } = await fetchCities(countryId, { pageSize: perList });
    setCities(options);
    setCitiesLoader(false);
  };

  const debouncedLoadOptions = debounce(async (countryId, inputValue, callback) => {
    const { options } = await fetchCities(countryId, {
      query: inputValue,
      pageSize: ADDRESS_FORM.DEBOUNCED_LOAD_PAGE_SIZE,
    });
    callback(options);
  }, 400);

  const loadOptions = (inputValue, callback) => {
    const selectedCountry = getValues(`${type}Country`);
    if (!selectedCountry?.value) {
      callback([]);
      return;
    }

    if (!inputValue) {
      callback(cities);
      return;
    }
    debouncedLoadOptions(selectedCountry.value, inputValue, callback);
  };

  const handleMore = () => setPerList((prev) => prev + ADDRESS_FORM.LOAD_MORE_INCREMENT);

  const handleCountryChange = async (data) => {
    clearErrors([`${type}Country`, `${type}City`]);

    setValue(`${type}Country`, data);
    setValue(`${type}City`, null);

    setDisabled(true);
    setCities([]);
    setPerList(ADDRESS_FORM.PER_LIST_INITIAL);

    const { value: countryId } = data;
    await loadCities(countryId);

    setDisabled(false);
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

  useEffect(() => {
    const selectedCountry = getValues(`${type}Country`);
    if (selectedCountry?.value) {
      loadCities(selectedCountry.value);
    }
  }, [perList]);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

  const renderBadge = (fieldType) => {
    if (pendingRequest) {
      getValues(`${type}Country`);
      const field = `${type}${fieldType}`;
      const fieldValue = getValues(field);
      const isPending = pending[field] === fieldValue;
      const colorClass = isPending ? 'text-green' : 'text-blue';

      return <p className={classNames('font-bold', colorClass)}>{pending[field]}</p>;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5">
        {title && <p className="text-sm font-semibold text-black">{title}</p>}
        <div className="grid gap-5 md:grid-cols-2">
          <FormDropdown
            name={`${type}Country`}
            label="Country"
            labelBadge="*"
            disabled={countries?.length === 0}
            options={countries}
            onChange={handleCountryChange}
          />
          <FormDropdown
            label="State/City"
            labelBadge="*"
            name={`${type}City`}
            options={cities}
            onChange={handleCityChange}
            loading={citiesLoader}
            disabled={disabled || countries?.length === 0}
            asyncCall
            onMenuScrollToBottom={handleMore}
            loadOptions={loadOptions}
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
          label="Address line #1 *"
          labelBadge={renderBadge('Address')}
          placeholder="Street address, number, etc."
          error={errors[`${type}Address`]?.message}
          disabled={disabled || isSubmitting}
        />
        <Input
          {...register(`${type}Address2`)}
          label="Address line #2 (optional)"
          labelBadge={renderBadge('Address2')}
          placeholder="Building, floor, suite, unit, etc."
          error={errors[`${type}Address2`]?.message}
          disabled={disabled || isSubmitting}
        />
      </div>
    </div>
  );
};

AddressDetails.propTypes = AddressDetailsFormPropTypes;

export default AddressDetails;
