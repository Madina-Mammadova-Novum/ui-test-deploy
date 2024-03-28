/* eslint-disable func-names */
import * as yup from 'yup';

import { ADDRESS, REGEX, SETTINGS } from '@/lib/constants';
import { checkPhoneValue } from '@/utils/helpers';

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
export const yearError = 'Invalid year format. Please enter a valid four-digit year (YYYY)';

yup.addMethod(yup.string, 'validateLatinCharacters', function (settings) {
  return this.test('check-for-latin-characters', 'Please, use latin characters only', function (value) {
    if (!value && settings?.optional) return true;
    const isLatin = value.match(
      settings?.includeNumbers ? REGEX.LATIN_CHARACTERS_WITH_NUMBERS : REGEX.LATIN_CHARACTERS
    );
    return isLatin;
  });
});

export const emailSchema = () => yup.string().email('Please enter a valid email.');
export const phoneSchema = () =>
  yup.string().required(requiredMessage).matches(phoneRegEx, 'Phone number is not valid');

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
  countryFlag: yup.string(),
});

export const tankersSchema = () => ({
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
});

export const cargoesSchema = () => ({
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
  date: yup.string().required(requiredMessage),
});

export const addressDetailsSchema = (type) => {
  const object = {};

  object[`${type}Country`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}City`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}Address`] = yup.string().required(requiredMessage).validateLatinCharacters({ includeNumbers: true });
  object[`${type}Province`] = yup.string().validateLatinCharacters({ optional: true });
  object[`${type}PostalCode`] = yup.string();
  object[`${type}Address2`] = yup.string().validateLatinCharacters({ optional: true, includeNumbers: true });

  return object;
};

export const passwordValidationSchema = () => ({
  password: passwordSchema().required(requiredMessage),
  confirmPassword: passwordSchema()
    .required(requiredMessage)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const personalDetailsSchema = () => ({
  firstName: yup.string().required(requiredMessage).validateLatinCharacters(),
  lastName: yup.string().required(requiredMessage).validateLatinCharacters(),
  email: emailSchema().required(requiredMessage),
  primaryPhone: phoneSchema().required(requiredMessage),
  secondaryPhone: yup.string().test('secondary-phone-validation', 'Phone number is not valid', checkPhoneValue),
});

export const companyDetailsSchema = () => ({
  companyName: yup.string().required(requiredMessage).validateLatinCharacters({ includeNumbers: true }),
  companyYearsOfOperation: yup.number().typeError('Digits only').required(requiredMessage),
});

export const tankerSlotsDetailsSchema = () => {
  return {
    numberOfTankers: numberOfUnitsSchema(maxTanker).required(requiredMessage),
    applySlots: yup.bool().oneOf([true], 'You need to apply your count of tankers'),
    imos: yup.array().of(
      yup
        .object()
        .shape({ ...tankersSchema() })
        .test('isUnique', 'threshold invalid', function (item) {
          const array = this.parent.map(({ imo }) => imo);
          const entryCount = array.filter((imo) => imo === item?.imo).length;
          return entryCount > 1
            ? this.createError({ path: `${this.path}.imo`, message: 'IMO numbers must not be repeated' })
            : true;
        })
    ),
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

export const captchaSchema = () => {
  return {
    captcha: yup.string(),
  };
};

export const termsAndConditionsSchema = () => {
  return {
    agreedRules: yup.bool().oneOf([true], 'The terms and conditions is mandatory'),
  };
};

export const uploadSchema = () => ({
  title: yup.string().required(requiredMessage).validateLatinCharacters(),
  comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
  file: yup.mixed().required(requiredMessage),
});

export const forgotPasswordSchema = () => ({
  email: emailSchema().required(requiredMessage),
});

export const loginSchema = () => ({
  email: emailSchema().required(requiredMessage),
  password: passwordSchema().required(requiredMessage),
});

export const updatePasswordSchema = () => ({
  currentPassword: passwordSchema().required(requiredMessage),
  ...passwordValidationSchema(),
});

export const currentPasswordSchema = () => ({
  password: yup.string().required(requiredMessage),
});

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
      density: yup.number().typeError('Digits only').required(requiredMessage),
      quantity: yup.number().typeError('Digits only').min(1, 'Invalid value').required(requiredMessage),
      tolerance: yup
        .number()
        .typeError('Digits only')
        .min(1, '1%-20% range')
        .max(20, '1%-20% range')
        .required(requiredMessage),
    })
  ),
});

export const offerSchema = (props = {}) => {
  const getFreightValueValidation = () => {
    const currentFreightType = parseFloat(props?.currentFreight?.type);
    return props?.freightFormats?.find((format) => parseFloat(format?.id) === currentFreightType);
  };

  const currentFreight = getFreightValueValidation();

  return {
    freight: yup.object().shape({ value: yup.string().required(requiredMessage) }),
    comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
    value: yup
      .number()
      .typeError('Digits only')
      .min(
        currentFreight?.ranges?.min?.start || 2,
        `Must be greater than ${currentFreight?.ranges?.min?.start - 1 || 2}`
      )
      .max(currentFreight?.ranges?.max?.end || 5, `Must be no more than ${currentFreight?.ranges?.max?.end || 2}`)
      .required(requiredMessage),
    demurrageRate: yup
      .number()
      .typeError('Digits only')
      .min(
        props?.demurrageRate?.min?.start || 1000,
        `Must be greater than ${props?.demurrageRate?.min?.start - 1 || 999}`
      )
      .max(props?.demurrageRate?.max?.end || 50000, `Must be no more than ${props?.demurrageRate?.max?.end || 50000}`)
      .required(requiredMessage),
    layTime: yup
      .number()
      .typeError('Digits only')
      .min(props?.layTime?.min?.start || 12, `Must be greater than ${props?.layTime?.min?.start - 1 || 11}`)
      .max(props?.layTime?.max?.end || 120, `Must be no more than ${props?.layTime?.max?.end || 120} hours`)
      .required(requiredMessage),
    undisputedDemurrage: yup.object().shape({ value: yup.string().required(requiredMessage) }),
    paymentTerms: yup.object().shape({ value: yup.string().required(requiredMessage) }),
    products: yup.array().of(
      yup.object().shape({
        product: yup.object().shape({ value: yup.string().required(requiredMessage) }),
        density: yup.string().required(requiredMessage),
        quantity: yup.string().required(requiredMessage),
        tolerance: yup.number(),
      })
    ),
  };
};

