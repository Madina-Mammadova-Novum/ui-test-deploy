import * as yup from 'yup';

import { SETTINGS } from '@/lib/constants';

export const requiredAlert = 'Required field';

export const emailSchema = () => yup.string().email('Must be a valid');

export const passwordSchema = () => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;
  return yup
    .string()
    .matches(
      passwordPattern,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    );
};

export const selectOptionsValidation = () => ({
  value: yup.string().required(requiredAlert),
  label: yup.string(),
});

export const passwordValidationSchema = () => ({
  password: passwordSchema().required(requiredAlert),
  confirmPassword: passwordSchema().required(requiredAlert),
});

export const personalDetailsSchema = () => ({
  firstName: yup.string().required(requiredAlert),
  lastName: yup.string().required(requiredAlert),
  email: emailSchema().required(requiredAlert),
  primaryPhoneNumber: yup.string().required(requiredAlert),
  secondaryPhoneNumber: yup.string().notRequired(),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredAlert),
  companyNumberOfOperation: yup.number().required(requiredAlert),
});

export const addressDetailsSchema = (type) => {
  const object = {};

  object[`${type}CountryId`] = yup.object().shape(selectOptionsValidation).required(requiredAlert);
  object[`${type}CityId`] = yup.object().shape(selectOptionsValidation).required(requiredAlert);
  object[`${type}State`] = yup.string().required(requiredAlert);
  object[`${type}PostalCode`] = yup.string().required(requiredAlert);
  object[`${type}Address`] = yup.string().required(requiredAlert);
  object[`${type}AddressOptional`] = yup.string();

  return object;
};

export const tankerSlotsDetailsSchema = () => {
  const maxTanker = SETTINGS.MAX_NUMBER_OF_TANKERS;
  const regex = new RegExp(`\\d{${maxTanker}}`);
  return {
    numberOfTankers: yup
      .number()
      .min(1)
      .max(SETTINGS.MAX_NUMBER_OF_TANKERS, 'Too much tankers')
      .required(requiredAlert),
    applySlots: yup.bool().required(requiredAlert),
    imo: yup.array().of(yup.string().matches(regex, `Must be exactly ${maxTanker} numbers`).required(requiredAlert)),
  };
};

export const companyAddressesSchema = (sameAddresses) => {
  return !sameAddresses
    ? { ...addressDetailsSchema('registration'), ...addressDetailsSchema('correspondence') }
    : { ...addressDetailsSchema('registration') };
};

export const termsAndConditionsSchema = () => {
  return {
    agreedRules: yup.bool().oneOf([true, requiredAlert]),
  };
};

export const uploadSchema = () => ({
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed().required(requiredAlert),
});

export const updatePasswordSchema = () => ({
  currentPassword: yup.string().required(),
});
