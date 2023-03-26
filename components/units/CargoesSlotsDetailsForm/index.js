'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { PlusIcon, TrashIcon } from '@/assets/icons';
import { AsyncDropdown, Button, DatePicker, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getPorts } from '@/services/port';
import { cargoesTemplate, convertDataToOptions, disableDefaultBehaviour } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = () => {
  const [cargoesState, setCargoesState] = useState({
    slots: 0,
    indexes: [],
    portsOptions: null,
  });

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const cargoesInputRef = useRef(null);
  const { slots, portsOptions, indexes } = cargoesState;

  const handleChangeState = (key, value) =>
    setCargoesState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleSlotsCount = (event) => {
    clearErrors('numberOfCargoes');

    let numberOfCargoes = Number(event.target.value);
    if (numberOfCargoes > SETTINGS.MAX_NUMBER_OF_TANKERS) numberOfCargoes = SETTINGS.MAX_NUMBER_OF_TANKERS;
    if (numberOfCargoes <= 0) {
      numberOfCargoes = '';
      setValue('applySlots', false);
      handleChangeState('indexes', []);
    }

    setValue('numberOfCargoes', numberOfCargoes);
    handleChangeState('slots', numberOfCargoes);
  };

  const handleApply = useCallback(() => {
    const cargoes = cargoesTemplate(slots);

    setValue('applySlots', cargoes.length > 0);
    handleChangeState('indexes', cargoes);
  }, [setValue, slots]);

  const handleAddSlot = () => {
    handleChangeState('indexes', [...indexes, ...cargoesTemplate(1)]);
  };

  const handleRemoveSlot = (element) => {
    const rowIndex = indexes.findIndex((obj) => obj === element);
    handleChangeState('indexes', [...indexes.filter((_, index) => index !== rowIndex)]);
  };

  const handleChangeValue = (data) => {
    const { option, index, key } = data;
    const fieldName = `cargoes[${index}][${key}]`;
    setValue(fieldName, option);
  };

  const fetchPorts = async () => {
    const data = await getPorts();
    const options = convertDataToOptions(data, 'id', 'name');

    handleChangeState('portsOptions', options);
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  useEffect(() => {
    const numberOfCargoes = indexes.length > 0 ? indexes.length : '';
    setValue('numberOfCargoes', numberOfCargoes);
  }, [indexes, setValue]);

  useEffect(() => {
    return cargoesInputRef.current && cargoesInputRef.current.addEventListener('wheel', disableDefaultBehaviour);
  }, [cargoesInputRef]);

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
          ref={cargoesInputRef}
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
        const fieldName = `cargoes[${index}]`;

        return (
          <div className="grid relative grid-cols-3 justify-center items-center gap-5" key={element.id}>
            <Input {...register(`${fieldName}[name]`, index)} type="number" label={`Imo#${index + 1}`} />
            <AsyncDropdown
              name={`${fieldName}[port]`}
              label="Load port"
              options={portsOptions}
              onChange={(option) => handleChangeValue({ option, index, key: 'port' })}
            />
            <DatePicker
              name={`${fieldName}[date]`}
              inputClass="w-full"
              label="Bill of lading date"
              onChange={(value) => handleChangeValue({ option: value, index, key: 'date' })}
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
