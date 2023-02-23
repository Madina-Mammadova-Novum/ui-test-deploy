import { yupResolver } from '@hookform/resolvers/yup';

import { signupSchema } from '@/lib/schemas';

export const options = {
  signup: {
    mode: 'onBlur',
    resolver: yupResolver(signupSchema),
  },
};
