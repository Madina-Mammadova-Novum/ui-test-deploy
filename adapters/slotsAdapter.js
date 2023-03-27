import { getFilledArray, makeId } from '@/utils/helpers';

// todo: clean all not used code
export const tankersAdapter = (value) => {
  const result = getFilledArray(value);

  return result.map(() => ({ name: 'imo', label: 'imo', id: makeId() }));
};
