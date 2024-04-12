'use client';

import { useEffect, useState } from 'react';

import { PortDetailsFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { FormDropdown, Label } from '@/elements';
import { getPortsForSearchForm } from '@/services';
import { useHookForm } from '@/utils/hooks';

const PortDetailsForm = ({ portName = '' }) => {
  const { setValue, clearErrors } = useHookForm();

  const [portsLoader, setPortsLoader] = useState(false);

  const [ports, setPorts] = useState([]);
  const [perList, setPerList] = useState(50);

  const getPorts = async () => {
    setPortsLoader(true);
    const { data } = await getPortsForSearchForm({ pageSize: perList });
    setPorts(dropDownOptionsAdapter({ data }));
    setPortsLoader(false);
  };

  const loadOptions = async (inputValue, callback) => {
    const { data } = await getPortsForSearchForm({ query: inputValue, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  };

  const handleMore = () => setPerList((prev) => prev + 50);

  const handlePortChange = (options) => {
    clearErrors('port');
    setValue('port', options);
  };

  useEffect(() => {
    getPorts();
  }, [perList]);

  return (
    <div className="flex flex-col gap-y-5 relative">
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="font-semibold text-black text-xsm">{portName}</p>
      </div>
      <FormDropdown
        asyncCall
        id="portSearch"
        name="port"
        label="Port search"
        options={ports}
        loading={portsLoader}
        onMenuScrollToBottom={handleMore}
        loadOptions={loadOptions}
        onChange={handlePortChange}
        customStyles={{ dropdownExpanded: true }}
      />
    </div>
  );
};

PortDetailsForm.propTypes = PortDetailsFormPropTypes;

export default PortDetailsForm;
