import { getFilledArray, makeId } from '@/utils/helpers';

export const tankersAdapter = (value) => {
  const result = getFilledArray(value);

  return result.map(() => ({ name: 'imo', label: 'imo', id: makeId() }));
};

export const cargoesAdapter = (value) => {
  const result = getFilledArray(value);

  return result.map(() => {
    return {
      imo: { name: `vesselIMO`, label: 'imo', id: makeId() },
      port: { name: `loadPortId`, label: 'load port', id: makeId() },
      date: { name: `billOfLadingDate`, label: 'BILL OF LADING DATE', id: makeId() },
    };
  });
};
