'use client';

import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { FormManager } from '@/common';
import { useHookFormParams } from '@/utils/hooks';


const schema = yup.object({});

const defaultState = {};

const OfferDeclineForm = ({ closeModal }) => {
  const methods = useHookFormParams({ state: defaultState, schema });

  const handleSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={(formData) => handleSubmit(formData)}
        submitButton={{ text: 'Show results', variant: 'secondary', size: 'large', className: 'hidden' }}
      >
        <OfferDeclineFields closeModal={closeModal} />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.defaultProps = {
  setStep: () => {},
  closeModal: () => {},
};

OfferDeclineForm.propTypes = {
  setStep: PropTypes.func,
  closeModal: PropTypes.func,
};

export default OfferDeclineForm;
