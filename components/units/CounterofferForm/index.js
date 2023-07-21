'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import {
  // errorToast,
  // successToast,
  useHookFormParams,
} from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const CounterofferForm = ({ children, allowSubmit = false, data }) => {
  const { cargoType, products, offerId, responseCountdown } = data;
  const methods = useHookFormParams({
    schema,
    state: {
      cargoType,
      ...products
        .filter((product) => product)
        .reduce(
          (_, curr, index) => ({
            [`products[${index}].product`]: curr.product,
            [`products[${index}].density`]: curr.density,
            [`products[${index}].tolerance`]: curr.tolerance,
            [`products[${index}].quantity`]: curr.quantity,
          }),
          {}
        ),
    },
  });

  const handleSubmit = async (formData) => {
    const response = await sendCounteroffer({ data: { ...formData, offerId, responseCountdown } });
    console.log(response);
    // if (data) {
    //   successToast(data.message);
    // }
    // if (error) {
    //   const { message, errors, description } = error;
    //   console.error(errors);
    //   errorToast(message, description);
    // }
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
