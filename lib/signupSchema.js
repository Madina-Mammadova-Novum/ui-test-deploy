import * as yup from 'yup';

import { addressSchema, dynamicListSchema, passwordSchema, personalDetailsSchema, requiredAlert } from '@/lib/schemas';

export const signupSchema = ({ sameAddress, isNested }) =>
  yup.object().shape({
    user: yup.object({
      ...personalDetailsSchema(),
      ...passwordSchema(),
    }),
    slots: yup.object({
      count: yup.number().typeError('Digits only').integer().max(10).required('Max size 10'),
      ...dynamicListSchema(isNested),
    }),
    company: yup.object({
      name: yup.string().required(requiredAlert),
      years: yup.number().integer().required(requiredAlert),
    }),
    address: yup.object({
      registration: yup.object({
        line: yup.object({
          one: yup.string().required(requiredAlert),
          two: yup.string(),
        }),
        city: yup.string().required(requiredAlert),
        state: yup.string(),
        zip: yup.string(),
        country: yup.object({}).required(requiredAlert),
      }),
      correspondence: yup.object().shape(addressSchema(sameAddress)),
    }),
  });
