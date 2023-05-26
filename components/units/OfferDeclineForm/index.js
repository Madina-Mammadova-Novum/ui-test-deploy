'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclinePropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';
import { declineOffer } from '@/services/offer';

const schema = yup.object({});

const defaultState = {};

const OfferDeclineForm = ({ closeModal, goBack, title = '' }) => {
  const methods = useHookFormParams({ state: defaultState, schema });

  const handleSubmit = async (formData) => {
    const { error, data } = await declineOffer({ data: formData });

    if (data) {
      const { message } = data;
      successToast(message);
    }
    if (error) {
      const { message, description } = error;
      errorToast(message, description);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={(formData) => handleSubmit(formData)}
        submitButton={{ text: 'Send the Decline', variant: 'delete', size: 'large', className: 'absolute !max-w-[145px] whitespace-nowrap right-8 bottom-8 !px-2.5'}}
        className="!gap-0"
      >
        <OfferDeclineFields closeModal={closeModal} title={title} goBack={goBack} />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.propTypes = OfferDeclinePropTypes;

export default OfferDeclineForm;
