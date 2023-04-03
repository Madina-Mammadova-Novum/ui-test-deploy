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
      successToast(data.message, 'Have a good deal!');
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
        submitButton={{ text: 'Submit', variant: 'primary', size: 'large', className: '' }}
      >
        <CommercialOfferTerms />
      </FormManager>
    </FormProvider>
  );
};

export default OfferForm;
