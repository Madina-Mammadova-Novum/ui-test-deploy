import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/lib/schemas';

export const options = {
  signup: {
    owner: {
      mode: 'onChange',
      defaultValues: {
        params: {
          sameAddress: false,
          rules: false,
        },
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
        tankers: {
          count: '',
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
            country: '',
          },
        },
      },
      resolver: yupResolver(signupSchema),
    },
    charterer: {
      mode: 'onChange',
      defaultValues: {
        params: {
          sameAddress: false,
          rules: false,
        },
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
        tankers: {
          count: '',
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
            country: '',
          },
        },
      },
      resolver: yupResolver(signupSchema),
    },
  },
};
