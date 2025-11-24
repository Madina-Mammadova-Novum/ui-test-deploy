/* eslint-disable func-names */
import * as yup from 'yup';

import { ADDRESS, REGEX, SETTINGS } from '@/lib/constants';
import { formatCurrency } from '@/utils/helpers';

/* Base values */
const maxImo = SETTINGS.MAX_NUMBER_OF_IMO_VALUE;

/* Regular expressions */
const imoRegEx = REGEX.IMO;
const passwordRegEx = REGEX.PASSWORD;
const phoneRegEx = REGEX.PHONE;

/* Default message */
const requiredMessage = 'This field is mandatory';
const yearError = 'Invalid year format. Please enter a valid four-digit year (YYYY)';

yup.addMethod(yup.string, 'validateLatinCharacters', function (settings) {
  return this.test('check-for-latin-characters', 'Please, use latin characters only', function (value) {
    if (!value && settings?.optional) return true;
    const isLatin = value.match(
      settings?.includeNumbers ? REGEX.LATIN_CHARACTERS_WITH_NUMBERS : REGEX.LATIN_CHARACTERS
    );
    return isLatin;
  });
});

const emailSchema = () => yup.string().email('Please enter a valid email.');
const phoneSchema = () => yup.string().required(requiredMessage).matches(phoneRegEx, 'Phone number is not valid');

const passwordSchema = () => {
  return yup
    .string()
    .required(requiredMessage)
    .matches(
      passwordRegEx,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    );
};

const selectOptionsValidation = () => ({
  value: yup.string().required(requiredMessage),
  label: yup.string(),
  countryFlag: yup.string(),
});

const tankersSchema = () => ({
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
  q88FileUrl: yup.string().required('Q88 file is required'),
});

const cargoesSchema = () => ({
  imo: yup.string().matches(imoRegEx, `Must be exactly ${maxImo} digits`).required(requiredMessage),
  port: yup.object().shape(selectOptionsValidation).required(requiredMessage),
  date: yup.string().required(requiredMessage),
});

