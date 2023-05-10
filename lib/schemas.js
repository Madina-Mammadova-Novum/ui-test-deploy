import * as yup from 'yup';

import { ADDRESS, REGEX, SETTINGS } from '@/lib/constants';

/* Base values */
const maxTanker = SETTINGS.MAX_NUMBER_OF_TANKERS;
const maxCargoes = SETTINGS.MAX_NUMBER_OF_CARGOES;
const maxImo = SETTINGS.MAX_NUMBER_OF_IMO_VALUE;

/* Regular expressions */
const imoRegEx = REGEX.IMO;
const passwordRegEx = REGEX.PASSWORD;
const phoneRegEx = REGEX.PHONE;

/* Default message */
export const requiredMessage = 'This field is mandatory';

export const emailSchema = () => yup.string().email('Please enter a valid email.');
export const phoneSchema = () => yup.string().matches(phoneRegEx, 'Phone number is not valid');

export const passwordSchema = () => {
  return yup
    .string()
    .required(requiredMessage)
    .matches(
      passwordRegEx,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    );
};

export const numberOfUnitsSchema = (maxValue) => {
  return yup.number().typeError('Digits only').min(1).max(maxValue, 'Limit is exeeded');
};

export const selectOptionsValidation = () => ({
  value: yup.string().required(requiredMessage),
  label: yup.string(),
});

export const cargoesSchema = () => ({
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
  date: yup.string().required(requiredMessage),
});

export const addressDetailsSchema = (type) => {
  const object = {};

  object[`${type}CountryId`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}CityId`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}Address`] = yup.string().required(requiredMessage);
  object[`${type}State`] = yup.string();
  object[`${type}PostalCode`] = yup.string();
  object[`${type}AddressOptional`] = yup.string();

  return object;
};

export const passwordValidationSchema = () => ({
  password: passwordSchema().required(requiredMessage),
  confirmPassword: passwordSchema()
    .required(requiredMessage)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const personalDetailsSchema = () => ({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: emailSchema().required(requiredMessage),
  primaryPhoneNumber: phoneSchema().required(requiredMessage),
  secondaryPhoneNumber: phoneSchema().notRequired(),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredMessage),
  companyNumberOfOperation: yup.number().typeError('Digits only').required(requiredMessage),
});

export const tankerSlotsDetailsSchema = () => {
  return {
    numberOfTankers: numberOfUnitsSchema(maxTanker).required(requiredMessage),
    applySlots: yup.bool().oneOf([true], 'You need to apply your count of tankers'),
    imo: yup.array().of(yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage)),
  };
};

export const cargoesSlotsDetailsSchema = () => {
  return {
    numberOfCargoes: numberOfUnitsSchema(maxCargoes).required(requiredMessage),
    applySlots: yup.bool().oneOf([true], 'You need to apply your count of cargoes'),
    cargoes: yup.array().of(yup.object().shape({ ...cargoesSchema() })),
  };
};

export const companyAddressesSchema = (sameAddresses) => {
  return !sameAddresses
    ? { ...addressDetailsSchema(ADDRESS.REGISTRATION), ...addressDetailsSchema(ADDRESS.CORRESPONDENCE) }
    : { ...addressDetailsSchema(ADDRESS.REGISTRATION) };
};

export const termsAndConditionsSchema = () => {
  return {
    agreedRules: yup.bool().oneOf([true], 'The terms and conditions is mandatory'),
  };
};

export const uploadSchema = () => ({
  title: yup.string().required(requiredMessage),
  comment: yup.string(),
  file: yup.mixed().required(requiredMessage),
});

export const updatePasswordSchema = () => ({
  currentPassword: passwordSchema().required(requiredMessage),
  ...passwordValidationSchema(),
});

export const addressSchema = (isSameAddress) => {
  return {
    line: yup.object({
      one: !isSameAddress ? yup.string().required(requiredMessage) : yup.string().notRequired(),
      two: yup.string(),
    }),
    city: !isSameAddress ? yup.string().required(requiredMessage) : yup.string().notRequired(),
    state: yup.string(),
    zip: yup.string(),
    country: !isSameAddress ? yup.object({}).required(requiredMessage) : yup.object({}).notRequired(),
  };
};

export const searchForTankerSchema = () => ({
  laycanStart: yup.string().required(requiredMessage),
  laycanEnd: yup.string().required(requiredMessage),
  loadPort: yup
    .object()
    .nullable()
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  loadTerminal: yup
    .object()
    .nullable()
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  dischargePort: yup
    .object()
    .nullable()
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  dischargeTerminal: yup
    .object()
    .nullable()
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  cargoType: yup
    .object()
    .nullable()
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  products: yup.array().of(
    yup.object().shape({
      product: yup
        .object()
        .nullable()
        .shape({ value: yup.string().required(requiredMessage) })
        .required(requiredMessage),
      density: yup.string().required(requiredMessage),
      quantity: yup.string().required(requiredMessage),
      tolerance: yup.number().typeError('Digits only').min(1, '1%-20% range').max(20, '1%-20% range').required(),
    })
  ),
});

export const offerSchema = () => ({
  freight: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  value: yup.number().typeError('Digits only').min(0).max(150000, 'Max range $150 000').required(),
  demurrageRate: yup.string().required(requiredMessage),
  layTime: yup.string().required(requiredMessage),
  undisputedDemurrage: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  paymentTerms: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  products: yup.array().of(
    yup.object().shape({
      product: yup.string(),
      density: yup.string().required(requiredMessage),
      quantity: yup.string().required(requiredMessage),
    })
  ),
});

export const portsSchema = () => ({
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
});

export const dateSchema = () => ({
  date: yup.string().required(requiredMessage),
});

export const contactInfoSchema = () => ({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: yup.string().required(requiredMessage),
  phoneNumber: phoneSchema().required(requiredMessage),
  subject: yup.object().required(requiredMessage),
});
