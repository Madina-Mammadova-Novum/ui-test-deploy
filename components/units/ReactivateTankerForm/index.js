'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { addDays } from 'date-fns';
import * as yup from 'yup';

import { ReactivateTankerFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Label, Title } from '@/elements';
import { reactivateTankerSchema } from '@/lib/schemas';
import { getUserPositionById } from '@/services';
import { getUnassignedVessels, updateVesselPortAndDate } from '@/services/vessel';
import { updateTankersByFleetId, updateUnassignedTanker } from '@/store/entities/positions/slice';
import { getGeneralDataSelector } from '@/store/selectors';
import { countriesOptions } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ReactivateTankerForm = ({ title, state, closeModal }) => {
  const dispatch = useDispatch();

  const { ports } = useSelector(getGeneralDataSelector);

  const schema = yup.object().shape({
    ...reactivateTankerSchema(),
  });

  const methods = useHookFormParams({ schema });

  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = methods;

  const { id, type, action } = state;

  const [tankerState, setTankerState] = useState({
    listOfPorts: countriesOptions(ports?.searchPorts) ?? [],
    port: null,
    date: '',
    nextDay: addDays(new Date(), 1),
  });

  const handleChangeState = (key, value) =>
    setTankerState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const handleChangeValue = (data) => {
    const { option, key } = data;

    if (errors[key]) clearErrors(key);

    setValue(key, option);
    handleChangeState(key, option);
  };

  const onSubmit = async ({ port, date }) => {
    const { error, message } = await updateVesselPortAndDate({
      id,
      action,
      portId: port?.value,
      available: true,
      date,
    });

    if (!error) {
      if (type === 'assigned') {
        const { data: assignedTankers } = await getUserPositionById({ id: state?.fleetId });
        dispatch(updateTankersByFleetId({ fleetId: state.fleetId, tankers: assignedTankers }));
      } else if (type === 'unassigned') {
        const { data: unassignedTankers } = await getUnassignedVessels();
        dispatch(updateUnassignedTanker({ id, tankers: unassignedTankers }));
      }
      closeModal();
    }

    if (message) successToast(message);
    if (error) errorToast(error?.title, error?.message);
  };

  const { listOfPorts, port, nextDay } = tankerState;

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        className="max-w-[356px]"
        submitAction={onSubmit}
        submitButton={{
          text: 'Reactivate tanker',
          variant: 'primary',
          size: 'large',
          disabled: port === null,
        }}
      >
        <Title level="2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <div className="py-5">
          <Label className="text-xs-sm">Tanker name</Label>
          <p className="font-semibold text-black text-xsm">{state?.name}</p>
        </div>
        <div className="grid gap-5 min-w-[296px]">
          <FormDropdown
            name="port"
            label="Port search"
            errorMsg={errors?.port?.message}
            options={listOfPorts}
            onChange={(option) => handleChangeValue({ option, key: 'port' })}
            customStyles={{ dropdownExpanded: true }}
            async
          />
          <DatePicker
            minDate={nextDay}
            name="date"
            inputClass="w-full"
            label="Open date"
            error={errors?.date?.message}
            onChange={(value) => handleChangeValue({ option: value, key: 'date' })}
            calendarClass="absolute top-5 left-0"
            expanded
          />
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

ReactivateTankerForm.propTypes = ReactivateTankerFormPropTypes;

export default ReactivateTankerForm;
