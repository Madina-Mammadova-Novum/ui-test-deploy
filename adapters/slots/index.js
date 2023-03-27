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
    return [
      { name: 'imo', label: 'imo', id: makeId() },
      { name: 'port', label: 'load port', options: [], id: makeId() },
      { name: 'date', label: 'BILL OF LADING DATE', id: makeId() },
    ];
  });
};
