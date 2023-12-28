import { convertKeysToLowerCase, errorMessage } from '@/utils/helpers';

export const errorsAdapter = ({ error }) => {
  const errors = convertKeysToLowerCase(error);

  return {
    type: errors?.type ?? null,
    traceId: errors?.traceid ?? null,
    title: errors?.title || 'Bad request',
    ...errorMessage({ errors }),
  };
};
