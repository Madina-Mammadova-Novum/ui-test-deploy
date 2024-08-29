'use client';

import { useEffect, useMemo, useState } from 'react';

import { CalculatedDetailsPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashIcon from '@/assets/images/trashAlt.svg';
import { Button, FormDropdown, Input } from '@/elements';
import { getPortsForSearchForm } from '@/services/port';
import { useHookForm } from '@/utils/hooks';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedDetails = ({ isFreight, additionalPorts = [], onAdd, onChange, onRemove }) => {
  const { register, errors } = useHookForm();
  const handleMore = () => setPerList((prev) => prev + 100);

  const [portsLoader, setPortsLoader] = useState(false);
  const [perList, setPerList] = useState(100);

  const [ports, setPorts] = useState([]);

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

  const printOptionalProps = useMemo(() => {
    return isFreight ? (
      <Input
        {...register('cargoQuantity')}
        error={errors?.cargoQuantity?.message}
        label="Cargo quantity"
        placeholder="Enter the cargo quantity"
        type="number"
        helperText="Min value: 1000"
        min="1000"
      />
    ) : (
      <Input
        {...register('speed')}
        error={errors?.speed?.message}
        label="Speed (Optional)"
        placeholder="Enter the speed (Default: 11)"
        type="number"
        step=".1"
        max="12"
        min="0.1"
      />
    );
  }, [isFreight, errors, register]);

  const printAdditionalPorts = useMemo(() => {
    return additionalPorts?.map((portId) => (
      <div key={portId} className="relative">
        <FormDropdown
          name={`additionalPorts[${portId}].port`}
          onChange={(option) => onChange(`additionalPorts[${portId}].port`, option)}
          options={ports}
          label="Additional port"
          placeholder="Select port"
        />
        <Button
          buttonProps={{
            text: 'Delete',
            variant: 'tertiary',
            size: 'small',
            icon: { before: <TrashIcon viewBox="0 0 24 24" className="h-5 w-5 fill-black" /> },
          }}
          customStyles="absolute right-0 -bottom-6 !p-0 !pt-1 [&>span]:!px-0.5"
          onClick={() => onRemove(portId)}
        />
      </div>
    ));
  }, [ports, additionalPorts, onChange, onRemove]);

  useEffect(() => {
    getPorts();
  }, [perList]);

  return (
    <div className="flex h-full w-full max-w-[336px] flex-col gap-y-4">
      <FormDropdown
        name="calculator"
        onChange={(option) => onChange('calculator', option)}
        options={toolsCalculatorOptions}
        label="Choose a calculator"
      />
      <FormDropdown
        asyncCall
        name="fromPort"
        onChange={(option) => onChange('fromPort', option)}
        options={ports}
        loading={portsLoader}
        onMenuScrollToBottom={handleMore}
        loadOptions={loadOptions}
        disabled={!ports.length}
        label="From which port"
        placeholder="Select port"
      />
      <FormDropdown
        asyncCall
        name="toPort"
        onChange={(option) => onChange('toPort', option)}
        options={ports}
        loading={portsLoader}
        onMenuScrollToBottom={handleMore}
        loadOptions={loadOptions}
        disabled={!ports.length}
        label="To which port"
        placeholder="Select port"
      />
      {printAdditionalPorts.length > 0 && printAdditionalPorts}
      <Button
        buttonProps={{
          text: 'Add more ports',
          variant: 'primary',
          size: 'small',
          icon: { before: <PlusCircleSVG className="fill-blue group-hover:fill-blue-darker" /> },
          helperText: '(max 3 ports)',
        }}
        customStylesFromWrap="self-baseline !items-start [&>span]:!ml-6"
        customStyles="!p-0"
        // disabled={additionalPorts.length >= 3}
        disabled
        onClick={onAdd}
      />
      <div className="sm:mb-16">{printOptionalProps}</div>
    </div>
  );
};

CalculatedDetails.propTypes = CalculatedDetailsPropTypes;

export default CalculatedDetails;
