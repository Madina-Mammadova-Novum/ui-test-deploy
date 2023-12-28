'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { EditPortFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { portsSchema } from '@/lib/schemas';
import { getUserPositionById } from '@/services';
import { getUnassignedVessels, updateVesselPortAndDate } from '@/services/vessel';
import { updateUnassignedFleet } from '@/store/entities/fleets/slice';
import { updateTankersByFleetId } from '@/store/entities/positions/slice';
import { PortDetailsForm } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const EditPortForm = ({ title, state, closeModal }) => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    ...portsSchema(),
  });

  const methods = useHookFormParams({ schema, state });

  const onSubmit = async ({ port }) => {
    const { error, message } = await updateVesselPortAndDate({ ...state, portId: port?.value });

    if (!error) {
      if (state?.type === 'assigned') {
        const { data: assignedTankers } = await getUserPositionById({ id: state?.fleetId });
        dispatch(updateTankersByFleetId({ fleetId: state.fleetId, tankers: assignedTankers }));
      } else if (state?.type === 'unassigned') {
        const { data: unassignedTankers } = await getUnassignedVessels();
        dispatch(updateUnassignedFleet({ id: state.id, tankers: unassignedTankers }));
      }
      closeModal();
    }

    if (message) successToast(message);
    if (error) errorToast(error?.title, error?.message);
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Apply changes', variant: 'primary', size: 'large', disabled: false }}
        specialStyle
        onClose={closeModal}
      >
        <Title level="2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <PortDetailsForm portName={state?.name} />
      </FormManager>
    </FormProvider>
  );
};

EditPortForm.propTypes = EditPortFormPropTypes;

export default EditPortForm;
