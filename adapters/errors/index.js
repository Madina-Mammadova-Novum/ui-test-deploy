import { errorMessage } from '@/utils/helpers';

export const errorsAdapter = ({ error }) => {
  return {
    type: error?.type ?? null,
    traceId: error?.traceid ?? null,
    title: error?.title || 'Bad request',
    ...errorMessage({ error }),
  };
};
