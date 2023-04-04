import { fleetTableCellAdapter } from '../fleets';

export const tableRowsAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  return [...fleetTableCellAdapter({ data, index })];
};
