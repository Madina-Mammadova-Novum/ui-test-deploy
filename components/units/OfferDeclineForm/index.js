'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclineFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({});

const defaultState = {};

const OfferDeclineForm = ({ closeModal, goBack, title = '' }) => {
  const methods = useHookFormParams({ state: defaultState, schema });

  const handleSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={(formData) => handleSubmit(formData)}
        submitButton={{ text: 'Show results', variant: 'secondary', size: 'large', className: 'hidden' }}
      >
        <OfferDeclineFields closeModal={closeModal} title={title} goBack={goBack} />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.propTypes = OfferDeclineFormPropTypes;

export default OfferDeclineForm;
