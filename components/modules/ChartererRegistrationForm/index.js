'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import {
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  // termsAndConditionsSchema,
} from '@/lib/schemas';
import {
  CargoesSlotsDetails,
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TermsAndConditions,
} from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup
  .object({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...companyAddressesSchema(),
  })
  .required();

const ChartererRegistrationForm = () => {
  const methods = useHookFormParams({ schema });

  const onSubmit = async (formData) => {
    return { formData };
  };

  return (
    <FormProvider {...methods}>
      <FormManager
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
//
export default ChartererRegistrationForm;
