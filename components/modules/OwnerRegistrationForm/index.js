'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import {
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  tankerSlotsDetailsSchema,
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
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const OwnerRegistrationForm = () => {
  const [sameAddress, setSameAddress] = useState(true);

  const schema = yup.object().shape({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...tankerSlotsDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
  });

  const methods = useHookFormParams({ schema });
  const value = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    setSameAddress(value);
  }, [value]);

  const onSubmit = async (formData) => {
    const { error, data } = await ownerSignUp({ data: formData });
    if (data) {
      successToast(data.message, 'Check your email for validating the account');
      methods.reset();
    }
    if (error) {
      const { message, errors, description } = error;
      console.error(errors);
      errorToast(message, description);
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
