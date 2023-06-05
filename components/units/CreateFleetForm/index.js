'use client';

import { FormProvider } from 'react-hook-form';

// import * as yup from 'yup';

import { CreateFleetFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { useHookFormParams } from '@/utils/hooks';

const CreateFleetForm = ({ closeModal }) => {
  const methods = useHookFormParams({ schema: {} });
  const onSubmit = async (formData) => console.log(formData);

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Create fleet', variant: 'primary', size: 'large' }}
      >
        <Title level="2">Create a New Fleet</Title>
        <Input {...methods.register('fleetName')} label="Fleet name" placeholder="Enter name of the fleet" />
      </ModalFormManager>
    </FormProvider>
  );
};

CreateFleetForm.propTypes = CreateFleetFormPropTypes;

export default CreateFleetForm;
