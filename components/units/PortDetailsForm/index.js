import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { AsyncDropdown, Label } from '@/elements';
import { getPorts } from '@/services/port';
import { convertDataToOptions } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const PortDetailsForm = ({ portName }) => {
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
      <AsyncDropdown name="port" label="Port search" options={portOptions} onChange={handlePortChange} />
    </>
  );
};

PortDetailsForm.propTypes = {
  portName: PropTypes.string,
};

export default PortDetailsForm;
