'use client';

/* eslint-disable consistent-return */
// import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// import * as yup from 'yup';

import { CounterofferFormPropTypes } from '@/lib/types';

import { getPrefilledFormDataAdapter } from '@/adapters/offer';
import { FormManager } from '@/common';
// import { offerSchema } from '@/lib/schemas';
import { sendCounteroffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { getUserDataSelector } from '@/store/selectors';
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
}) => {
  const dispatch = useDispatch();
  // const [freightState, setFreightState] = useState({});

  const { role } = useSelector(getUserDataSelector);
  // const schema = yup.object({ ...offerSchema({ currentFreight: freightState }) });

  const formState = { ...data, ...getPrefilledFormDataAdapter({ data: data?.products || [] }) };
  const methods = useHookFormParams({ state: formState });

  // const freightType = methods.watch('freight');
  // const freightValue = methods.watch('value');

  // useEffect(() => {
  //   setFreightState({ type: freightType, value: freightValue });
  // }, [freightType, freightValue]);

  const handleSubmit = async (formData) => {
    setDisabled(true);

    if (!allowSubmit) {
      setDisabled(false);
      return handleConfirmCounteroffer();
    }

    const { message: successMessage, error } = await sendCounteroffer({
      data: { ...formData, offerId: data?.offerId, responseCountdown: data?.responseCountdown },
      role,
    });

    if (!error) {
      setDisabled(false);
      successToast(successMessage);
      dispatch(fetchUserNegotiating({ page: 1, perPage: 5 }));
      closeModal();
    } else {
      setDisabled(false);
      errorToast('Bad request', error?.title);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        onErrorAction={handleValidationError}
        className="!gap-0"
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
