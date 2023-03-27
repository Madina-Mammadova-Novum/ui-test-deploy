import * as yup from 'yup';

import { ADDRESS, SETTINGS } from '@/lib/constants';

/* base values */
const maxTanker = SETTINGS.MAX_NUMBER_OF_TANKERS;
const maxCargoes = SETTINGS.MAX_NUMBER_OF_CARGOES;
const maxImo = SETTINGS.MAX_NUMBER_OF_IMO_VALUE;
const regex = new RegExp(`\\d{${maxImo}}`);

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

export const addressDetailsSchema = (type) => {
  const object = {};

  object[`${type}CountryId`] = yup.object().shape(selectOptionsValidation).required(requiredAlert);
  object[`${type}CityId`] = yup.object().shape(selectOptionsValidation).required(requiredAlert);
  object[`${type}Address`] = yup.string().required(requiredAlert);
  object[`${type}State`] = yup.string();
  object[`${type}PostalCode`] = yup.string();
  object[`${type}AddressOptional`] = yup.string();

  return object;
};

export const passwordValidationSchema = () => ({
  password: passwordSchema().required('Please enter a password'),
  confirmPassword: passwordSchema()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const personalDetailsSchema = () => ({
  firstName: yup.string().required(requiredAlert),
  lastName: yup.string().required(requiredAlert),
  email: emailSchema().required(requiredAlert),
  primaryPhoneNumber: yup.string().required(requiredAlert),
  secondaryPhoneNumber: yup.string(),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredAlert),
  companyNumberOfOperation: yup.number().typeError('Digits only').required(requiredAlert),
});

export const tankerSlotsDetailsSchema = () => {
  return {
    numberOfTankers: yup
      .number()
      .typeError('Digits only')
      .min(1)
      .max(maxTanker, 'Limit is exeeded')
      .required(requiredAlert),
    applySlots: yup.bool().required(requiredAlert),
    imo: yup.array().of(yup.string().matches(regex, `Must be exactly ${maxImo} digits`).required(requiredAlert)),
  };
};

export const cargoesSlotsDetailsSchema = () => {
  return {
    numberOfCargoes: yup.number().min(1).max(maxCargoes, 'Limit is exeeded').required(requiredAlert),
    applySlots: yup.bool().required(requiredAlert),
    cargoes: yup.array().of(
      yup.object().shape({
        imo: yup.string().matches(regex, `Must be exactly ${maxImo} digits`).required(requiredAlert),
        port: yup.object().shape(selectOptionsValidation).required(requiredAlert),
        date: yup.string().required('Lading date is required'),
      })
    ),
  };
};

export const companyAddressesSchema = (sameAddresses) => {
  return !sameAddresses
    ? { ...addressDetailsSchema(ADDRESS.REGISTRATION), ...addressDetailsSchema(ADDRESS.CORRESPONDENCE) }
    : { ...addressDetailsSchema(ADDRESS.REGISTRATION) };
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
