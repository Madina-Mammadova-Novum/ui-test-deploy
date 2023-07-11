'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { EditPortFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { portsSchema } from '@/lib/schemas';
import { updateVesselPortAndDate } from '@/services/vessel';
import { PortDetailsForm } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const EditPortForm = ({ closeModal, title, modalState }) => {
  const schema = yup.object().shape({
    ...portsSchema(),
  });

  const methods = useHookFormParams({ schema });

  const onSubmit = async ({ port }) => {
    const { error, data } = await updateVesselPortAndDate({
      ...modalState,
      portId: port?.value,
    });

    if (data?.message) successToast(data.message);
    if (error) errorToast(error.message, error.errors[0]);
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
