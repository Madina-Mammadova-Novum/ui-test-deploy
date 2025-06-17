'use client';

import { useEffect, useState } from 'react';

import { TankerSlotsPropTypes } from '@/lib/types';

import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getFilledArray } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const TankerSlotsDetails = ({ applyHelper = false }) => {
  const {
    register,
    unregister,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const [slotsState, setSlotsState] = useState({
    tankersCount: 0,
    tankers: [],
  });

  const [helperText, setHelperText] = useState('');
  const isApplied = watch('applySlots');

  const { tankersCount, tankers } = slotsState;

  const handleChangeState = (key, value) =>
    setSlotsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleSlotsCount = (event) => {
    clearErrors('numberOfTankers');

    let numberOfTankers = Number(event.target.value);

    if (numberOfTankers <= 0) {
      numberOfTankers = '';
      unregister('imos');
      setValue('applySlots', false);
      handleChangeState('tankers', []);
    }

    if (event.target.value && applyHelper) {
      setHelperText('Please click Apply');
    } else {
      setHelperText('');
    }

    setValue('numberOfTankers', numberOfTankers);
    handleChangeState('tankersCount', numberOfTankers);
  };

  const handleApplySlot = () => {
    const nextTankersCount =
      tankersCount > SETTINGS.MAX_NUMBER_OF_TANKERS ? SETTINGS.MAX_NUMBER_OF_TANKERS : tankersCount;

    // Clear apply slots errors
    clearErrors('applySlots');
    clearErrors('imos');

    // If we're reducing the number of tankers, clear errors for the ones being removed
    if (nextTankersCount < tankers.length) {
      tankers.forEach((tankerId, index) => {
        if (index >= nextTankersCount) {
          // Clear errors for tankers that will be removed
          clearErrors(`imos[${tankerId}].imo`);
          clearErrors(`imos[${tankerId}]`);
          // Unregister the field to clean up form state
          unregister(`imos[${tankerId}].imo`);
        }
      });
    }

    // Clear all existing tanker errors to start fresh
    tankers.forEach((tankerId) => {
      clearErrors(`imos[${tankerId}].imo`);
      clearErrors(`imos[${tankerId}]`);
    });

    handleChangeState('tankers', getFilledArray(nextTankersCount));
  };

  const handleAddSlot = () => {
    clearErrors('applySlots');
    if (tankers.length) {
      const maxNumber = Math.max(...tankers);
      handleChangeState('tankers', [...tankers, maxNumber + 1]);
    } else {
      handleChangeState('tankers', getFilledArray(1));
    }
  };

  const handleRemoveSlot = (tankerId) => {
    handleChangeState(
      'tankers',
      tankers.filter((tanker) => tanker !== tankerId)
    );

    unregister(`imos[${tankerId}].imo`);
    clearErrors(`imos`);
  };

  useEffect(() => {
    const numberOfTankers = tankers.length > 0 ? tankers.length : null;

    setValue('numberOfTankers', numberOfTankers);
    setValue('applySlots', Boolean(numberOfTankers));

    if (isApplied) setHelperText('');

    handleChangeState('tankersCount', numberOfTankers);
  }, [tankers, setValue, isApplied]);

  return (
    <div className="grid gap-5">
      <div className="!relative w-full">
        <Input
          {...register('numberOfTankers')}
          type="number"
          value={tankersCount}
          label="Number of tankers"
          labelBadge="*"
          customStyles="z-10 w-full"
          onChange={handleSlotsCount}
          error={errors.numberOfTankers?.message || errors.applySlots?.message}
          helperText={helperText}
          disabled={isSubmitting}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[17px] right-1 my-1 !py-4"
          buttonProps={{ text: 'Apply', variant: !errors.numberOfTankers ? 'primary' : 'delete', size: 'medium' }}
          onClick={handleApplySlot}
          disabled={tankersCount <= 0 || isSubmitting}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tankers.map((item, index) => {
          const fieldName = `imos[${item}]`;
          const error = errors.imos ? errors.imos[item]?.imo : null;

          return (
            <div key={item} className="relative">
              <Input
                {...register(`${fieldName}.imo`, {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
                  },
                })}
                label={`Imo #${index + 1}`}
                labelBadge="*"
                placeholder="Enter IMO"
                error={error?.message}
                disabled={isSubmitting}
                maxLength={7}
                type="text"
              />
              <Button
                type="button"
                customStyles="absolute top-7 right-1.5 z-10 !p-0"
                buttonProps={{
                  icon: { before: <TrashAltSVG viewBox="0 0 24 24" className="h-5 w-5 fill-black" /> },
                  variant: 'tertiary',
                  size: 'small',
                }}
                onClick={() => handleRemoveSlot(item)}
                disabled={isSubmitting}
              />
            </div>
          );
        })}
      </div>
      {tankers.length > 0 && (
        <div className="mb-5 flex justify-between">
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

TankerSlotsDetails.propTypes = TankerSlotsPropTypes;

export default TankerSlotsDetails;
