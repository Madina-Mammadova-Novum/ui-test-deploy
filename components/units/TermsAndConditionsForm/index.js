'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckBoxInput, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const TermsAndConditions = () => {
  const { setValue, watch, clearErrors } = useFormContext();

  const termsAndCondition = watch('agreedRules', false);

  useEffect(() => {
    setValue('agreedRules', termsAndCondition);
  }, []);

  const handleChange = (event) => {
    clearErrors('agreedRules');
    const { checked } = event.target;

    setValue('agreedRules', checked);
  };

  return (
    <div className="col-span-2 row-auto">
      <CheckBoxInput
        name="agreedRules"
        checked={termsAndCondition}
        onChange={handleChange}
        labelStyles="text-black inline-flex gap-1 text-xsm"
      >
        <p>
          I agree with all
          <NextLink href={ROUTES.PRIVACY_POLICY} className="text-blue underline px-1.5">
            Privacy Policy
          </NextLink>
          <span>and</span>
          <NextLink href={ROUTES.TERMS_AND_CONDITIONS} className="text-blue underline px-1.5">
            Terms of Use
          </NextLink>
        </p>
      </CheckBoxInput>
    </div>
  );
};

export default TermsAndConditions;
