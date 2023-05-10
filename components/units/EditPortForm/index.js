'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { EditPortFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { portsSchema } from '@/lib/schemas';
import { PortDetailsForm } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const EditPortForm = ({ closeModal, title, portName }) => {
  const schema = yup.object().shape({
    ...portsSchema(),
  });

  const methods = useHookFormParams({ schema });

  const onSubmit = async (formData) => {
    return { formData };
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="w-[356px]"
        submitAction={onSubmit}
        submitButton={{ text: 'Apply changes', variant: 'primary', size: 'large', disabled: false }}
        onClose={closeModal}
        specialStyle
      >
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <PortDetailsForm portName={portName} />
      </FormManager>
    </FormProvider>
  );
};

EditPortForm.propTypes = EditPortFormPropTypes;

export default EditPortForm;
