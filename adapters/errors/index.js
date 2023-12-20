import { SYSTEM_ERROR } from '@/lib/constants';
import { convertKeysToLowerCase, errorMessage, formatErrors } from '@/utils/helpers';

export const errorsAdapter = ({ error }) => {
  const errors = convertKeysToLowerCase(error);

  const message = errors?.title ?? (errors || SYSTEM_ERROR);

  return {
    type: errors?.type ?? null,
    traceId: errors?.traceid ?? null,
    message: errorMessage({ message, errors }),
    errors: formatErrors(errors?.errors),
  };
};
