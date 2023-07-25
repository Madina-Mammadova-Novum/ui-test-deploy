'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclinePropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { declineOfferSchema } from '@/lib/schemas';
import { declineOffer } from '@/services/offer';
import { refetchNegotiatingOffers } from '@/store/entities/negotiating/slice';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...declineOfferSchema(),
});

const defaultState = {};

const OfferDeclineForm = ({ closeModal, goBack, title = '', showCancelButton, itemId }) => {
  const methods = useHookFormParams({ state: defaultState, schema });
  const isEmpty = methods.watch('reason');
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    const { message: successMessage, error } = await declineOffer({ data: { ...formData, offerId: itemId } });

    if (!error) {
      successToast(successMessage);
      dispatch(refetchNegotiatingOffers());
      closeModal();
    } else {
      const { errors } = error;
      errorToast(parseErrors(errors));
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        submitButton={{
          text: 'Send the Decline',
          variant: 'delete',
          size: 'large',
          disabled: isEmpty === undefined || isEmpty === '',
          className: `absolute cursor-pointer !max-w-[145px] whitespace-nowrap right-8 bottom-8 !px-2.5 ${
            !showCancelButton && 'left-8 !max-w-[unset] !w-auto'
          }`,
        }}
        className="!gap-0"
      >
        <OfferDeclineFields closeModal={closeModal} title={title} goBack={goBack} showCancelButton={showCancelButton} />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.propTypes = OfferDeclinePropTypes;

export default OfferDeclineForm;
