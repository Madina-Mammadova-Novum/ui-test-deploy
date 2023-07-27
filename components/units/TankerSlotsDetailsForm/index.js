'use client';

import { useEffect, useState } from 'react';

import { TankerSlotsPropTypes } from '@/lib/types';

import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const TankerSlotsDetails = ({ applyHelper = false }) => {
  const {
    register,
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

  const handleChangeState = (key, value) =>
    setSlotsState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const { tankersCount, tankers } = slotsState;

  const handleSlotsCount = (event) => {
    clearErrors('numberOfTankers');

    let numberOfTankers = Number(event.target.value);
    if (numberOfTankers > SETTINGS.MAX_NUMBER_OF_TANKERS) numberOfTankers = SETTINGS.MAX_NUMBER_OF_TANKERS;

    if (numberOfTankers <= 0) {
      numberOfTankers = '';
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
    clearErrors('applySlots');
    handleChangeState('tankers', getFilledArray(tankersCount));
  };

  const handleAddSlot = () => {
    clearErrors('applySlots');
    handleChangeState('tankers', [...tankers, ...getFilledArray(1)]);
  };

  const handleRemoveSlot = (index) => {
    setValue('imos', removeByIndex(tankers, index));
    handleChangeState('tankers', removeByIndex(tankers, index));
  };

  useEffect(() => {
    const numberOfTankers = tankers.length > 0 ? tankers.length : '';

    setValue('numberOfTankers', numberOfTankers);
    setValue('applySlots', Boolean(numberOfTankers));

    if (isApplied) setHelperText('');

    handleChangeState('tankersCount', numberOfTankers);
  }, [tankers, setValue, isApplied]);

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          {...register('numberOfTankers')}
          type="number"
          value={tankersCount}
          label="Number of tankers"
          placeholder={`Please enter no more than ${SETTINGS.MAX_NUMBER_OF_TANKERS} tankers.`}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tankers.map((item, index) => {
          const fieldName = `imos[${index}]`;
          const error = errors.imos ? errors.imos[index]?.imo : null;

          return (
            <div key={item} className="relative">
              <Input
                {...register(`${fieldName}.imo`)}
                label={`Imo #${index + 1}`}
                placeholder="Enter IMO"
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
      </div>
      {tankers.length > 0 && (
        <div className="flex justify-between mb-5">
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
