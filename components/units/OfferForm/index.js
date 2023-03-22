import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { CommercialOfferTerms } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const OfferForm = () => {
  const methods = useHookFormParams({ schema });
  const handleSubmit = (data) => console.log(data);
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
