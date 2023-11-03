'use client';

import { useEffect, useState } from 'react';

import { FormDropdown, RangeDatePicker } from '@/elements';
import { getPostFixtureCargoCodes } from '@/services/cargo';
import { getCargoTypes } from '@/services/cargoTypes';
import { getPostFixtureTankerNames } from '@/services/vessel';
import { convertDataToOptions, getValueWithPath, options } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PostFixtureFilter = () => {
  const {
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
    watch,
  } = useHookForm();
  const [cargoTypes, setCargoTypes] = useState([]);
  const [cargoCodes, setCargoCodes] = useState([]);
  const [tankerNames, setTankerNames] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);

    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    if (error) {
      clearErrors(key);
    }

    setValue(key, value);
  };

  useEffect(() => {
    (async () => {
      setInitialLoading(true);
      const [cargoTypesData, cargoCodesData, tankerNamesData] = await Promise.all([
        getCargoTypes(),
        getPostFixtureCargoCodes(),
        getPostFixtureTankerNames(),
      ]);
      setCargoTypes(convertDataToOptions(cargoTypesData, 'id', 'name'));
      setCargoCodes(options(cargoCodesData?.data || []));
      setTankerNames(options(tankerNamesData?.data || []));
      setInitialLoading(false);
    })();
  }, []);

  return (
    <div className="w-full flex gap-x-2.5 min-h-[124px]">
      <div className="grid grid-cols-1 2md:grid-cols-2 lg:grid-cols-3 gap-2.5 !w-[calc(100%-450px)]">
        <FormDropdown
          name="cargoId"
          label="Cargo ID"
          placeholder="TY7621"
          options={cargoCodes}
          disabled={!cargoCodes.length}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('cargoId', option)}
          classNames={{
            placeholder: () => 'overflow-hidden text-ellipsis whitespace-nowrap',
          }}
        />
        <FormDropdown
          name="tankerName"
          label="Tanker name"
          placeholder="Harvey Deep Sea"
          options={tankerNames}
          disabled={!tankerNames.length}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('tankerName', option)}
          classNames={{
            placeholder: () => 'overflow-hidden text-ellipsis whitespace-nowrap',
          }}
        />
        <FormDropdown
          name="cargoType"
          label="cargo type"
          placeholder="Select cargo type"
          options={cargoTypes}
          disabled={!cargoTypes.length}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('cargoType', option)}
          classNames={{
            placeholder: () => 'overflow-hidden text-ellipsis whitespace-nowrap',
          }}
          customStyles={{
            className: '2md:col-span-2 lg:col-span-1',
          }}
        />
      </div>

      <RangeDatePicker
        label="Fixture date"
        name="rangeDate"
        onChange={(date) => handleChange('rangeDate', date)}
        value={watch('rangeDate')}
      />
    </div>
  );
};

PostFixtureFilter.propTypes = {};

export default PostFixtureFilter;
