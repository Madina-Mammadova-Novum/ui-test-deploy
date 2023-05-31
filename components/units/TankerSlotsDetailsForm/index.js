'use client';

import { useEffect, useState } from 'react';

import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const TankerSlotsDetails = () => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const [slotsState, setSlotsState] = useState({
    slots: 0,
    tankers: [],
  });

  const handleChangeState = (key, value) =>
    setSlotsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const { slots, tankers } = slotsState;

  useEffect(() => {
    const numberOfTankers = tankers.length > 0 ? tankers.length : '';
    setValue('numberOfTankers', numberOfTankers);
    handleChangeState('slots', numberOfTankers);
  }, [setValue, tankers.length]);

  useEffect(() => {
    const numberOfCargoes = tankers.length > 0 ? tankers.length : '';

    setValue('numberOfTankers', numberOfCargoes);
    setValue('applySlots', Boolean(numberOfCargoes));

    handleChangeState('slots', numberOfCargoes);
  }, [tankers, setValue]);

  const handleSlotsCount = (event) => {
    clearErrors('numberOfTankers');

    let numberOfTankers = Number(event.target.value);
    if (numberOfTankers > SETTINGS.MAX_NUMBER_OF_TANKERS) numberOfTankers = SETTINGS.MAX_NUMBER_OF_TANKERS;
    if (numberOfTankers <= 0) {
      numberOfTankers = '';
      setValue('applySlots', false);
      handleChangeState('tankers', []);
    }
    setValue('numberOfTankers', numberOfTankers);
    handleChangeState('slots', numberOfTankers);
  };

  const handleApplySlot = () => {
    clearErrors('applySlots');
    handleChangeState('tankers', getFilledArray(slots));
  };

  const handleAddSlot = () => {
    clearErrors('applySlots');
    handleChangeState('tankers', [...tankers, ...getFilledArray(1)]);
  };

  const handleRemoveSlot = (index) => {
    setValue('tankers', removeByIndex(tankers, index));
    handleChangeState('tankers', removeByIndex(tankers, index));
  };

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          {...register('numberOfTankers')}
          type="number"
          value={slots}
          label="Number of tankers"
          placeholder={`Please enter no more than ${SETTINGS.MAX_NUMBER_OF_TANKERS} tankers.`}
          customStyles="z-10 w-full"
          onChange={handleSlotsCount}
          error={errors.numberOfTankers?.message || errors.applySlots?.message}
          helperText="You will be able to add more vessels after the verification."
          disabled={isSubmitting}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[17px] right-1 my-1 !py-4"
          buttonProps={{ text: 'Apply', variant: !errors.numberOfTankers ? 'primary' : 'delete', size: 'medium' }}
          onClick={handleApplySlot}
          disabled={slots <= 0 || isSubmitting}
        />
      </div>
      {tankers.map((_, index) => {
        const fieldName = `imos[${index}]`;
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
              customStyles="absolute top-7 right-1.5 z-10 !p-0"
              buttonProps={{
                icon: { before: <TrashAltSVG viewBox="0 0 24 24" className="fill-black w-5 h-5" /> },
                variant: 'tertiary',
                size: 'small',
              }}
              onClick={() => handleRemoveSlot(index)}
              disabled={isSubmitting}
            />
          </div>
        );
      })}
      {tankers.length > 0 && (
        <div className="flex justify-between">
          <Button
            buttonProps={{
              text: 'Add more tankers',
              helperText: `(max ${SETTINGS.MAX_NUMBER_OF_TANKERS} tankers)`,
              variant: 'tertiary',
              size: 'small',
              icon: { before: <PlusSVG className="fill-blue" /> },
            }}
            type="button"
            customStyles="!py-0 !px-0 !text-xsm font-medium !text-blue"
            disabled={tankers?.length >= SETTINGS.MAX_NUMBER_OF_TANKERS}
            onClick={handleAddSlot}
          />
        </div>
      )}
    </div>
  );
};

export default TankerSlotsDetails;
