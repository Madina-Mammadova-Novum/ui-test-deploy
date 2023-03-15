import { makeId } from '@/utils/helpers';

export const tankersAdapter = (length) => {
  // todo: it's not adapter it's more helper
  const result = Array.from({ length });

  return result.map(() => ({ name: 'imo', label: 'imo', id: makeId() }));
};

export const cargoesAdapter = (length) => {
  // todo: it's not adapter it's more helper
  const result = Array.from({ length });

  return result.map(() => {
    return {
      imo: { name: `vesselIMO`, label: 'imo', id: makeId() },
      port: { name: `loadPortId`, label: 'load port', options: [], id: makeId() },
      date: { name: `billOfLadingDate`, label: 'BILL OF LADING DATE', id: makeId() },
    };
  });
};
