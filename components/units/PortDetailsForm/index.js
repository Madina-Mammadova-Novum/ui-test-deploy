/* eslint-disable no-unused-vars */

'use client';

import { useSelector } from 'react-redux';

import { PortDetailsFormPropTypes } from '@/lib/types';

import { FormDropdown, Label } from '@/elements';
import { getGeneralDataSelector } from '@/store/selectors';
import { countriesOptions } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PortDetailsForm = ({ portName = '' }) => {
  const { ports } = useSelector(getGeneralDataSelector);
  const { setValue, clearErrors, getValues } = useHookForm();

  const handlePortChange = (options) => {
    clearErrors('port');
    setValue('port', options);
  };

  return (
    <div className="flex flex-col gap-y-5 relative">
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="font-semibold text-black text-xsm">{portName}</p>
      </div>
      <FormDropdown
        name="port"
        label="Port search"
        options={countriesOptions(ports?.searchPorts)}
        onChange={handlePortChange}
        customStyles={{ dropdownExpanded: true }}
      />
    </div>
  );
};

PortDetailsForm.propTypes = PortDetailsFormPropTypes;

export default PortDetailsForm;
