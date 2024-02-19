'use client';

import UnassignedFleetExpandedContent from './UnassignedFleetExpandedContent';

import { UnassignedFleetPropTypes } from '@/lib/types';

import { fleetsPageHeaderDataAdapter, unassignedFleetRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow } from '@/modules';

const UnassignedFleet = ({ toggle, data }) => {
  const fleetData = { vessels: data, name: 'Unassigned Fleet' };

  const formattedHeaderData = fleetsPageHeaderDataAdapter({ data: fleetData });
  const formattedRowData = unassignedFleetRowsDataAdapter({ data });

  return (
    <ExpandableRow
      className="px-5 pb-5 pt-2.5"
      expand={toggle}
      header={<ExpandableCardHeader headerData={formattedHeaderData} itemsContainerStyles="lg:grid-cols-2" />}
    >
      <UnassignedFleetExpandedContent rowsData={formattedRowData} />
    </ExpandableRow>
  );
};

UnassignedFleet.propTypes = UnassignedFleetPropTypes;

export default UnassignedFleet;
