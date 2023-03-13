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

export const selectOptionsValidation = () => {
  return yup.object().shape({
    value: yup.string(),
    label: yup.string(),
  });
};

export const passwordValidationSchema = () => ({
  password: passwordSchema().required(requiredAlert),
  confirmPassword: passwordSchema().required(requiredAlert),
});

export const personalDetailsSchema = () => ({
  firstName: yup.string().required(requiredAlert),
  lastName: yup.string().required(requiredAlert),
  email: emailSchema().required(requiredAlert),
  primaryPhoneNumber: yup.string().required(requiredAlert),
  secondaryPhoneNumber: yup.string().required(requiredAlert),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredAlert),
  companyNumberOfOperation: yup.number().required(requiredAlert),
});

export const addressDetailsSchema = (type) => {
  const object = {};
  object[`${type}CountryId`] = selectOptionsValidation().required(requiredAlert);
  object[`${type}CityId`] = selectOptionsValidation().required(requiredAlert);
  object[`${type}State`] = yup.string();
  object[`${type}PostalCode`] = yup.string();
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

export const companyAddressesSchema = () => {
  return {
    sameAddresses: yup.bool(),
    ...addressDetailsSchema('registration'),
    ...addressDetailsSchema('correspondence'),
  };
};

export const termsAndConditionsSchema = () => {
  return {
    agreedRules: yup.bool().required(requiredAlert),
  };
};

export const uploadSchema = () => ({
  title: yup.string().required(requiredAlert),
  comment: yup.string(),
  file: yup.mixed().required(requiredAlert),
});

export const loginSchema = () =>
  yup.object().shape({
    email: yup.string().email('Must be a valid').required(requiredAlert),
    password: yup.string().required(requiredAlert),
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

const tankersListSchema = (isNested) => ({
  list: isNested
    ? yup
        .array()
        .of(yup.number().typeError('Digits only').positive('Must be a positive number').required(requiredAlert))
    : yup
        .array()
        .of(yup.number().typeError('Digits only').positive('Must be a positive number').notRequired())
        .notRequired(),
});

const cargoesListSchema = (isNested) => ({
  list: !isNested
    ? yup.array().of(
        yup.array().of(
          yup.object().shape({
            imo: yup.number().typeError('Digits only').positive().required(requiredAlert),
            country: yup.object().shape({}).required(requiredAlert),
            date: yup.string().required(requiredAlert),
          })
        )
      )
    : yup
        .array()
        .of(
          yup.array().of(
            yup.object().shape({
              imo: yup.number().typeError('Digits only').positive().notRequired(),
              country: yup.object().shape({}).notRequired(),
              date: yup.string().notRequired(),
            })
          )
        )
        .notRequired(),
});

export const dynamicListSchema = (isNested) => {
  return isNested ? cargoesListSchema(isNested) : tankersListSchema(isNested);
};
