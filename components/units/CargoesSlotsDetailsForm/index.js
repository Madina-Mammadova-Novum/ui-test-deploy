'use client';

import { useEffect, useRef, useState } from 'react';

import { addMonths } from 'date-fns';

import { CargoesSlotsPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import PlusSVG from '@/assets/images/plusCircle.svg';
import TrashAltSVG from '@/assets/images/trashAlt.svg';
import { Button, DatePicker, FormDropdown, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';
import { getPortsForSearchForm } from '@/services/port';
import { getFilledArray, removeByIndex } from '@/utils/helpers';
import { useHookForm } from '@/utils/hooks';

const CargoesSlotsDetailsForm = ({ data = {}, applyHelper = false }) => {
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useHookForm();

  const scrollRef = useRef(null);

  const [cargoesState, setCargoesState] = useState({
    cargoesCount: data?.countOfCargoes,
    cargoes: data?.listOfCargoes,
    ports: [],
    loading: false,
  });

  const [perList, setPerList] = useState(20);

  const [helperText, setHelperText] = useState('');
  const isApplied = watch('applySlots');

  const { cargoesCount, cargoes, ports, loading } = cargoesState;

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
    const nextCargoesCount =
      cargoesCount > SETTINGS.MAX_NUMBER_OF_CARGOES ? SETTINGS.MAX_NUMBER_OF_CARGOES : cargoesCount;
    const newCargoes = getFilledArray(nextCargoesCount).map((item) => ({
      ...item,
      id: `cargo-${Date.now()}-${Math.random()}`,
    }));
    clearErrors('applySlots');

    // Update form values for each cargo slot
    newCargoes.forEach((_, index) => {
      setValue(`cargoes[${index}].imo`, '');
      setValue(`cargoes[${index}].port`, null);
      setValue(`cargoes[${index}].date`, null);
    });

    setValue('cargoes', newCargoes);
    handleChangeState('cargoes', newCargoes);
  };

  const handleAddSlot = () => {
    const newSlot = getFilledArray(1).map(() => ({
      id: `cargo-${Date.now()}-${Math.random()}`,
    }));
    handleChangeState('cargoes', [...cargoes, ...newSlot]);
  };

  const handleRemoveSlot = (index) => {
    const cargoesValues = getValues('cargoes');
    const updatedCargoes = removeByIndex(cargoesValues, index);

    setValue('cargoes', updatedCargoes);
    handleChangeState('cargoes', removeByIndex(cargoes, index));
  };

  const getPortsData = async () => {
    handleChangeState('loading', true);
    const result = await getPortsForSearchForm({ query: '', pageSize: perList });
    handleChangeState('ports', dropDownOptionsAdapter({ data: result?.data }));
    handleChangeState('loading', false);
  };

  const loadOptions = async (query, callback) => {
    const result = await getPortsForSearchForm({ query, pageSize: perList });
    callback(dropDownOptionsAdapter({ data: result?.data }));
  };

  const handleMore = () => setPerList((prev) => prev + 50);

  useEffect(() => {
    getPortsData();
  }, [perList]);

  useEffect(() => {
    const numberOfCargoes = cargoes?.length > 0 ? cargoes.length : '';

    setValue('numberOfCargoes', numberOfCargoes);
    setValue('applySlots', Boolean(numberOfCargoes));

    handleChangeState('cargoesCount', numberOfCargoes);
    if (isApplied) setHelperText('');
  }, [cargoes?.length, isApplied, setValue]);

  useEffect(() => {
    if (isApplied) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [cargoes?.length, isApplied]);

  return (
    <div className="grid gap-5">
      <div className="relative md:w-full">
        <Input
          label="Number of cargoes chartered in the last 6 months"
          labelBadge="*"
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
          <div className="relative flex flex-col justify-center gap-2 md:flex-row" key={item.id || `cargo-${index}`}>
            <Input
              {...register(`${fieldName}.imo`, {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 7);
                },
              })}
              label={`Imo #${index + 1}`}
              labelBadge="*"
              placeholder="Enter IMO"
              error={error?.imo?.message}
              disabled={isSubmitting}
              maxLength={7}
              type="text"
            />
            <FormDropdown
              name={`${fieldName}.port`}
              label="Load port"
              labelBadge="*"
              errorMsg={error?.port?.message}
              loading={loading}
              options={ports}
              onChange={(option) => handleChangeValue({ option, index, key: 'port' })}
              customStyles={{
                className: 'md:w-96 3md:w-72 md:mx-2.5',
              }}
              onMenuScrollToBottom={handleMore}
              loadOptions={loadOptions}
              asyncCall
            />
            <DatePicker
              minDate={addMonths(new Date(), -6)}
              maxDate={new Date()}
              calendarClass="absolute right-0"
              name={`${fieldName}.date`}
              inputClass="w-full min-w-[150px]"
              label="Bill of lading date"
              labelBadge="*"
              error={error?.date?.message}
              onChange={(value) => handleChangeValue({ option: value, index, key: 'date' })}
            />
            <Button
              type="button"
              customStyles="!p-0"
              customStylesFromWrap="!mb-2 !justify-end"
              buttonProps={{
                icon: { before: <TrashAltSVG viewBox="0 0 24 24" className="h-6 w-6 fill-black" /> },
                variant: 'tertiary',
                size: 'small',
              }}
              onClick={() => handleRemoveSlot(index)}
              disabled={isSubmitting}
            />
          </div>
        );
      })}

      <div ref={scrollRef} />

      {cargoes?.length > 0 && (
        <div className="mb-5 flex justify-between">
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
