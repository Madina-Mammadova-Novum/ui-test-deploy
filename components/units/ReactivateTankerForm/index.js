'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { ReactivateTankerFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { DatePicker, FormDropdown, Label, Title } from '@/elements';
import { reactivateTankerSchema } from '@/lib/schemas';
import { getUserPositionById } from '@/services';
import { updateVesselPortAndDate } from '@/services/vessel';
import { updateTankersByFleetId } from '@/store/entities/positions/slice';
import { getGeneralDataSelector } from '@/store/selectors';
import { countriesOptions } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ReactivateTankerForm = ({ title, state }) => {
  const dispatch = useDispatch();

  const { ports } = useSelector(getGeneralDataSelector);
  console.log('ports: ', ports);

  const schema = yup.object().shape({
    ...reactivateTankerSchema(),
  });

  const methods = useHookFormParams({ schema });

  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = methods;

  const [tankerState, setTankerState] = useState({
    listOfPorts: countriesOptions(ports?.searchPorts) ?? [],
    port: null,
    date: '',
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
    const { error, data, status } = await updateVesselPortAndDate({
      id: state.id,
      action: state.action,
      portId: port?.value,
      available: true,
      date,
    });

    if (status === 200) {
      const { data: tankers } = await getUserPositionById({ id: state?.fleetId });

      dispatch(updateTankersByFleetId({ fleetId: state.fleetId, tankers }));
    }

    if (data?.message) successToast(data.message);
    if (error) errorToast(error.message, error.errors);
  };

  const { listOfPorts, port } = tankerState;

  return (
    <FormProvider {...methods}>
      <FormManager
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
            calendarClass="absolute top-5 left-0"
            name="date"
            inputClass="w-full"
            label="Open date"
            error={errors?.date?.message}
            onChange={(value) => handleChangeValue({ option: value, key: 'date' })}
            expanded
          />
        </div>
      </FormManager>
    </FormProvider>
  );
};

ReactivateTankerForm.propTypes = ReactivateTankerFormPropTypes;

export default ReactivateTankerForm;
