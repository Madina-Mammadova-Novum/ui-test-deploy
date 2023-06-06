'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { CreateFleetFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Input, Title } from '@/elements';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { createFleetSchema } from '@/lib/schemas';
import { createFleet } from '@/services/fleets';

const schema = yup.object({
  ...createFleetSchema()
})

const CreateFleetForm = ({ closeModal }) => {
  const methods = useHookFormParams({ schema });
  const onSubmit = async (formData) => {
    const { status, error } = await createFleet({ data: formData })
    
    if(status === 200) {
      successToast('Your have successfully created a new fleet');
      closeModal()
    }
    if(error) {
      const { message } = error
      errorToast(...Object.values(message))
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
