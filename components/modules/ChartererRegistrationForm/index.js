'use client';

import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormManager } from "@/common";
import {
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  // tankerSlotsDetailsSchema
} from "@/lib/schemas";
import {
  CharteringSlotsDetails,
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TermsAndConditions
} from "@/units";

const schema = yup
  .object({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    // ...tankerSlotsDetailsSchema(),
    // ...companyAddressesSchema(),
    // ...termsAndConditionsSchema()
  })
  .required();

const ChartererRegistrationForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    console.log({ formData });
  }

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
        <Step title="Step #4: Company Addresss" containerClass="flex flex-col py-5 gap-5">
          <CompanyAddresses />
        </Step>
        <Step title="Step 5: Recent Chartering Experience" containerClass="flex flex-col py-5 gap-5">
          <CharteringSlotsDetails />
        </Step>
        <TermsAndConditions />
      </FormManager>
    </FormProvider>
  );
};
//
export default ChartererRegistrationForm;
