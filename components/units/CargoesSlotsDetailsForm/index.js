'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { addMonths } from 'date-fns';

import { CargoesSlotsPropTypes } from '@/lib/types';

import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, DatePicker, FormDropdown, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getGeneralDataSelector } from '@/store/selectors';
import { countriesOptions, getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = ({ data = {}, applyHelper = false }) => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const { ports } = useSelector(getGeneralDataSelector);

  const [cargoesState, setCargoesState] = useState({
    cargoesCount: data?.countOfCargoes ?? 0,
    cargoes: data?.listOfCargoes ?? [],
    cargoesPortsOptions: countriesOptions(ports?.allPorts) ?? [],
  });

  const [helperText, setHelperText] = useState('');
  const isApplied = watch('applySlots');

  const { cargoesCount, cargoesPortsOptions, cargoes } = cargoesState;

  const handleChangeState = (key, value) =>
    setCargoesState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleChangeValue = (dataValue) => {
    const { option, index, key } = dataValue;

    const fieldName = `cargoes[${index}].${key}`;
    const isError = errors?.cargoes?.[index];

    if (isError?.[key]) {
      clearErrors(fieldName);
    }

    setValue(fieldName, option);
  };

  const handleCargoesCount = (event) => {
    clearErrors('numberOfCargoes');

    let numberOfCargoes = Number(event.target.value);
    if (numberOfCargoes > SETTINGS.MAX_NUMBER_OF_CARGOES) numberOfCargoes = SETTINGS.MAX_NUMBER_OF_CARGOES;

    if (numberOfCargoes <= 0) {
      numberOfCargoes = '';
      setValue('applySlots', false);
      handleChangeState('cargoes', []);
    }

    if (event.target.value && applyHelper) {
      setHelperText('Please click Apply');
    } else {
      setHelperText('');
    }

    setValue('numberOfCargoes', numberOfCargoes);
    handleChangeState('cargoesCount', numberOfCargoes);
  };

  const handleApplySlot = () => {
    clearErrors('applySlots');
    handleChangeState('cargoes', getFilledArray(cargoesCount));
  };

  const handleAddSlot = () => {
    handleChangeState('cargoes', [...cargoes, ...getFilledArray(1)]);
  };

  const handleRemoveSlot = (index) => {
    setValue('cargoes', removeByIndex(cargoes, index));
    handleChangeState('cargoes', removeByIndex(cargoes, index));
  };

  useEffect(() => {
    const numberOfCargoes = cargoes.length > 0 ? cargoes.length : '';

    setValue('numberOfCargoes', numberOfCargoes);
    setValue('applySlots', Boolean(numberOfCargoes));

    handleChangeState('cargoesCount', numberOfCargoes);

    if (isApplied) setHelperText('');
  }, [cargoes?.length, isApplied, setValue]);
  return (
    <div className="grid gap-5">
      <div className="w-full relative">
        <Input
          label="Number of cargoes chartered in the last 6 months"
          placeholder={`Please enter no more than ${SETTINGS.MAX_NUMBER_OF_CARGOES} cargoes.`}
          disabled={isSubmitting}
          value={cargoesCount}
          type="number"
          customStyles="z-10 w-full"
          onChange={handleCargoesCount}
          error={errors.numberOfCargoes?.message || errors.applySlots?.message}
          helperText={helperText}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[17px] right-1 my-1 !py-4"
          buttonProps={{
            text: 'Apply',
            variant: !errors.numberOfCargoes ? 'primary' : 'delete',
            size: 'medium',
          }}
          onClick={handleApplySlot}
          disabled={cargoesCount <= 0 || isSubmitting}
        />
      </div>

      {cargoes?.map((item, index) => {
        const fieldName = `cargoes[${index}]`;
        const error = errors.cargoes ? errors.cargoes[index] : null;

        return (
          <div className="flex relative justify-center" key={item}>
            <Input
              {...register(`${fieldName}.imo`)}
              label={`Imo #${index + 1}`}
              placeholder="Enter IMO"
              error={error?.imo?.message}
              disabled={isSubmitting}
              type="number"
            />
            <FormDropdown
              name={`${fieldName}.port`}
              label="Load port"
              errorMsg={error?.port?.message}
              options={cargoesPortsOptions}
              onChange={(option) => handleChangeValue({ option, index, key: 'port' })}
              customStyles={{
                className: 'w-96 3md:w-72 mx-2.5',
              }}
              async
            />
            <DatePicker
              minDate={addMonths(new Date(), -6)}
              maxDate={new Date()}
              calendarClass="absolute right-0"
              name={`${fieldName}.date`}
              inputClass="w-full min-w-[150px]"
              label="Bill of lading date"
              error={error?.date?.message}
              onChange={(value) => handleChangeValue({ option: value, index, key: 'date' })}
            />
            <Button
              type="button"
              customStyles="absolute top-1/2 -right-8 !p-0"
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

      {cargoes.length > 0 && (
        <div className="flex justify-between mb-5">
          <Button
            buttonProps={{
              text: 'Add more cargoes',
              helperText: `(max ${SETTINGS.MAX_NUMBER_OF_CARGOES} cargoes)`,
              variant: 'tertiary',
              size: 'small',
              icon: { before: <PlusSVG className="fill-blue" /> },
            }}
            type="button"
            customStyles="!py-0 !px-0 !text-xsm font-medium !text-blue"
            disabled={cargoes?.length >= SETTINGS.MAX_NUMBER_OF_CARGOES}
            onClick={handleAddSlot}
          />
        </div>
      )}
    </div>
  );
};

CargoesSlotsDetailsForm.propTypes = CargoesSlotsPropTypes;

export default CargoesSlotsDetailsForm;
