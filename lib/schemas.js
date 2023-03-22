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
  secondaryPhoneNumber: yup.string().notRequired(),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredAlert),
  companyNumberOfOperation: yup.number().required(requiredAlert),
});

export const addressDetailsSchema = (type, condition = false) => {
  const object = {};

  const selectOptions = {
    value: condition
      ? yup.string().when('sameAddresses', {
          is: false,
          then: (schema) => schema.required(requiredAlert),
        })
      : yup.string().required(requiredAlert),
  };

  console.log({ type });

  object[`${type}CountryId`] = yup.object().shape(selectOptions).required();

  object[`${type}CityId`] = yup.object().shape(selectOptions).required();

  object[`${type}State`] = condition
    ? yup.string().when('sameAddresses', {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(requiredAlert),
      })
    : yup.string().required(requiredAlert);

  object[`${type}PostalCode`] = condition
    ? yup.string().when('sameAddresses', {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(requiredAlert),
      })
    : yup.string().required(requiredAlert);

  object[`${type}Address`] = condition
    ? yup.string().when('sameAddresses', {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(requiredAlert),
      })
    : yup.string().required(requiredAlert);

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

// export const cargoesListSchema = () => {
//   const maxTanker = SETTINGS.MAX_NUMBER_OF_TANKERS;
//   const regex = new RegExp(`\\d{${maxTanker}}`);

//   return {
//     numberOfTankers: yup
//       .number()
//       .min(1)
//       .max(SETTINGS.MAX_NUMBER_OF_TANKERS, 'Too much tankers')
//       .required(requiredAlert),
//     applySlots: yup.bool().required(requiredAlert),
//     expiriences: yup.array().of(
//       yup
//         .object()
//         .shape({
//           vesselIMO: yup.number().positive().typeError('Digits only').required(requiredAlert),
//           loadPortId: yup.object().shape({}).required(requiredAlert),
//           billOfLadingDate: yup.string().required(requiredAlert),
//         })
//         .required(requiredAlert)
//     ),
//   };
// };

export const companyAddressesSchema = () => {
  return {
    sameAddresses: yup.bool(),
    ...addressDetailsSchema('registration'),
    ...addressDetailsSchema('correspondence', true),
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

export const searchForTankerSchema = () => ({
  // laycanStart: yup.string().required(requiredAlert),
  // laycanEnd: yup.string().required(requiredAlert),
  // loadPort: yup.string().required(requiredAlert),
  // loadTerminal: yup.string().required(requiredAlert),
  // dischargePort: yup.string().required(requiredAlert),
  // dischargeTerminal: yup.string().required(requiredAlert),
  // cargoType: yup.string().required(requiredAlert),
  // products: yup.array().of(
  //         yup
  //           .object()
  //           .shape({
  //             product: yup.string().required(requiredAlert),
  //             density: yup.string().required(requiredAlert),
  //             quantity: yup.string().required(requiredAlert),
  //             tolerance: yup.string().required(requiredAlert),
  //           })
  //           .required(requiredAlert)
  //       ),
  // product: yup.string().required(requiredAlert),
  // density: yup.string().required(requiredAlert),
  // quantity: yup.string().required(requiredAlert),
  // tolerance: yup.string().required(requiredAlert),
});

export const offerSchema = () => ({
  freight: yup.string().required(requiredAlert),
  value: yup.string().required(requiredAlert),
  demurrageRate: yup.string().required(requiredAlert),
  layTime: yup.string().required(requiredAlert),
  undisputedDemurrage: yup.string().required(requiredAlert),
  paymentTerms: yup.string().required(requiredAlert),
});
