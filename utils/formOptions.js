import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema, signupSchema } from '@/lib';

export const signupOptions = (params) => ({
  mode: 'onBlur',
  defaultValues: {
    user: {
      name: '',
      surname: '',
      email: '',
      phone: {
        primary: '',
        secondary: '',
      },
    },
    company: {
      name: '',
      years: '',
    },
    slots: {
      count: '',
      list: [],
    },
    address: {
      registration: {
        line: {
          one: '',
          two: '',
        },
        city: '',
        state: '',
        zip: '',
        country: '',
      },
      correspondence: {
        line: {
          one: '',
          two: '',
        },
        city: '',
        state: '',
        zip: '',
        country: {},
      },
    },
  },
  resolver: yupResolver(signupSchema(params)),
});

export const loginOptions = () => ({
  mode: 'onBlur',
  defaultValues: {
    email: '',
    password: '',
  },
  resolver: yupResolver(loginSchema()),
});
