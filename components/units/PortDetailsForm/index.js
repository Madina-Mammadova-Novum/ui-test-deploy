'use client';

import { useEffect, useState } from 'react';

import { PortDetailsFormPropTypes } from '@/lib/types';

import { countryOptionsAdapter } from '@/adapters/countryOption';
import { FormDropdown, Label } from '@/elements';
import { getPorts } from '@/services/port';
import { useHookForm } from '@/utils/hooks';

const PortDetailsForm = ({ portName = '' }) => {
  const { setValue, clearErrors } = useHookForm();

  const [portOptions, setPortOptions] = useState([]);

  const fetchPorts = async () => {
    const data = await getPorts();
    const options = countryOptionsAdapter(data);

    setPortOptions(options);
  };

  useEffect(() => {
    fetchPorts();
  }, []);

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
      <FormDropdown async name="port" label="Port search" options={portOptions} onChange={handlePortChange} />
    </div>
  );
};

PortDetailsForm.propTypes = PortDetailsFormPropTypes;

export default PortDetailsForm;
