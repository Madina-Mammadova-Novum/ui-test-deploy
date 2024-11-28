'use client';

import { useEffect, useState } from 'react';

import debounce from 'lodash/debounce';

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

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    const { data } = await getPortsForSearchForm({ query: inputValue, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  }, 400);

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback(ports);
      return;
    }
    debouncedLoadOptions(inputValue, callback);
  };

  const handleMore = () => setPerList((prev) => prev + 50);

  const handlePortChange = (options) => {
    clearErrors('port');
    setValue('port', options);
  };

  useEffect(() => {
    getPorts();
  }, [perList]);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

  return (
    <div className="relative flex flex-col gap-y-5">
      <div>
        <Label className="text-xs-sm">Tanker name</Label>
        <p className="text-xsm font-semibold text-black">{portName}</p>
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
