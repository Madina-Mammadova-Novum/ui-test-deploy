'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { OfferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { getOfferSelector } from '@/store/selectors';
import { useHookFormParams } from '@/utils/hooks';

const OfferForm = ({ children, disabled, handleSubmit = () => {}, handleValidationError = () => {} }) => {
  const { formState, ranges } = useSelector(getOfferSelector);

  const [freightState, setFreightState] = useState({});

  const schema = yup.object({ ...offerSchema({ ...ranges, currentFreight: freightState }) });
  const methods = useHookFormParams({ schema, state: formState });

  const freightType = methods.watch('freight');
  const freightValue = methods.watch('value');

  useEffect(() => {
    setFreightState({ type: freightType?.value, value: freightValue });
  }, [freightType?.value, freightValue]);

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        onErrorAction={handleValidationError}
        className="!gap-0"
        submitButton={{
          text: 'Send offer',
          variant: 'primary',
          size: 'large',
          disabled,
          className: 'absolute bottom-8 right-8 text-xsm z-[1] !w-32',
        }}
      >
        {children}
      </FormManager>
    </FormProvider>
  );
};

OfferForm.propTypes = OfferFormPropTypes;

export default OfferForm;
