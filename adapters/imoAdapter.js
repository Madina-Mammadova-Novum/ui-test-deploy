import { makeId } from '@/utils/helpers';

export const imoAdapter = (length) => {
  const result = Array.from({ length });

  return result.map(() => ({ label: 'imo', id: makeId() }));
};
