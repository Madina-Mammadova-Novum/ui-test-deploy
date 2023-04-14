'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { sendOffer } from '@/services/offer';
import { CommercialOfferTerms } from '@/units';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const OfferForm = () => {
  const methods = useHookFormParams({ schema });

  const handleSubmit = async (formData) => {
    const { error, data } = await sendOffer({ data: formData });
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
        submitButton={{
          text: 'Send offer',
          variant: 'primary',
          size: 'large',
          className: 'absolute bottom-8 right-8 text-xsm !w-max z-[1]',
        }}
      >
        <CommercialOfferTerms />
      </FormManager>
    </FormProvider>
  );
};

export default OfferForm;
