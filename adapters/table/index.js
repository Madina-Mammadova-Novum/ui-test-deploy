import { fleetTableCellAdapter } from '../fleets';
import { prefixtureTableCellAdapter } from '../pre-fixture';

export const tableRowsAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  return [...fleetTableCellAdapter({ data, index }), ...prefixtureTableCellAdapter({ data, index })];
};
