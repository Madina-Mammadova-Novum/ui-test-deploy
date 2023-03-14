'use client';

import { useCallback, useEffect, useState } from 'react';

import { cargoesAdapter } from '@/adapters';
import { PlusIcon, TrashIcon } from '@/assets/icons';
import { Button, DatePicker, Dropdown, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = () => {
  const [slots, setSlots] = useState(0);
  const [indexes, setIndexes] = useState([]);

  const {
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useHookForm();

  useEffect(() => {
    const numberOfTankers = indexes.length > 0 ? indexes.length : '';
    setValue('numberOfTankers', numberOfTankers);
    setValue('experiences', indexes);
  }, [indexes, setValue]);

  const handleSlotsCount = (event) => {
    let numberOfTankers = Number(event.target.value);
    if (numberOfTankers > SETTINGS.MAX_NUMBER_OF_TANKERS) numberOfTankers = SETTINGS.MAX_NUMBER_OF_TANKERS;
    if (numberOfTankers <= 0) {
      numberOfTankers = '';
      setValue('applySlots', false);
      setIndexes([]);
    }
    setValue('numberOfTankers', numberOfTankers);
    setSlots(numberOfTankers);
  };

  const handleApply = useCallback(() => {
    const cargoes = cargoesAdapter(slots);

    setIndexes(cargoes);
    setValue('applySlots', cargoes.length > 0);
  }, [setValue, slots]);

  const handleAddSlot = useCallback(() => {
    setIndexes((prevIndexes) => [...prevIndexes, ...cargoesAdapter(1)]);
  }, []);

  const handleRemoveSlot = useCallback((element) => {
    setIndexes((prevIndexes) => {
      const rowIndex = prevIndexes.findIndex((obj) => obj === element);
      return [...prevIndexes.filter((_, index) => index !== rowIndex)];
    });
  }, []);

  const inputName = (name, index) => `experiences[${index}].${name}`;

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          {...register('numberOfTankers')}
          label="HOW MANY CARGOES HAVE YOU CHARTERED DURING THE LAST 6 MONTHS?"
          placeholder="Cargoes"
          error={errors.numberOfTankers?.message}
          disabled={isSubmitting}
          type="number"
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

        return (
          <div className="grid relative grid-cols-3 justify-center items-center gap-5" key={rowIndex}>
            <Input
              {...register(inputName(element.imo.name, index))}
              type="number"
              label={`${element.imo.label}#${index + 1}`}
            />
            <Dropdown
              label={element.port.label}
              name={inputName(element.port.name, index)}
              options={[]}
              control={control}
            />
            <DatePicker
              inputClass="w-full"
              label={element.date.label}
              name={inputName(element.date.name, index)}
              {...register(inputName(element.date.name, index))}
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
