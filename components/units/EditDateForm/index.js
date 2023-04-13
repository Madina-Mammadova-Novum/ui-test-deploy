'use client';

import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { dateSchema } from '@/lib/schemas';
import { DateDetailsForm } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const EditDateForm = ({ title, portName }) => {
  const schema = yup.object().shape({
    ...dateSchema(),
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
      >
        <Title level="h2" className="font-bold capitalize text-black text-lg">
          {title}
        </Title>
        <DateDetailsForm portName={portName} />
      </FormManager>
    </FormProvider>
  );
};

EditDateForm.propTypes = {
  title: PropTypes.string.isRequired,
  portName: PropTypes.string,
};

export default EditDateForm;
