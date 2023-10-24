'use client';

import { useEffect, useState } from 'react';

import { FormDropdown, Input, RangeDatePicker } from '@/elements';
import { getCargoTypes } from '@/services/cargoTypes';
import { convertDataToOptions, getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PostFixtureFilter = () => {
  const {
    setValue,
    clearErrors,
    register,
    getValues,
    formState: { errors },
    watch,
  } = useHookForm();
  const [cargoTypes, setCargoTypes] = useState([]);
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
      const cargoTypesData = await getCargoTypes();
      setCargoTypes(convertDataToOptions(cargoTypesData, 'id', 'name'));
      setInitialLoading(false);
    })();
  }, []);

  return (
    <div className="w-full flex gap-x-2.5 min-h-[124px]">
      <div className="grid grid-cols-1 2md:grid-cols-2 lg:grid-cols-3 gap-2.5 !w-[calc(100%-450px)]">
        <Input {...register('cargoId')} placeholder="TY7621" label="Cargo ID" customStyles="w-full" />
        <Input {...register('tankerName')} label="tanker name" placeholder="Harvey Deep Sea" customStyles="w-full" />
        <FormDropdown
          name="cargoType"
          label="cargo type"
          placeholder="Select cargo type"
          options={cargoTypes}
          disabled={!cargoTypes.length}
          asyncCall={initialLoading}
          onChange={(option) => handleChange('cargoType', option)}
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
