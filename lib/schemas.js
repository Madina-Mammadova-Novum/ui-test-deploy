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

export const addressSchema = (isSameAddress) => {
  return {
    line: yup.object({
      one: !isSameAddress ? yup.string().required(requiredAlert) : yup.string().notRequired(),
      two: yup.string(),
    }),
    city: !isSameAddress ? yup.string().required(requiredAlert) : yup.string().notRequired(),
    state: yup.string(),
    zip: yup.string(),
    country: !isSameAddress ? yup.object({}).required(requiredAlert) : yup.object({}).notRequired(),
  };
};

export const searchForTankerSchema = () => ({
  laycanStart: yup.string().required(requiredAlert),
  laycanEnd: yup.string().required(requiredAlert),
  loadPort: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  loadTerminal: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  dischargePort: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  dischargeTerminal: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  cargoType: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  products: yup.array().of(
    yup.object().shape({
      product: yup.object().shape({ value: yup.string().required(requiredAlert) }),
      density: yup.string().required(requiredAlert),
      quantity: yup.string().required(requiredAlert),
      tolerance: yup.string().required(requiredAlert),
    })
  ),
});

export const offerSchema = () => ({
  freight: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  value: yup.string().required(requiredAlert),
  demurrageRate: yup.string().required(requiredAlert),
  layTime: yup.string().required(requiredAlert),
  undisputedDemurrage: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  paymentTerms: yup.object().shape({ value: yup.string().required(requiredAlert) }),
  products: yup.array().of(
    yup.object().shape({
      product: yup.string(),
      density: yup.string().required(requiredAlert),
      quantity: yup.string().required(requiredAlert),
    })
  ),
});
