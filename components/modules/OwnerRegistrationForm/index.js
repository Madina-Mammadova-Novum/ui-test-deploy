'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/elements';
import { resetPassword } from '@/services/user';
import {
  CompanyAddresses,
  CompanyDetails,
  PersonalDetails,
  Step,
  TankerSlotsDetails,
  TermsAndConditions,
} from '@/units';
import { successToast } from '@/utils/hooks';

const OwnerRegistrationForm = () => {
  const methods = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log({ data });
    const { message } = await resetPassword({ data });
    successToast(message, 'Some description');
    methods.reset();
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
