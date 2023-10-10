'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';
import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclinePropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { declineOfferSchema } from '@/lib/schemas';
import { declineOffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...declineOfferSchema(),
});

const OfferDeclineForm = ({ closeModal, goBack, title = '', showCancelButton, offerDetails, itemId }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const methods = useHookFormParams({ state: {}, schema });
  const reason = methods.watch('reason');

  const handleSubmit = async (formData) => {
    const { message: successMessage, error } = await declineOffer({
      data: { ...formData, offerId: itemId },
      role: session?.role,
    });

    if (!error) {
      successToast(successMessage);
      dispatch(fetchUserNegotiating());
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
          text: 'Proceed',
          variant: 'delete',
          size: 'large',
          disabled: !reason,
          className: `absolute cursor-pointer !max-w-[145px] whitespace-nowrap right-8 bottom-8 !px-2.5 ${
            !showCancelButton && 'left-8 !max-w-[unset] !w-auto'
          }`,
        }}
        className="!gap-0"
      >
        <OfferDeclineFields
          closeModal={closeModal}
          title={title}
          goBack={goBack}
          showCancelButton={showCancelButton}
          offerDetails={offerDetails}
        />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.propTypes = OfferDeclinePropTypes;

export default OfferDeclineForm;
