'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import { captchaSchema, companyAddressesSchema, termsAndConditionsSchema } from '@/lib/schemas';
import { Captcha, CompanyAddresses, TermsAndConditions } from '@/units';
import { shouldShowCaptcha } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const CompanyAddressStepForm = ({ onFormValid, initialData = {}, countries = [] }) => {
  const [sameAddress, setSameAddress] = React.useState(false);
  const [captcha, setCaptcha] = React.useState('');

  const schema = yup.object().shape({
    ...companyAddressesSchema(sameAddress),
    ...termsAndConditionsSchema(),
    ...(shouldShowCaptcha() ? captchaSchema() : {}),
  });

  const methods = useHookFormParams({
    schema,
    state: initialData,
    mode: 'onChange',
  });

  const {
    formState: { isValid },
    watch,
    setValue,
  } = methods;

  const addressValue = watch('sameAddresses', sameAddress);
  const formValues = watch();

  React.useEffect(() => {
    if (shouldShowCaptcha()) {
      setValue('captcha', captcha);
    }
    setValue('sameAddresses', addressValue);
    setSameAddress(addressValue);
  }, [addressValue, setValue, captcha]);

  // Notify parent component about form validity
  React.useEffect(() => {
    onFormValid(isValid, formValues);
  }, [isValid, formValues, onFormValid]);

  return (
    <FormProvider {...methods}>
      <FormManager
        className="flex flex-col gap-6"
        submitAction={() => {}} // No submit action as it's handled by parent
        hideSubmitButton
      >
        <CompanyAddresses countries={countries} />
        <TermsAndConditions />
        {shouldShowCaptcha() && <Captcha onChange={setCaptcha} />}
      </FormManager>
    </FormProvider>
  );
};

CompanyAddressStepForm.propTypes = {
  onFormValid: PropTypes.func.isRequired,
  initialData: PropTypes.shape(),
  countries: PropTypes.arrayOf(PropTypes.shape()),
};

export default CompanyAddressStepForm;
