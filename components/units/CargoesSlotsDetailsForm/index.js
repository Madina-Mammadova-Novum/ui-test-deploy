'use client';

import React, { useEffect, useState } from 'react';

import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, DatePicker, FormDropdown, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getPorts } from '@/services/port';
import { countriesOptions, getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = () => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useHookForm();

  const [cargoesState, setCargoesState] = useState({
    cargoesCount: 0,
    cargoes: [],
    cargoesPortsOptions: null,
  });

  const { cargoesCount, cargoesPortsOptions, cargoes } = cargoesState;

  const handleChangeState = (key, value) =>
    setCargoesState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleChangeValue = (data) => {
    const { option, index, key } = data;

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

  const fetchPorts = async () => {
    const data = await getPorts();
    const options = countriesOptions(data);
    handleChangeState('cargoesPortsOptions', options);
  };

  useEffect(() => {
    fetchPorts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const numberOfCargoes = cargoes.length > 0 ? cargoes.length : '';

    setValue('numberOfCargoes', numberOfCargoes);
    setValue('applySlots', Boolean(numberOfCargoes));

    handleChangeState('cargoesCount', numberOfCargoes);

    if (isSubmitSuccessful) {
      handleChangeState('cargoesCount', 0);
      handleChangeState('cargoes', []);
    }
  }, [cargoes, isSubmitSuccessful, setValue]);

  return (
    <div className="grid gap-5">
      <div className="w-full relative">
        <Input
          label="How many cargoes have you chartered during the last 6 months?"
          placeholder={`Please enter no more than ${SETTINGS.MAX_NUMBER_OF_CARGOES} cargoes.`}
          disabled={isSubmitting}
          value={cargoesCount}
          type="number"
          customStyles="z-10 w-full"
          onChange={handleCargoesCount}
          error={errors.numberOfCargoes?.message || errors.applySlots?.message}
          helperText="You will be able to add more cargoes after the verification."
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
          <div className="grid relative grid-cols-1 lg:grid-cols-3 justify-center items-center gap-x-5" key={item}>
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
              async
            />
            <DatePicker
              calendarClass="absolute -left-2.5"
              name={`${fieldName}.date`}
              inputClass="w-full"
              label="Bill of lading date"
              error={error?.date?.message}
              onChange={(value) => handleChangeValue({ option: value, index, key: 'date' })}
            />
            <Button
              type="button"
              customStyles="absolute top-full mt-2 lg:mt-0 right-0 lg:-right-8 lg:top-7 !p-0"
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
        <div className="flex justify-between">
          <Button
            buttonProps={{
              text: 'Add more cargoes',
              helperText: `(max ${SETTINGS.MAX_NUMBER_OF_CARGOES} cargoes)`,
              variant: 'tertiary',
              size: 'small',
              icon: { before: <PlusSVG /> },
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

export default CargoesSlotsDetailsForm;
