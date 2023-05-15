'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { EditDateFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { dateSchema } from '@/lib/schemas';
import { DateDetailsForm } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const EditDateForm = ({ closeModal, title, portName }) => {
  const schema = yup.object().shape({
    ...dateSchema(),
  });

  const methods = useHookFormParams({ schema });
  const onSubmit = async (formData) => {
    return { formData };
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
        <DateDetailsForm portName={portName} />
      </ModalFormManager>
    </FormProvider>
  );
};

EditDateForm.propTypes = EditDateFormPropTypes;

export default EditDateForm;
