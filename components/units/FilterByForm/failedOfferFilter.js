'use client';

import PropTypes from 'prop-types';

import { FormDropdown, RangeDatePicker } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const FailedOffersFilter = ({ cargoCodes = [], tankerNames = [], cargoTypes = [] }) => {
  const { watch, setValue, getValues } = useHookForm();

  const handleChange = (key, value) => {
    if (JSON.stringify(getValues(key)) === JSON.stringify(value)) return;

    setValue(key, value);
  };

  return (
    <div className="flex min-h-[124px] w-full flex-col gap-2.5 2md:flex-row">
      <div className="grid w-1/2 grid-cols-1 gap-2.5 2md:!w-[calc(100%-450px)] 2md:grid-cols-2 lg:grid-cols-3">
        <FormDropdown
          name="stage"
          label="Offer stage"
          placeholder="Negotiating"
          options={cargoCodes}
          disabled={!cargoCodes?.length}
          onChange={(option) => handleChange('stage', option)}
          classNames={{
            placeholder: () => 'overflow-hidden text-ellipsis whitespace-nowrap',
          }}
        />
        <FormDropdown
          name="cargoId"
          label="Cargo ID"
          placeholder="TY7621"
          options={cargoCodes}
          disabled={!cargoCodes?.length}
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

FailedOffersFilter.propTypes = {
  cargoCodes: PropTypes.arrayOf(PropTypes.shape({})),
  tankerNames: PropTypes.arrayOf(PropTypes.shape({})),
  cargoTypes: PropTypes.arrayOf(PropTypes.shape({})),
};

export default FailedOffersFilter;
