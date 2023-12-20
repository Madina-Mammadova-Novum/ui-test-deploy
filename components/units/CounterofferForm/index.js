'use client';

/* eslint-disable consistent-return */
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { COUNTEROFFER_REQUIREMENTS_ERROR } from '@/lib/constants';
import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { getUserDataSelector } from '@/store/selectors';
import { counterofferMinimumImprovementAchieved, parseErrorMessage } from '@/utils/helpers';
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
  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);

  const { products, offerId, responseCountdown } = data;

  const methods = useHookFormParams({
    schema,
    state: {
      ...data,
      ...products
        .filter((product) => product)
        .reduce((resulted, curr, index) => {
          resulted[`products[${index}].product`] = curr.product;
          resulted[`products[${index}].density`] = curr.density;
          resulted[`products[${index}].tolerance`] = curr.tolerance;
          resulted[`products[${index}].quantity`] = curr.quantity;
          return resulted;
        }, {}),
    },
  });

  const handleSubmit = async (formData) => {
    if (!counterofferMinimumImprovementAchieved({ initialOffer: data, counterOffer: formData }))
      return errorToast(COUNTEROFFER_REQUIREMENTS_ERROR);
    if (!allowSubmit) return handleConfirmCounteroffer();

    const { message: successMessage, error } = await sendCounteroffer({
      data: { ...formData, offerId, responseCountdown },
      role,
    });
    if (!error) {
      successToast(successMessage);
      dispatch(fetchUserNegotiating());
      closeModal();
    } else {
      errorToast(parseErrorMessage(error));
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
