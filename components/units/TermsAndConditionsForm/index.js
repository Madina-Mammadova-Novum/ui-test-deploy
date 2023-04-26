'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckBoxInput, NextLink } from '@/elements';
import { getNavigation } from '@/services/navigation';

const TermsAndConditions = () => {
  const [legalLinks, setLegalLinks] = useState([]);
  const fetchData = async () => {
    const legalNavigation = await getNavigation('legal-navigation', 'en');
    const legalLinksArray = legalNavigation ? legalNavigation.map((legalLink) => legalLink) : [];
    setLegalLinks(legalLinksArray);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const policyLink = legalLinks[0];
  const termsLink = legalLinks[1];

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
          {legalLinks.length > 1 ? (
            <>
              <NextLink href={policyLink.path} className="text-blue underline px-1.5">
                {policyLink.title}
              </NextLink>
              <span>and</span>
              <NextLink href={termsLink.path} className="text-blue underline px-1.5">
                {termsLink.title}
              </NextLink>
            </>
          ) : (
            ' Privacy Policy and Terms of Use'
          )}
        </p>
      </CheckBoxInput>
    </div>
  );
};

export default TermsAndConditions;
