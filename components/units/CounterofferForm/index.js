'use client';

/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { getPrefilledFormDataAdapter } from '@/adapters/offer';
import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { getOfferSelector } from '@/store/selectors';
import { getCookieFromBrowser } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const CounterofferForm = ({
  children,
  allowSubmit = false,
  data,
  closeModal,
  handleConfirmCounteroffer,
  handleValidationError,
  disabled,
  setDisabled,
  onFormChange = () => {},
}) => {
  const dispatch = useDispatch();
  const role = getCookieFromBrowser('session-user-role');
  const { ranges } = useSelector(getOfferSelector);

  const [freightState, setFreightState] = useState({});
  const formState = { ...data, ...getPrefilledFormDataAdapter({ data: data?.products || [] }) };

  const schema = yup.object({ ...offerSchema({ ...ranges, currentFreight: freightState }) });
  const methods = useHookFormParams({ schema, state: formState });

  const freightType = methods.watch('freight');
  const freightValue = methods.watch('value');

  // Pass form methods to parent
  useEffect(() => {
    onFormChange(methods);
  }, [methods]);

  useEffect(() => {
    setFreightState({ type: freightType?.value, value: freightValue });
  }, [freightType, freightValue]);

  const handleSubmit = async (formData) => {
    setDisabled(true);

    if (!allowSubmit) {
      setDisabled(false);
      return handleConfirmCounteroffer();
    }

    const comment = formData?.comment || null;

    const { message: successMessage, error } = await sendCounteroffer({
      data: {
        additionalDischargeOptions: data?.additionalDischargeOptions,
        excludeInternationallySanctioned: data?.excludeInternationallySanctioned,
        sanctionedCountries: data?.sanctionedCountries,
        ...formData,
        comment,
        offerId: data?.offerId,
        responseCountdown: data?.responseCountdown,
      },
      role,
    });

    if (!error) {
      setDisabled(false);
      successToast(successMessage);
      dispatch(fetchUserNegotiating({ page: 1, perPage: 5 }));
      closeModal();
    } else {
      setDisabled(false);
      errorToast('Bad request', error?.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        onErrorAction={handleValidationError}
        className="flex h-full flex-col justify-between !gap-0"
        submitButton={{
          text: allowSubmit ? 'Confirm Changes and Send' : 'Proceed',
          variant: 'primary',
          size: 'large',
          className: 'ml-auto',
          disabled,
        }}
      >
        {children}
      </FormManager>
    </FormProvider>
  );
};

CounterofferForm.propTypes = CounterofferFormPropTypes;

export default CounterofferForm;
