import * as yup from 'yup';

import { addressSchema, dynamicListSchema, requiredAlert } from '@/lib/schemas';

export const signupSchema = ({ sameAddress, isNested }) =>
  yup.object().shape({
    user: yup.object({
      name: yup.string().required(requiredAlert),
      surname: yup.string().required(requiredAlert),
      email: yup.string().email('Invalid email format').required(requiredAlert),
      phone: yup.object({
        primary: yup.string().required(requiredAlert),
        secondary: yup.string(),
      }),
      password: yup
        .string()
        .min(8, 'Password too short')
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one digit')
        .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
      passwordConf: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
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
