'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const CounterofferForm = ({ children, allowSubmit = false }) => {
  const methods = useHookFormParams({ schema });

  const handleSubmit = async (formData) => {
    const { error, data } = await sendCounteroffer({ data: formData });
    if (data) {
      successToast(data.message);
      methods.reset();
    }
    if (error) {
      const { message, errors, description } = error;
      console.error(errors);
      errorToast(message, description);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        className="!gap-0"
        submitButton={
          allowSubmit && {
            text: 'Confirm Changes and Send',
            variant: 'primary',
            size: 'large',
            className: 'absolute bottom-8 right-8 text-xsm !w-max z-[1]',
          }
        }
      >
        {children}
      </FormManager>
    </FormProvider>
  );
};

CounterofferForm.propTypes = CounterofferFormPropTypes;

export default CounterofferForm;
