'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclinePropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { declineOffer } from '@/services/offer';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({});

const defaultState = {};

const OfferDeclineForm = ({ closeModal, goBack, title = '', showCancelButton }) => {
  const methods = useHookFormParams({ state: defaultState, schema });
  const isEmpty = methods.watch('reason');

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
