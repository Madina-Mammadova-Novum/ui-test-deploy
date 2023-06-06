'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { EditFleetFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { editFleetSchema } from '@/lib/schemas';
import { editFleet } from '@/services/fleets';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...editFleetSchema(),
});

const EditFleetForm = ({ closeModal, id }) => {
  const methods = useHookFormParams({ schema });
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const { status, message, error } = await editFleet({ data: formData, fleetId: id });

    if (status === 200) {
      dispatch(refetchFleets());
      successToast(message);
      closeModal();
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Save changes', variant: 'primary', size: 'large' }}
      >
        <Title level="2">Edit Fleet</Title>
        <Input {...methods.register('fleetName')} label="Fleet name" placeholder="Enter name of the fleet" />
      </ModalFormManager>
    </FormProvider>
  );
};

EditFleetForm.propTypes = EditFleetFormPropTypes;

export default EditFleetForm;
