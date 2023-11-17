import { useMemo } from 'react';

import { CalculatedDetailsPropTypes } from '@/lib/types';

import PlusCircleSVG from '@/assets/images/plusCircle.svg';
import TrashIcon from '@/assets/images/trashAlt.svg';
import { Button, FormDropdown, Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';
import { toolsCalculatorOptions } from '@/utils/mock';

const CalculatedDetails = ({ isFreight, ports = [], additionalPorts = [], onAdd, onChange, onRemove }) => {
  const { register, errors } = useHookForm();

  const printOptionalProps = useMemo(() => {
    return isFreight ? (
      <Input
        {...register('cargoQuantity')}
        error={errors?.cargoQuantity?.message}
        label="Cargo quantity"
        placeholder="Enter the cargo quantity"
        type="number"
      />
    ) : (
      <Input
        {...register('speed')}
        error={errors?.speed?.message}
        label="Speed (Optional)"
        placeholder="Enter the speed"
        type="number"
      />
    );
  }, [isFreight, errors, register]);

  const printAdditionalPorts = useMemo(() => {
    return additionalPorts?.map((portId) => (
      <div key={portId}>
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
            icon: { before: <TrashIcon viewBox="0 0 24 24" className="fill-black w-5 h-5" /> },
          }}
          customStyles="ml-auto !p-0 !pt-1 [&>span]:!px-0.5"
          onClick={() => onRemove(portId)}
        />
      </div>
    ));
  }, [ports, additionalPorts, onChange, onRemove]);

  return (
    <div className=" gap-y-4 flex flex-col h-full w-[296px]">
      <FormDropdown
        name="calculator"
        onChange={(option) => onChange('calculator', option)}
        options={toolsCalculatorOptions}
        label="Choose a calculator"
      />
      <FormDropdown
        name="fromPort"
        onChange={(option) => onChange('fromPort', option)}
        options={ports}
        disabled={!ports.length}
        label="From which port"
        placeholder="Select port"
      />
      <FormDropdown
        name="toPort"
        onChange={(option) => onChange('toPort', option)}
        options={ports}
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
        disabled={additionalPorts.length >= 3}
        onClick={onAdd}
      />
      <div className="mt-auto">{printOptionalProps}</div>
    </div>
  );
};

CalculatedDetails.propTypes = CalculatedDetailsPropTypes;

export default CalculatedDetails;
