'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormManager } from '@/common';
import {
  // companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  tankerSlotsDetailsSchema,
  // termsAndConditionsSchema
} from '@/lib/schemas';
import { singUp } from '@/services/user';
import {
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TankerSlotsDetails,
  TermsAndConditions,
} from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const schema = yup
  .object({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...tankerSlotsDetailsSchema(),
    // ...companyAddressesSchema(),
    // ...termsAndConditionsSchema()
  })
  .required();

const OwnerRegistrationForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const { error, data } = await singUp({ data: formData });
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
        submitButton={{
          text: 'Create account',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <hr className="divide" />
        <Step title="Step #2: Personal details" containerClass="flex flex-col py-5 gap-5">
          <PersonalDetails />
          <p className="text-black font-semibold text-sm py-5">Enter a strong password according to our requirements</p>
          <PasswordValidation />
        </Step>
        <hr className="divide" />
        <Step title="Step #3: Choose who you are" containerClass="flex flex-col py-5 gap-5">
          <CompanyDetails />
        </Step>
        <hr className="divide" />
        <Step title="Step 4: How many tankers do you have?" containerClass="flex flex-col py-5 gap-5">
          <TankerSlotsDetails />
        </Step>
        <hr className="divide" />
        <Step title="Step #5: Company Addresss" containerClass="flex flex-col py-5 gap-5">
          <CompanyAddresses />
        </Step>
        <TermsAndConditions />
      </FormManager>
    </FormProvider>
  );
};

export default OwnerRegistrationForm;
