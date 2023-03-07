'use client';

import { FormProvider, useForm } from 'react-hook-form';

// import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';

// import { signupSumbitAdapter } from '@/adapters/signupSubmitAdapter';
import { Button } from '@/elements';
import { resetPassword } from '@/services/user';
import { CompanyDetails, PersonalDetails, Step } from "@/units";
import { successToast } from '@/utils/hooks';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { signupSubmit } from '@/services/signup';
// import { setRules, setTankers } from '@/store/entities/signup/slice';
// import { useSignupSelector } from '@/store/selectors';
// import { CompanyAddresess, CompanyDetails, PersonalDetails, SlotsDetails, TermsAndConditions } from '@/ui';
// import { useHookForm } from '@/utils/hooks';

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
  // const dispatch = useDispatch();
  // const { rules, role, sameAddress } = useSignupSelector();
  // const [signup] = signupSubmit();
  // const { watch, reset, handleSubmit } = useHookForm();

  // const slots = watch('slots.count');

  // const handleRules = useCallback(() => {
  //   dispatch(setRules(!rules));
  // }, [dispatch, rules]);
  //
  // const handleSlots = useCallback(() => {
  //   dispatch(setTankers([slots]));
  // }, [dispatch, slots]);

  // const onSubmit = async (data) => {
  //   const result = signupSumbitAdapter(role, data, sameAddress);
  //   await signup({ role, ...result }).unwrap();
  //   reset();
  // };
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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
        <Button
          type="submit"
          buttonProps={{
            text: isSubmitting ? 'Please wait...' : 'Create account',
            variant: isSubmitting ? 'secondary' : 'primary',
            size: 'large',
          }}
          disabled={isSubmitting}
          customStyles="mt-4 w-full"
        />
      </form>
    </FormProvider>
  );
};

export default OwnerRegistrationForm;
