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
import { getBrowser, getFieldFromKey, resetForm, setCookie, shouldShowCaptcha } from '@/utils/helpers';
import { errorToast, redirectAfterToast, useHookFormParams } from '@/utils/hooks';

const OwnerRegistrationForm = ({ countries }) => {
  const [captcha, setCaptcha] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const [samePhone, setSamePhone] = useState(false);

  const schema = yup.object().shape({
    ...companyDetailsSchema(samePhone),
    ...personalDetailsSchema({ isRegister: true }),
    ...passwordValidationSchema(),
    ...tankerSlotsDetailsSchema(),
    ...termsAndConditionsSchema(),
    ...companyAddressesSchema(sameAddress),
    ...(shouldShowCaptcha() ? captchaSchema() : {}),
  });

  const methods = useHookFormParams({ schema });
  const addressValue = methods.watch('sameAddresses', sameAddress);
  const phoneValue = methods.watch('samePhone', samePhone);

  useEffect(() => {
    if (shouldShowCaptcha()) {
      methods.setValue('captcha', captcha);
    }
    methods.setValue('sameAddresses', addressValue);
    methods.setValue('samePhone', phoneValue);

    setSameAddress(addressValue);
    setSamePhone(phoneValue);
  }, [addressValue, phoneValue, methods, captcha]);

  const onSubmit = async (formData) => {
    const { error, data } = await ownerSignUp({ data: formData });

    if (!error) {
      setCookie('session-user-email', formData.email);
      resetForm(methods, '');

      Promise.resolve(redirectAfterToast(data.message, ROUTES.GETTING_STARTED));
    } else {
      const errorKeys = Object.keys(error?.errors || {});
      const browser = getBrowser(window.navigator.userAgent);

      if (browser !== 'chrome') {
        window.scroll({
          behavior: 'instant',
          top: 0,
          left: 0,
        });
      }

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

          <div className="flex flex-col gap-6">
            <p className="pt-5 text-sm font-semibold text-black">
              Enter a strong password according to our requirements
            </p>
            <PasswordValidation
              helperData={{
                password: { label: 'chose password', placeholder: 'Enter your password' },
                confirm: { label: 'confirm password', placeholder: 'Enter your password' },
              }}
              inputGroupClassName="md:flex-row md:justify-normal gap-x-4"
            />
          </div>
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #3: Company Details" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyDetails />
        </Step>
        <Divider className="mt-5" />
        <Step title="Step #4: How many tankers do you operate" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <TankerSlotsDetails applyHelper />
        </Step>
        <Divider />
        <Step title="Step #5: Company Address" titleClass="pt-5" containerClass="flex flex-col gap-5">
          <CompanyAddresses countries={countries} />
        </Step>
        <TermsAndConditions />
        {shouldShowCaptcha() && <Captcha onChange={setCaptcha} />}
      </FormManager>
    </FormProvider>
  );
};

OwnerRegistrationForm.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})),
};

export default OwnerRegistrationForm;
