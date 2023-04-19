'use client';

import { useEffect, useState } from 'react';

import { PortDetailsFormPropTypes } from '@/lib/types';

import { FormDropdown, Label } from '@/elements';
import { getPorts } from '@/services/port';
import { convertDataToOptions } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PortDetailsForm = ({ portName = '' }) => {
  const { setValue, clearErrors } = useHookForm();

  const [portOptions, setPortOptions] = useState([]);

  const fetchPorts = async () => {
    const data = await getPorts();
    const options = convertDataToOptions(data, 'id', 'name');

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
    <>
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="font-semibold text-black text-xsm">{portName}</p>
      </div>
      <FormDropdown async name="port" label="Port search" options={portOptions} onChange={handlePortChange} />
    </>
  );
};

PortDetailsForm.propTypes = PortDetailsFormPropTypes;

export default PortDetailsForm;
