import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '@/lib/schemas';

export const options = {
  resolver: yupResolver(schema),
};
