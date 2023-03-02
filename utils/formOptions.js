import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/lib';

export const signupOptions = (params) => ({
  mode: 'onChange',
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