const addressDetailsSchema = (type) => {
  const object = {};

  object[`${type}Country`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}City`] = yup.object().shape(selectOptionsValidation).required(requiredMessage);
  object[`${type}Address`] = yup.string().required(requiredMessage);
  object[`${type}PostalCode`] = yup.string().nullable();
  object[`${type}Address2`] = yup.string().nullable();

  return object;
};

export const passwordValidationSchema = () => ({
  password: passwordSchema().required(requiredMessage),
  confirmPassword: passwordSchema()
    .required(requiredMessage)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const personalDetailsSchema = ({ isRegister = true, hasPhoneChanged = false } = {}) => ({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: emailSchema().required(requiredMessage),
  confirmEmail: emailSchema()
    .required(requiredMessage)
    .oneOf([yup.ref('email'), null], 'Emails must match'),
  ...(isRegister
    ? {
        userPhone: phoneSchema().required(requiredMessage),
        phoneVerified: yup.boolean().oneOf([true], 'Phone verification is required'),
        otpId: yup.string().nullable(),
      }
    : {
        phone: phoneSchema().required(requiredMessage),
        ...(hasPhoneChanged
          ? {
              phoneVerified: yup.boolean().oneOf([true], 'Phone verification is required'),
              otpId: yup.string().nullable(),
            }
          : {}),
      }),
});

export const companyDetailsSchema = (samePhone = false) => ({
  companyName: yup.string().required(requiredMessage),
  ...(!samePhone ? { phone: phoneSchema().required(requiredMessage) } : {}),
});

export const tankerSlotsDetailsSchema = () => {
  return {
    numberOfTankers: yup.number().typeError('Digits only').min(1).required(requiredMessage),
    applySlots: yup.bool().oneOf([true], 'You need to apply your count of tankers'),
    vessels: yup.array().of(
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
    companyYearsOfOperation: yup.number().typeError('Digits only').required(requiredMessage),
    numberOfCargoes: yup.number().typeError('Digits only').min(1).required(requiredMessage),
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
    captcha: yup.string().required(requiredMessage),
  };
};

export const termsAndConditionsSchema = () => {
  return {
    agreedRules: yup.bool().oneOf([true], 'The terms and conditions is mandatory'),
  };
};

export const forgotPasswordSchema = () => ({
  email: emailSchema().required(requiredMessage),
});

export const loginSchema = () => ({
  email: emailSchema().required(requiredMessage),
  password: passwordSchema().required(requiredMessage),
  rememberMe: yup.boolean().nullable(),
});

export const updatePasswordSchema = () => ({
  currentPassword: passwordSchema().required(requiredMessage),
  ...passwordValidationSchema(),
});

export const currentPasswordSchema = () => ({
  password: yup.string().required(requiredMessage),
});

export const searchForTankerSchema = ({ maxQuantity = null } = {}) => ({
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
      density: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .typeError('Please enter a valid number')
        .positive('Density must be greater than 0')
        .test('density-range', 'Out of range', function (value) {
          const product = this.parent?.product;
          if (!product?.density?.min || !product?.density?.max) {
            return true; // Skip validation if no range defined
          }
          if (!value) return true; // Required validation handles empty value

          const min = product.density.min;
          const max = product.density.max;

          if (value < min || value > max) {
            return this.createError({
              message: 'Out of range',
            });
          }
          return true;
        })
        .required(requiredMessage),
      quantity: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .typeError('Please enter a valid number')
        .min(1, 'Out of range')
        .max(maxQuantity || Number.MAX_SAFE_INTEGER, 'Out of range')
        .required(requiredMessage),
      tolerance: yup
        .number()
        .transform((value, originalValue) => (originalValue === '' ? undefined : value))
        .typeError('Please enter a valid number')
        .min(1, 'Out of range')
        .max(20, 'Out of range')
        .required(requiredMessage),
    })
  ),
  additionalDischargeOptions: yup
    .object()
    .shape({
      isAllSelected: yup.boolean().nullable(),
      selected: yup.array().nullable(),
    })
    .nullable()
    .when('showAdditionalDischarge', {
      is: true,
      then: (schema) =>
        schema.test('valid-discharge-options', 'Please select at least one discharge option or select all', (value) => {
          if (!value) return false;
          return value.isAllSelected || (Array.isArray(value.selected) && value.selected.length > 0);
        }),
    }),
  sanctionedCountries: yup.array().nullable(),
  excludedInternationallySanctioned: yup.boolean().nullable(),
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
      .transform((value, originalValue) => {
        // Remove commas from the string before conversion
        if (typeof originalValue === 'string') {
          return parseFloat(originalValue.replace(/,/g, ''));
        }
        return value;
      })
      .typeError('Digits only')
      .min(
        currentFreight?.ranges?.min?.start || 2,
        `Must be greater than ${
          currentFreight?.value === '$/mt'
            ? `$${formatCurrency(currentFreight?.ranges?.min?.start - 0.01 || 1.999, true)}`
            : formatCurrency(currentFreight?.ranges?.min?.start - 1 || 1.999)
        }`
      )
      .max(currentFreight?.ranges?.max?.end || 5, 'Value exceeds maximum limit. Please enter a lower value')
      .required(requiredMessage),
    demurrageRate: yup
      .number()
      .transform((value, originalValue) => {
        // Remove commas from the string before conversion
        if (typeof originalValue === 'string') {
          return parseFloat(originalValue.replace(/,/g, ''));
        }
        return value;
      })
      .typeError('Digits only')
      .min(
        props?.demurrageRate?.min?.start || 1000,
        `Must be greater than $${formatCurrency(props?.demurrageRate?.min?.start - 1 || 999)}`
      )
      .max(
        props?.demurrageRate?.max?.end || 50000,
        `Must be no more than $${formatCurrency(props?.demurrageRate?.max?.end || 50000)}`
      )
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
        minQuantity: yup.string().required(requiredMessage),
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
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
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
        speed: yup.number().typeError('Speed must be a number').default(11).nullable(),
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
  fleetName: yup.string().required(requiredMessage),
});

export const editFleetSchema = () => ({
  fleetName: yup.string().required(requiredMessage),
});

export const assignToFleetSchema = () => ({
  fleet: yup.object().shape({ value: yup.string().required(requiredMessage) }),
});

export const tankerDataSchema = (tankerCategoryTwoRequired = false) => ({
  tankerName: yup.string().required(requiredMessage),
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
  tankerCategoryTwo: yup
    .object()
    .shape({
      value: tankerCategoryTwoRequired ? yup.string().required(requiredMessage) : yup.string().nullable(true),
    })
    .nullable(!tankerCategoryTwoRequired),
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
  imoClass: yup
    .object()
    .typeError('This field is mandatory')
    .shape({ value: yup.string().required(requiredMessage) })
    .required(requiredMessage),
  grades: yup
    .number()
    .typeError(requiredMessage)
    .min(1, 'Please enter a number between 1 and 60')
    .max(60, 'Please enter a number between 1 and 60')
    .required(requiredMessage),
  registeredOwner: yup.string().required(requiredMessage),
  registeredOwnerCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  technicalOperator: yup.string().required(requiredMessage),
  technicalOperatorCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  commercialOperator: yup.string().required(requiredMessage),
  commercialOperatorCountry: yup.object().shape({ value: yup.string().required(requiredMessage) }),
  disponentOwner: yup.string().nullable(),
  disponentOwnerCountry: yup.object().shape({ value: yup.string() }),
});

export const uploadFileSchema = ({ isMultiple = false } = {}) => {
  const baseSchema = {
    title: yup.string().required(requiredMessage),
    comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
  };

  if (isMultiple) {
    return {
      ...baseSchema,
      files: yup.array().min(1, 'At least one file is required').required(requiredMessage),
    };
  }

  return {
    ...baseSchema,
    file: yup.string().required(requiredMessage),
  };
};

export const fileSchema = () => ({
  file: yup.string().required(requiredMessage),
});

export const declineOfferSchema = () => ({
  reason: yup.string().required(requiredMessage).validateLatinCharacters(),
});

export const acceptOfferSchema = () => ({
  comment: yup.string().validateLatinCharacters({ optional: true, includeNumbers: true }),
});

export const addToSavedSearchSchema = () => ({
  searchName: yup.string().required(requiredMessage),
  isNotification: yup.boolean().default(true),
});

export const addTankerSchema = () => ({
  imo: yup
    .string()
    .matches(imoRegEx, { message: `Must be exactly ${maxImo} digits`, excludeEmptyString: true })
    .required(requiredMessage),
  fleet: yup
    .object()
    .shape({
      value: yup.string().nullable(),
      label: yup.string().nullable(),
    })
    .nullable(),
  file: yup.string().required('Q88 file is required'),
});
