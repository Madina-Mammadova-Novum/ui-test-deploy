import { yupResolver } from '@hookform/resolvers/yup';

import { uploadSchema } from '@/lib/schemas';

export const options = {
  upload: {
    resolver: yupResolver(uploadSchema),
  },
};
