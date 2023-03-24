'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cargoesAdapter } from '@/adapters';
import { PlusIcon, TrashIcon } from '@/assets/icons';
import { Button, DatePicker, Dropdown, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getPorts } from '@/services/port';
import { disableDefaultBehaviour } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = () => {
  const [slots, setSlots] = useState(0);
  const [indexes, setIndexes] = useState([]);
  const [portsOption, setPortsOption] = useState(null);
  const tankersInputRef = useRef(null);

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useHookForm();

  useEffect(() => {
    const numberOfCargoes = indexes.length > 0 ? indexes.length : '';
    setValue('numberOfCargoes', numberOfCargoes);
  }, [indexes, setValue]);

  useEffect(() => {
    return tankersInputRef.current && tankersInputRef.current.addEventListener('wheel', disableDefaultBehaviour);
  }, [tankersInputRef]);

  useEffect(() => {
    (async () => {
      const data = await getPorts();
      const portsOptions = data.map(({ id, name }) => {
        return { value: id, label: name };
      });
      setPortsOption(portsOptions);
    })();
  }, []);

  const handleSlotsCount = (event) => {
    clearErrors('numberOfCargoes');

    let numberOfCargoes = Number(event.target.value);
    if (numberOfCargoes > SETTINGS.MAX_NUMBER_OF_TANKERS) numberOfCargoes = SETTINGS.MAX_NUMBER_OF_TANKERS;
    if (numberOfCargoes <= 0) {
      numberOfCargoes = '';
      setValue('applySlots', false);
      setIndexes([]);
    }

    setValue('numberOfCargoes', numberOfCargoes);
    setSlots(numberOfCargoes);
  };

  const handleApply = useCallback(() => {
    const cargoes = cargoesAdapter(slots);

    setIndexes(cargoes);
    setValue('applySlots', cargoes.length > 0);
  }, [setValue, slots]);

  const handleAddSlot = () => {
    setIndexes((prevIndexes) => [...prevIndexes, ...cargoesAdapter(1)]);
  };

  const handleRemoveSlot = (element) => {
    setIndexes((prevIndexes) => {
      const rowIndex = prevIndexes.findIndex((obj) => obj === element);
      return [...prevIndexes.filter((_, index) => index !== rowIndex)];
    });
  };

  const handlePortChange = (data) => {
    const { option, index } = data;
    const fieldName = `cargoes[${index}][port]`;
    setValue(fieldName, option);
  };

  const handleDateChange = useCallback((name, value, index) => setValue(inputName(name, index), value), [setValue]);

  const inputName = (name, index) => `experiences[${index}].${name}`;

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          {...register('numberOfCargoes')}
          label="How many cargoes have you chartered during the last 6 months?"
          placeholder="Cargoes"
          error={errors.numberOfCargoes?.message}
          disabled={isSubmitting}
          type="number"
          ref={tankersInputRef}
          customStyles="z-10 w-full"
          onChange={handleSlotsCount}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[18px] right-1 my-1 !py-1 z-10"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          onClick={handleApply}
          disabled={isSubmitting}
        />
      </div>

      {indexes?.map((element, index) => {
        const rowIndex = indexes.findIndex((obj) => obj === element);

        const fieldName = `cargoes[${index}]`;

        return (
          <div className="grid relative grid-cols-3 justify-center items-center gap-5" key={rowIndex}>
            <Input {...register(`${fieldName}[name]`, index)} type="number" label={`Imo#${index + 1}`} />
            <Dropdown
              name={`${fieldName}[port]`}
              label="Load port"
              options={portsOption}
              onChange={(option) => handlePortChange({ option, index })}
            />
            <DatePicker
              name={`${fieldName}[date]`}
              inputClass="w-full"
              label="Bill of lading date"
              onChange={(value) => handleDateChange(element.date.name, value, index)}
            />
            <Button
              type="button"
              customStyles="absolute -right-8 top-8 !p-0"
              buttonProps={{ icon: <TrashIcon />, variant: 'tertiary', size: 'small' }}
              onClick={() => handleRemoveSlot(element)}
              disabled={isSubmitting}
            />
          </div>
        );
      })}

      {indexes.length > 0 && (
        <div className="flex justify-between">
          <Button
            type="button"
            customStyles="!py-0 !px-0 !text-xsm font-medium !text-blue"
            disabled={indexes?.length >= 10}
            onClick={handleAddSlot}
            buttonProps={{ text: 'Add more ports', variant: 'tertiary', size: 'small', icon: <PlusIcon /> }}
          />
        </div>
      )}
    </div>
  );
};

export default CargoesSlotsDetailsForm;
