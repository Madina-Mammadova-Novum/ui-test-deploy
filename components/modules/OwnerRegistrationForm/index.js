'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import { ROUTES } from '@/lib';
import {
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  tankerSlotsDetailsSchema,
  termsAndConditionsSchema,
} from '@/lib/schemas';
import { ownerSignUp } from '@/services/user';
import {
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TankerSlotsDetails,
  TermsAndConditions,
} from '@/units';
import { resetForm } from '@/utils/helpers';
import { errorToast, redirectAfterToast, useHookFormParams } from '@/utils/hooks';

const OwnerRegistrationForm = () => {
  const [sameAddress, setSameAddress] = useState(false);

  const schema = yup.object().shape({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...tankerSlotsDetailsSchema(),
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
    const { status, error, data } = await ownerSignUp({ data: formData });

    if (status === 200) {
      resetForm(methods, '');
      Promise.resolve(redirectAfterToast(data.message, ROUTES.ROOT));
    }
    if (error) {
      errorToast(error.message, error.errors);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="pb-5"
        submitButton={{
          text: 'Create account',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
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
        <Step title="Step 4: How many tankers do you have?" containerClass="flex flex-col gap-5">
          <TankerSlotsDetails />
        </Step>
        <Divider />
        <Step title="Step #5: Company Addresss" containerClass="flex flex-col gap-5">
          <CompanyAddresses />
        </Step>
        <TermsAndConditions />
      </FormManager>
    </FormProvider>
  );
};

export default OwnerRegistrationForm;
