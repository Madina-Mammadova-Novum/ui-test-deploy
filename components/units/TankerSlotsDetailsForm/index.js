'use client';

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import PasswordHiddenSVG from '@/assets/images/passwordHidden.svg';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';

const TankerSlotsDetails = () => {
  const [slots, setSlots] = React.useState(0);
  const [indexes, setIndexes] = React.useState([]);
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    const numberOfTankers = indexes.length > 0 ? indexes.length : '';
    setValue('numberOfTankers', numberOfTankers);
  }, [indexes]);

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
      <div className="w-full relative">
        <Input
          {...register('numberOfTankers')}
          label="Number of tankers"
          placeholder="Tankers"
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
      {indexes.map((index) => {
        const fieldName = `imo[${index}]`;
        const error = errors.imo ? errors.imo[index] : null;
        return (
          <div key={fieldName}>
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
              customStyles="absolute top-[18px] right-1 my-1 !py-1 z-10"
              buttonProps={{ icon: <PasswordHiddenSVG />, variant: 'primary', size: 'small' }}
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
