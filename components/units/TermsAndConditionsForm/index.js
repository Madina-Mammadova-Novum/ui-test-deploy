'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CheckBoxInput, NextLink } from '@/elements';
import { ROUTES } from '@/lib';
import { getNavigation } from '@/services/navigation';

const TermsAndConditions = () => {
  const [legalLinks, setLegalLinks] = useState([]);
  const fetchData = async () => {
    const legalNavigation = await getNavigation('legal-navigation', 'en');
    const { data } = legalNavigation;
    const legalIncluded = data.filter((link) => {
      return link.path !== ROUTES.LEGAL_EXCLUDED;
    });
    setLegalLinks(legalIncluded);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const printLinks = legalLinks.map(({ path, title }) => (
    <NextLink key={path} href={path} target="_blank" className="text-blue underline px-1.5">
      {title}
    </NextLink>
  ));

  const printLinksCombined = printLinks.reduceRight((acc, link, index) => {
    if (index === printLinks.length - 1) {
      return link;
    }
    if (index === printLinks.length - 2) {
      return (
        <>
          {link}
          <span> and </span>
          {acc}
        </>
      );
    }
    return (
      <>
        {link}
        <span>, </span>
        {acc}
      </>
    );
  }, null);

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
          {printLinksCombined}
        </p>
      </CheckBoxInput>
    </div>
  );
};

export default TermsAndConditions;
