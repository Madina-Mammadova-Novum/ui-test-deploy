'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { EditPortFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { portsSchema } from '@/lib/schemas';
import { getUserPositionById } from '@/services';
import { updateVesselPortAndDate } from '@/services/vessel';
import { updateTankersByFleetId } from '@/store/entities/positions/slice';
import { PortDetailsForm } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const EditPortForm = ({ closeModal, title, modalState }) => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    ...portsSchema(),
  });

  const methods = useHookFormParams({ schema });

  const onSubmit = async ({ port }) => {
    const { error, data, status } = await updateVesselPortAndDate({
      ...modalState,
      portId: port?.value,
    });

    if (status === 200) {
      const { data: tankers } = await getUserPositionById({ id: modalState?.fleetId });

      dispatch(updateTankersByFleetId({ fleetId: modalState.fleetId, tankers }));
    }

    if (data?.message) successToast(data.message);
    if (error) errorToast(error.message, error.errors);
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Apply changes', variant: 'primary', size: 'large', disabled: false }}
        onClose={closeModal}
        specialStyle
      >
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <PortDetailsForm portName={modalState?.name} />
      </ModalFormManager>
    </FormProvider>
  );
};

EditPortForm.propTypes = EditPortFormPropTypes;

export default EditPortForm;
