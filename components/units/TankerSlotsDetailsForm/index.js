'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TrashIcon } from '@/assets/icons';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { disableDefaultBehaviour } from '@/utils/helpers';

const TankerSlotsDetails = () => {
  const [slots, setSlots] = useState(0);
  const [indexes, setIndexes] = useState([]);
  const tankersInputRef = useRef(null);

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    const numberOfTankers = indexes.length > 0 ? indexes.length : '';
    setValue('numberOfTankers', numberOfTankers);
  }, [indexes, setValue]);

  useEffect(() => {
    return tankersInputRef.current && tankersInputRef.current.addEventListener('wheel', disableDefaultBehaviour);
  }, [tankersInputRef]);

  const handleSlotsCount = (event) => {
    clearErrors('numberOfTankers');

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

  const handleApply = () => {
    const slotsIndexes = [];
    for (let i = 0; i < slots; i += 1) {
      slotsIndexes.push(i);
    }
    setIndexes(slotsIndexes);
    setValue('applySlots', slotsIndexes.length > 0);
  };

  const handleRemoveSlot = (index) => {
    setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
  };

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          {...register('numberOfTankers')}
          label="Number of tankers"
          placeholder="Tankers"
          error={errors.numberOfTankers?.message}
          disabled={isSubmitting}
          type="number"
          customStyles="z-10 w-full"
          ref={tankersInputRef}
          onChange={handleSlotsCount}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[18px] right-1 my-1 !py-1"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          onClick={handleApply}
          disabled={isSubmitting}
        />
      </div>
      {indexes.map((index) => {
        const fieldName = `imo[${index}]`;
        const error = errors.imo ? errors.imo[index] : null;
        return (
          <div key={fieldName} className="relative">
            <Input
              {...register(fieldName)}
              label={`Imo #${index + 1}`}
              placeholder="IMO number"
              error={error?.message}
              disabled={isSubmitting}
              type="number"
            />
            <Button
              type="button"
              customStyles="absolute top-[30px] right-1.5 z-10 !p-0"
              buttonProps={{ icon: <TrashIcon />, variant: 'tertiary', size: 'small' }}
              onClick={() => handleRemoveSlot(index)}
              disabled={isSubmitting}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TankerSlotsDetails;
