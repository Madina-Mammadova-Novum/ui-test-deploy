import { fleetTableCellAdapter } from '../fleets';
import { failedTabCellAdapter, incomingTabCellAdapter, sentCounterofferTabCellAdapter } from '../negotiating';

export const tableRowsAdapter = ({ data, index }) => {
  if (data === null || data === undefined) return [];

  return [
    ...fleetTableCellAdapter({ data, index }),
    ...incomingTabCellAdapter({ data, index }),
    ...sentCounterofferTabCellAdapter({ data, index }),
    ...failedTabCellAdapter({ data, index }),
  ];
};
