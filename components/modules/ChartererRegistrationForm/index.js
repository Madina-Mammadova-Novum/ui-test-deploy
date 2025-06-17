'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import { ROUTES } from '@/lib';
import {
  captchaSchema,
  cargoesSlotsDetailsSchema,
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  termsAndConditionsSchema,
} from '@/lib/schemas';
import { chartererSignUp } from '@/services';
import {
  Captcha,
  CargoesSlotsDetails,
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TermsAndConditions,
} from '@/units';
import { getFieldFromKey, resetForm, setCookie, shouldShowCaptcha } from '@/utils/helpers';
import { errorToast, redirectAfterToast, useHookFormParams } from '@/utils/hooks';

const ChartererRegistrationForm = ({ countries }) => {
  const [sameAddress, setSameAddress] = useState(false);
  const [samePhone, setSamePhone] = useState(false);
  const [captcha, setCaptcha] = useState('');

  const schema = yup.object().shape({
    ...personalDetailsSchema({ isRegister: true }),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(samePhone),
    ...cargoesSlotsDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
    ...termsAndConditionsSchema(),
    ...(shouldShowCaptcha() ? captchaSchema() : {}),
  });

  const methods = useHookFormParams({ schema });

  const addressValue = methods.watch('sameAddresses', sameAddress);
  const phoneValue = methods.watch('samePhone', samePhone);

  useEffect(() => {
    if (shouldShowCaptcha()) {
      methods.setValue('captcha', captcha);
    }
    methods.setValue('sameAddresses', addressValue);
    methods.setValue('samePhone', phoneValue);

    setSameAddress(addressValue);
    setSamePhone(phoneValue);
  }, [addressValue, phoneValue, methods, captcha]);

  const onSubmit = async (formData) => {
    const { error, data } = await chartererSignUp({ data: formData });

    if (!error) {
      setCookie('session-user-email', formData.email);
      resetForm(methods, '');

      Promise.resolve(redirectAfterToast(data.message, ROUTES.GETTING_STARTED));
    } else {
      const errorKeys = Object.keys(error?.errors || {});

      errorKeys?.forEach((key) => {
        if (error?.errors[key]?.length > 0) {
          methods.setError(getFieldFromKey(key), {
            message: error?.errors[key][0],
          });
        }
      });

      errorToast(error?.title, error?.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="pb-5"
        submitAction={onSubmit}
        submitButton={{
          text: 'Create account',
          variant: 'primary',
          size: 'large',
        }}
      >
        <Divider className="mt-5" />
        <Step title="Step #2: User Details" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <PersonalDetails />
          <p className="pt-5 text-sm font-semibold text-black">Enter a password for account access</p>
          <PasswordValidation
            helperData={{
              password: { label: 'chose password', placeholder: 'Enter your password' },
              confirm: { label: 'confirm password', placeholder: 'Enter your password' },
            }}
          />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #3: Company Details" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyDetails />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #4: Company Address" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyAddresses countries={countries} />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #5: Recent Chartering Experience" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CargoesSlotsDetails applyHelper />
        </Step>
        <TermsAndConditions />
        {shouldShowCaptcha() && <Captcha onChange={setCaptcha} />}
      </FormManager>
    </FormProvider>
  );
};

ChartererRegistrationForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape()),
  ports: PropTypes.arrayOf(PropTypes.shape()),
};

export default ChartererRegistrationForm;
