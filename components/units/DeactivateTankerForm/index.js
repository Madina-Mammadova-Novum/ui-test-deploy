'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { DeactivateTankerFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Label, Title } from '@/elements';
import { getUserPositionById } from '@/services';
import { updateVesselPortAndDate } from '@/services/vessel';
import { updateTankersByFleetId } from '@/store/entities/positions/slice';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const DeactivateTankerForm = ({ title, portName, state, closeModal }) => {
  const dispatch = useDispatch();
  const methods = useHookFormParams({});

  const onSubmit = async () => {
    const currentDate = new Date();
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);

    const { status, error, data } = await updateVesselPortAndDate({
      ...state,
      date: nextDate,
      available: !state?.available,
    });

    if (status === 200) {
      const { data: tankers } = await getUserPositionById({ id: state?.fleetId });

      dispatch(updateTankersByFleetId({ fleetId: state.fleetId, tankers }));
    }

    if (data?.message) successToast(data.message);
    if (error) errorToast(error.message, error.errors);
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Deactivate tanker', variant: 'delete', size: 'large', disabled: false }}
        onClose={closeModal}
        specialStyle
      >
        <Title level="2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <div>
          <Label className="text-xs-sm">Tanker name</Label>
          <p className="font-semibold text-black text-xsm">{portName}</p>
        </div>
        <p className="text-black text-xsm">
          By deactivating your tanker you make it temporarily inaccessable for charterers. You will not be able to
          update its open position while inactive. You can reactivate the tanker and update its open positions any time.
        </p>
      </ModalFormManager>
    </FormProvider>
  );
};

DeactivateTankerForm.propTypes = DeactivateTankerFormPropTypes;

export default DeactivateTankerForm;
