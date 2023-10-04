'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { EditDateFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { dateSchema } from '@/lib/schemas';
import { getUserPositionById } from '@/services';
import { getUnassignedVessels, updateVesselPortAndDate } from '@/services/vessel';
import { updateUnassignedFleet } from '@/store/entities/fleets/slice';
import { updateTankersByFleetId } from '@/store/entities/positions/slice';
import { DateDetailsForm } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const EditDateForm = ({ state, title, closeModal }) => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    ...dateSchema(),
  });

  const methods = useHookFormParams({ state, schema });

  const onSubmit = async ({ date }) => {
    const { error, data, status } = await updateVesselPortAndDate({
      ...state,
      date,
    });

    if (status === 200) {
      if (state?.type === 'assigned') {
        const { data: assignedTankers } = await getUserPositionById({ id: state?.fleetId });
        dispatch(updateTankersByFleetId({ fleetId: state.fleetId, tankers: assignedTankers }));
      } else if (state?.type === 'unassigned') {
        const { data: unassignedTankers } = await getUnassignedVessels();
        dispatch(updateUnassignedFleet({ id: state.id, tankers: unassignedTankers }));
      }
      closeModal();
    }

    if (data?.message) successToast(data.message);
    if (error) errorToast(error.message, error.errors);
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        specialStyle
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Apply changes', variant: 'primary', size: 'large', disabled: false }}
        onClose={closeModal}
      >
        <Title level="2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <DateDetailsForm portName={state?.name} />
      </ModalFormManager>
    </FormProvider>
  );
};

EditDateForm.propTypes = EditDateFormPropTypes;

export default EditDateForm;
