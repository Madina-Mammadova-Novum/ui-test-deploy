'use client';

import PropTypes from 'prop-types';

import { FormDropdown, RangeDatePicker } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const FailedOffersFilter = ({
  cargoCodes = [],
  tankerNames = [],
  cargoTypes = [],
  loading = { cargoCodes: false, cargoTypes: false, vesselNames: false },
}) => {
  const { watch, setValue, getValues } = useHookForm();

  const stageList = [
    { label: 'Negotiating', value: 'negotiating' },
    { label: 'Pre-fixture', value: 'pre-fixture' },
    { label: 'On-subs', value: 'on-subs' },
  ];

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
          placeholder="Select stages"
          options={stageList}
          // closeMenuOnSelect={false}
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
          disabled={!cargoCodes?.length || loading.cargoCodes}
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
          disabled={!tankerNames?.length || loading.vesselNames}
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
          disabled={!cargoTypes?.length || loading.cargoTypes}
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
  loading: PropTypes.shape({
    cargoCodes: PropTypes.bool,
    cargoTypes: PropTypes.bool,
    vesselNames: PropTypes.bool,
  }),
};

export default FailedOffersFilter;
