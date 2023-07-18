'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { ReactivateTankerFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { DatePicker, FormDropdown, Label, Title } from '@/elements';
import { reactivateTankerSchema } from '@/lib/schemas';
import { getGeneralDataSelector } from '@/store/selectors';
import { countriesOptions } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const ReactivateTankerForm = ({ title, portName }) => {
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

  const [tankerState, setTankerState] = useState({
    listOfPorts: countriesOptions(ports) ?? [],
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

  const onSubmit = async (data) => {
    return { data };
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
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <div>
          <Label className="text-xs-sm">Tanker name</Label>
          <p className="font-semibold text-black text-xsm">{portName}</p>
        </div>
        <div className="grid gap-4 min-w-[296px]">
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
