'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { EditDateFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { dateSchema } from '@/lib/schemas';
import { updateVesselPortAndDate } from '@/services/vessel';
import { DateDetailsForm } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const EditDateForm = ({ closeModal, title, modalState }) => {
  const schema = yup.object().shape({
    ...dateSchema(),
  });

  const { id, portId, name } = modalState;

  const methods = useHookFormParams({ schema });
  const onSubmit = async ({ date }) => {
    const result = {
      id,
      date,
      portId,
    };

    const { error, data } = await updateVesselPortAndDate(result);

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
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <DateDetailsForm portName={name} />
      </ModalFormManager>
    </FormProvider>
  );
};

EditDateForm.propTypes = EditDateFormPropTypes;

export default EditDateForm;
