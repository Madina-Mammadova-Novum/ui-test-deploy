'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@/elements';
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
  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const [agreedRules] = watch(['agreedRules']);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          buttonProps={{
            text: isSubmitting ? 'Please wait...' : 'Create account',
            variant: isSubmitting ? 'secondary' : 'primary',
            size: 'large',
          }}
          disabled={!agreedRules || isSubmitting}
          customStyles="mt-4 w-full"
        />
      </form>
    </FormProvider>
  );
};

export default OwnerRegistrationForm;
