'use client';

import PropTypes from 'prop-types';

import { FormDropdown, RangeDatePicker } from '@/elements';
import { getValueWithPath } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PostFixtureFilter = ({ cargoeCodes = [], tankerNames = [], cargoTypes = [] }) => {
  const {
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useHookForm();

  const handleChange = (key, value) => {
    const error = getValueWithPath(errors, key);

    if (getValues(key) === value) return;

    if (error) {
      clearErrors(key);
    }

    setValue(key, value);
  };

  return (
    <div className="w-full flex gap-x-2.5 min-h-[124px]">
      <div className="grid grid-cols-1 2md:grid-cols-2 lg:grid-cols-3 gap-2.5 !w-[calc(100%-450px)]">
        <FormDropdown
          name="cargoId"
          label="Cargo ID"
          placeholder="TY7621"
          options={cargoeCodes}
          disabled={!cargoeCodes?.length}
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
          disabled={!tankerNames?.length}
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
          disabled={!cargoTypes?.length}
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

PostFixtureFilter.propTypes = {
  cargoeCodes: PropTypes.arrayOf(PropTypes.shape({})),
  tankerNames: PropTypes.arrayOf(PropTypes.shape({})),
  cargoTypes: PropTypes.arrayOf(PropTypes.shape({})),
};

export default PostFixtureFilter;
