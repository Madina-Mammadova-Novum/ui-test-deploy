'use client';

/* eslint-disable consistent-return */
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';
import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import { refetchNegotiatingOffers } from '@/store/entities/negotiating/slice';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const CounterofferForm = ({
  children,
  allowSubmit = false,
  data,
  closeModal,
  handleConfirmCounteroffer,
  handleValidationError,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
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
    if (!allowSubmit) return handleConfirmCounteroffer();

    const { message: successMessage, error } = await sendCounteroffer({
      data: { ...formData, offerId, responseCountdown, products },
      role: session?.role,
    });
    if (!error) {
      dispatch(refetchNegotiatingOffers());
      successToast(successMessage);
      closeModal();
    } else {
      const { errors, message } = error;
      errorToast(parseErrors({ ...errors, ...message }));
    }
    
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        onErrorAction={handleValidationError}
        className="!gap-0"
        submitButton={
          allowSubmit
            ? {
                text: 'Confirm Changes and Send',
                variant: 'primary',
                size: 'large',
                className: 'ml-auto',
              }
            : { text: 'Proceed', variant: 'primary', size: 'large', className: 'ml-auto' }
        }
      >
        {children}
      </FormManager>
    </FormProvider>
  );
};

CounterofferForm.propTypes = CounterofferFormPropTypes;

export default CounterofferForm;
