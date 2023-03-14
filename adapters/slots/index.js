import { makeId } from '@/utils/helpers';

export const tankersAdapter = (length) => {
  const result = Array.from({ length });

  return result.map(() => ({ name: 'imo', label: 'imo', id: makeId() }));
};

export const cargoesAdapter = (length) => {
  const result = Array.from({ length });

  return result.map(() => {
    return [
      { name: 'imo', label: 'imo', id: makeId() },
      { name: 'port', label: 'load port', options: [], id: makeId() },
      { name: 'date', label: 'BILL OF LADING DATE', id: makeId() },
    ];
  });
};
