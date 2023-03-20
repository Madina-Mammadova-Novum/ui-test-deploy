'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckBoxInput, NextLink } from '@/elements';
import { ROUTES } from '@/lib';

const TermsAndConditions = () => {
  const { setValue } = useFormContext();
  const [agreedRules, setAgreedRules] = useState(false);
  const handleChange = (event) => {
    const { checked } = event.target;
    setValue('agreedRules', checked);
    setAgreedRules(checked);
  };

  return (
    <div className="col-span-2 row-auto">
      <CheckBoxInput
        name="agreedRules"
        checked={agreedRules}
        onChange={handleChange}
        labelStyles="text-black inline-flex gap-1 text-xsm"
      >
        <p>
          I agree with all
          <NextLink href={ROUTES.PRIVACY_POLICY} className="text-blue underline">
            Privacy Policy
          </NextLink>
          <span className="px-1.5">and</span>
          <NextLink href={ROUTES.TERMS_AND_CONDITIONS} className="text-blue underline">
            Terms of Use
          </NextLink>
        </p>
      </CheckBoxInput>
    </div>
  );
};

export default TermsAndConditions;
