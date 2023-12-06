'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import { CreateFleetFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { createFleetSchema } from '@/lib/schemas';
import { createFleet } from '@/services/fleets';
import { refetchFleets } from '@/store/entities/fleets/slice';
import { parseErrorMessage } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...createFleetSchema(),
});

const CreateFleetForm = ({ closeModal }) => {
  const methods = useHookFormParams({ schema });
  const dispatch = useDispatch();
  const onSubmit = async (formData) => {
    const { status, message: successMessage, error } = await createFleet({ data: formData });

    if (status === 200) {
      dispatch(refetchFleets());
      successToast(successMessage);
      closeModal();
    }
    if (error) {
      errorToast(parseErrorMessage(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Create fleet', variant: 'primary', size: 'large' }}
      >
        <Title level="2">Create a New Fleet</Title>
        <Input
          {...methods.register('fleetName')}
          label="Fleet name"
          placeholder="Enter name of the fleet"
          error={methods.formState.errors?.fleetName?.message}
        />
      </ModalFormManager>
    </FormProvider>
  );
};

CreateFleetForm.propTypes = CreateFleetFormPropTypes;

export default CreateFleetForm;
