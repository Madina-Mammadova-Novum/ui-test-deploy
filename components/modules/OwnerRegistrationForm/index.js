'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { FormManager } from '@/common';
import Divider from '@/elements/Divider';
import { ROUTES } from '@/lib';
import {
  captchaSchema,
  companyAddressesSchema,
  companyDetailsSchema,
  passwordValidationSchema,
  personalDetailsSchema,
  tankerSlotsDetailsSchema,
  termsAndConditionsSchema,
} from '@/lib/schemas';
import { ownerSignUp } from '@/services/user';
import {
  Captcha,
  CompanyAddresses,
  CompanyDetails,
  PasswordValidation,
  PersonalDetails,
  Step,
  TankerSlotsDetails,
  TermsAndConditions,
} from '@/units';
import { resetForm } from '@/utils/helpers';
import { errorToast, redirectAfterToast, useHookFormParams } from '@/utils/hooks';

const OwnerRegistrationForm = ({ countries }) => {
  const [sameAddress, setSameAddress] = useState(false);
  const [captcha, setCaptcha] = useState('');

  const schema = yup.object().shape({
    ...personalDetailsSchema(),
    ...passwordValidationSchema(),
    ...companyDetailsSchema(),
    ...tankerSlotsDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
    ...termsAndConditionsSchema(),
    ...captchaSchema(),
  });

  const getFieldFromKey = (key) => {
    switch (key) {
      case 'Email':
        return 'email';
      case 'Phone':
        return 'primaryPhone';
      case 'SecondaryPhone':
        return 'secondaryPhone';
      default:
        return key.toLowerCase();
    }
  };

  const methods = useHookFormParams({ schema });
  const addressValue = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    methods.setValue('captcha', captcha);
    methods.setValue('sameAddresses', addressValue);

    setSameAddress(addressValue);
  }, [addressValue, methods, captcha]);

  const onSubmit = async (formData) => {
    const { error, data } = await ownerSignUp({ data: formData });

    if (!error) {
      resetForm(methods, '');
      Promise.resolve(redirectAfterToast(data.message, ROUTES.ROOT));
    } else {
      const errorKeys = Object.keys(error?.errors || {});

      errorKeys?.forEach((key) => {
        if (error?.errors[key]?.length > 0) {
          methods.setError(getFieldFromKey(key), {
            message: error?.errors[key][0],
          });
        }
      });

      errorToast(error?.title, error?.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        className="pb-5"
        submitButton={{
          text: 'Create account',
          variant: 'primary',
          size: 'large',
        }}
        submitAction={onSubmit}
      >
        <Divider className="mt-5" />
        <Step title="Step #2: User Details" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <PersonalDetails />
          <p className="text-black font-semibold text-sm pt-5">Enter a password for account access</p>
          <PasswordValidation
            helperData={{
              password: { label: 'chose password', placeholder: 'Enter your password' },
              confirm: { label: 'confirm password', placeholder: 'Enter your password' },
            }}
          />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #3: Company Details" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyDetails />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #4: Number of tankers under operation" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <TankerSlotsDetails applyHelper />
        </Step>
        <Divider />
        <Step title="Step #5: Company Addresss" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyAddresses countries={countries} />
        </Step>
        <TermsAndConditions />
        <Captcha onChange={setCaptcha} />
      </FormManager>
    </FormProvider>
  );
};

OwnerRegistrationForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})),
};

export default OwnerRegistrationForm;
