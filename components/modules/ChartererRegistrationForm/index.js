'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import {
  cargoesSlotsDetailsSchema,
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  termsAndConditionsSchema,
} from '@/lib/schemas';
import { chartererSignUp } from '@/services';
import {
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

  const schema = yup.object().shape({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...cargoesSlotsDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
    ...termsAndConditionsSchema(),
  });

  const methods = useHookFormParams({ schema });

  const addressValue = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    methods.setValue('sameAddresses', addressValue);
    setSameAddress(addressValue);
  }, [addressValue, methods]);

  const onSubmit = async (formData) => {
    const { status, error } = await chartererSignUp({ data: formData });

    if (status === 200) {
      resetForm(methods, '');
      redirectAfterToast(
        'To confirm registration, follow the link that was sent to the email address, you provided',
        '/'
      );
    }
    if (error) {
      errorToast(error.message, error.errors);
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
        <Step title="Step #2: Personal details" containerClass="flex flex-col gap-5">
          <PersonalDetails />
          <p className="text-black font-semibold text-sm pt-5">Enter a strong password according to our requirements</p>
          <PasswordValidation />
        </Step>
        <Divider />
        <Step title="Step #3: Choose who you are" containerClass="flex flex-col gap-5">
          <CompanyDetails />
        </Step>
        <Divider />
        <Step title="Step #4: Company Addresss" containerClass="flex flex-col gap-5">
          <CompanyAddresses />
        </Step>
        <Divider />
        <Step title="Step #5: Recent Chartering Experience" containerClass="flex flex-col gap-5">
          <CargoesSlotsDetails />
        </Step>
        <TermsAndConditions />
      </FormManager>
    </FormProvider>
  );
};

export default ChartererRegistrationForm;
