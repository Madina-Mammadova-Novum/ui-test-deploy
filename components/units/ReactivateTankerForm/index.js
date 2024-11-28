'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addDays } from 'date-fns';
import debounce from 'lodash/debounce';
import * as yup from 'yup';

import { ReactivateTankerFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { ModalFormManager } from '@/common';
import { DatePicker, FormDropdown, Label, Title } from '@/elements';
import { reactivateTankerSchema } from '@/lib/schemas';
import { getPortsForSearchForm, getUserPositionById } from '@/services';
import { updateVesselPortAndDate } from '@/services/vessel';
import { updateTankersByFleetId, updateUnassignedTanker } from '@/store/entities/positions/slice';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const ReactivateTankerForm = ({ title, state, closeModal }) => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({ ...reactivateTankerSchema() });
  const methods = useHookFormParams({ schema });

  const [perList, setPerList] = useState(50);

  const {
    clearErrors,
    setValue,
    formState: { errors },
  } = methods;

  const { id, type, action } = state;

  const [tankerState, setTankerState] = useState({
    listOfPorts: [],
    port: null,
    date: '',
    nextDay: addDays(new Date(), 1),
    loading: false,
  });

  const handleChangeState = (key, value) =>
    setTankerState((prevState) => ({
      ...prevState,
      [key]: value,
    }));

  const getPorts = async () => {
    handleChangeState('loading', true);
    const { data } = await getPortsForSearchForm({ pageSize: perList });
    handleChangeState('listOfPorts', dropDownOptionsAdapter({ data }));
    handleChangeState('loading', false);
  };

  const debouncedLoadOptions = debounce(async (inputValue, callback) => {
    const { data } = await getPortsForSearchForm({ query: inputValue, pageSize: perList });
    callback(dropDownOptionsAdapter({ data }));
  }, 400);

  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback(tankerState.listOfPorts);
      return;
    }
    debouncedLoadOptions(inputValue, callback);
  };

  const handleMore = () => setPerList((prev) => prev + 50);

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
        const { data: unassignedTankers } = await getUserPositionById({ id: null });
        dispatch(updateUnassignedTanker({ id, tankers: unassignedTankers }));
      }
      closeModal();
    }

    if (message) successToast(message);
    if (error) errorToast(error?.title, error?.message);
  };

  const { listOfPorts, port, nextDay, loading } = tankerState;

  useEffect(() => {
    getPorts();
  }, [perList]);

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, []);

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
        <Title level="2" className="text-lg font-bold capitalize text-black">
          {title}
        </Title>
        <div className="py-5">
          <Label className="text-xs-sm">Tanker name</Label>
          <p className="text-xsm font-semibold text-black">{state?.name}</p>
        </div>
        <div className="grid min-w-[296px] gap-5">
          <FormDropdown
            name="port"
            label="Port search"
            errorMsg={errors?.port?.message}
            loading={loading}
            options={listOfPorts}
            onChange={(option) => handleChangeValue({ option, key: 'port' })}
            customStyles={{ dropdownExpanded: true }}
            loadOptions={loadOptions}
            onMenuScrollToBottom={handleMore}
            asyncCall
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
