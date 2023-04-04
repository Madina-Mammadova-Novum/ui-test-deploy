'use client';

import { useEffect, useState } from 'react';

import { PlusCircleIcon, TrashIcon } from '@/assets/icons';
import { AsyncDropdown, Button, DatePicker, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getPorts } from '@/services/port';
import { convertDataToOptions, getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = () => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
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
    const options = convertDataToOptions(data, 'id', 'name');

    handleChangeState('cargoesPortsOptions', options);
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  useEffect(() => {
    const numberOfCargoes = cargoes.length > 0 ? cargoes.length : '';

    setValue('numberOfCargoes', numberOfCargoes);
    setValue('applySlots', Boolean(numberOfCargoes));

    handleChangeState('cargoesCount', numberOfCargoes);
  }, [cargoes, setValue]);

  return (
    <div className="grid gap-5">
      <div className="w-full !relative">
        <Input
          label="How many cargoes have you chartered during the last 6 months?"
          placeholder="Cargoes"
          disabled={isSubmitting}
          value={cargoesCount}
          type="number"
          customStyles="z-10 w-full"
          onChange={handleCargoesCount}
          error={errors.numberOfCargoes?.message}
        />
        <Input {...register('applySlots')} disabled={isSubmitting} type="hidden" />
        <Button
          type="button"
          customStyles="absolute top-[18px] right-1 my-1 !py-1 z-10"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          onClick={handleApplySlot}
          disabled={cargoesCount <= 0 || isSubmitting}
        />
      </div>

      {cargoes?.map((item, index) => {
        const fieldName = `cargoes[${index}]`;
        const error = errors.cargoes ? errors.cargoes[index] : null;

        return (
          <div className="grid relative grid-cols-3 justify-center items-center gap-5" key={item}>
            <Input
              name={`${fieldName}.name`}
              label={`Imo #${index + 1}`}
              placeholder="IMO number"
              error={error?.imo?.message}
              disabled={isSubmitting}
              onChange={({ target }) => handleChangeValue({ option: target.value, index, key: 'imo' })}
              type="number"
            />
            <AsyncDropdown
              name={`${fieldName}.port`}
              label="Load port"
              errorMsg={error?.port?.message}
              options={cargoesPortsOptions}
              onChange={(option) => handleChangeValue({ option, index, key: 'port' })}
            />
            <DatePicker
              name={`${fieldName}.date`}
              inputClass="w-full"
              label="Bill of lading date"
              error={error?.date?.message}
              onChange={(value) => handleChangeValue({ option: value, index, key: 'date' })}
            />
            <Button
              type="button"
              customStyles="absolute -right-8 top-8 !p-0"
              buttonProps={{ icon: <TrashIcon />, variant: 'tertiary', size: 'small' }}
              onClick={() => handleRemoveSlot(index)}
              disabled={isSubmitting}
            />
          </div>
        );
      })}

      {cargoes.length > 0 && (
        <div className="flex justify-between">
          <Button
            type="button"
            customStyles="!py-0 !px-0 !text-xsm font-medium !text-blue"
            disabled={cargoes?.length >= 10}
            onClick={handleAddSlot}
            buttonProps={{
              text: 'Add more ports',
              helperText: '(max 10 ports)',
              variant: 'tertiary',
              size: 'small',
              icon: <PlusIcon />,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CargoesSlotsDetailsForm;