export const portsSchema = () => ({
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
});

export const reactivateTankerSchema = () => ({
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
  date: yup.string().required(requiredMessage),
});

export const dateSchema = () => ({
  date: yup.string().required(requiredMessage),
});

export const contactInfoSchema = () => ({
  firstName: yup.string().required(requiredMessage).validateLatinCharacters(),
  lastName: yup.string().required(requiredMessage).validateLatinCharacters(),
  email: yup.string().required(requiredMessage),
  phoneNumber: phoneSchema().required(requiredMessage),
  subject: yup.object().required(requiredMessage),
  message: yup.string().required(requiredMessage).validateLatinCharacters(),
});

export const toolsSchema = ({ isFreight }) => {
  const conditionalField = isFreight
    ? {
        cargoQuantity: yup
          .number()
          .typeError(requiredMessage)
          .min(1, 'Value must be greater than 0')
          .required(requiredMessage),
      }
    : {
        speed: yup.string().nullable(),
      };
  return {
    calculator: yup
      .object()
      .nullable()
      .shape({ value: yup.string().required(requiredMessage) })
      .required(requiredMessage),
    fromPort: yup
      .object()
      .nullable()
      .shape({ value: yup.string().required(requiredMessage) })
      .required(requiredMessage),
    toPort: yup
      .object()
      .nullable()
      .shape({ value: yup.string().required(requiredMessage) })
      .required(requiredMessage),
    additionalPorts: yup.array().of(
      yup.object().shape({
        port: yup
          .object()
          .nullable()
          .shape({ value: yup.string().required(requiredMessage) })
          .required(requiredMessage),
      })
    ),
    ...conditionalField,
  };
};

export const createFleetSchema = () => ({
  fleetName: yup.string().required(requiredMessage).validateLatinCharacters(),
});

export const editFleetSchema = () => ({
  fleetName: yup.string().required(requiredMessage).validateLatinCharacters(),
});

export const assignToFleetSchema = () => ({
  fleet: yup.object().shape({ value: yup.string().required(requiredMessage) }),
});

export const q88ImoCheckSchema = () => ({
  imo: yup
    .string()
    .matches(imoRegEx, { message: `Must be exactly ${maxImo} digits`, excludeEmptyString: true })
    .required(requiredMessage),
  fleet: yup.object().shape({}),
});

export const tankerDataSchema = () => ({
  tankerName: yup.string().required(requiredMessage).validateLatinCharacters(),
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
  updateDate: yup.string().required(requiredMessage),
  built: yup
    .number()
    .typeError(yearError)
    .test('len', yearError, (val) => val && val.toString().length === 4)
    .max(
      new Date().getFullYear(),
      'Please enter a valid four-digit year (YYYY) representing a specific calendar year up to the current year.'
    )
    .required(requiredMessage),
  portOfRegistry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  // country: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  tankerType: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  tankerCategoryOne: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  hullType: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  loa: yup.number().typeError('This field is mandatory').required(requiredMessage),
  beam: yup.number().typeError('This field is mandatory').required(requiredMessage),
  summerDWT: yup
    .number()
    .typeError('This field is mandatory')
    .min(1000, 'Please enter a number between 1000 and 320000')
    .max(320000, 'Please enter a number between 1000 and 320000')
    .required(requiredMessage),
  summerDraft: yup.number().typeError('This field is mandatory').required(requiredMessage),
  normalBallastDWT: yup.number().typeError('This field is mandatory').required(requiredMessage),
  normalBallastDraft: yup.number().typeError('This field is mandatory').required(requiredMessage),
  cubicCapacity: yup.number().positive(requiredMessage).typeError('This field is mandatory').required(requiredMessage),
  imoClass: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  grades: yup
    .number()
    .typeError(requiredMessage)
    .min(1, 'Please enter a number between 1 and 60')
    .max(60, 'Please enter a number between 1 and 60')
    .required(requiredMessage),
  registeredOwner: yup.string().required(requiredMessage),
  registeredOwnerCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  technicalOperator: yup.string().required(requiredMessage).validateLatinCharacters(),
  technicalOperatorCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  commercialOperator: yup.string().required(requiredMessage).validateLatinCharacters(),
  commercialOperatorCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  disponentOwner: yup.string().nullable().validateLatinCharacters({ optional: true }),
  disponentOwnerCountry: yup.object().shape({ value: yup.string() }),
});

export const uploadFileSchema = () => ({
  title: yup.string().required(requiredMessage).validateLatinCharacters(),
  comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
  file: yup.string().required(requiredMessage),
});

export const fileSchema = (isRequired = true) =>
  isRequired
    ? {
        file: yup.string().required(requiredMessage),
      }
    : {
        file: yup.string(),
      };

export const declineOfferSchema = () => ({
  reason: yup.string().required(requiredMessage).validateLatinCharacters(),
});

export const acceptOfferSchema = () => ({
  comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
});
