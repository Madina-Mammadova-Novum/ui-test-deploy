'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

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
import { resetForm } from '@/utils/helpers';
import { errorToast, redirectAfterToast, useHookFormParams } from '@/utils/hooks';

const ChartererRegistrationForm = () => {
  const [sameAddress, setSameAddress] = useState(false);
  const [captcha, setCaptcha] = useState('');

  const schema = yup.object().shape({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...cargoesSlotsDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
    ...termsAndConditionsSchema(),
    ...captchaSchema(),
  });

  const methods = useHookFormParams({ schema });

  const addressValue = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    methods.setValue('captcha', captcha);
    methods.setValue('sameAddresses', addressValue);

    setSameAddress(addressValue);
  }, [addressValue, methods, captcha]);

  const onSubmit = async (formData) => {
    const { status, error, data } = await chartererSignUp({ data: formData });

    if (status === 200) {
      resetForm(methods, '');
      Promise.resolve(redirectAfterToast(data.message, ROUTES.ROOT));
    }
    if (error) {
      errorToast(error.title, error.message);
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
          <p className="text-black font-semibold text-sm pt-5">Enter a password for account access</p>
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
        <Step title="Step #4: Company Addresss" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyAddresses />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #5: Recent Chartering Experience" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CargoesSlotsDetails applyHelper />
        </Step>
        <TermsAndConditions />
        <Captcha onChange={setCaptcha} />
      </FormManager>
    </FormProvider>
  );
};

export default ChartererRegistrationForm;
