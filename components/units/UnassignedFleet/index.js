'use client';

import { useSelector } from 'react-redux';

import UnassignedFleetExpandedContent from './UnassignedFleetExpandedContent';

import { UnassignedFleetPropTypes } from '@/lib/types';

import { fleetsPageHeaderDataAdapter, unassignedFleetRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow } from '@/modules';
import { fleetsSelector } from '@/store/selectors';

const UnassignedFleet = ({ toggle }) => {
  const { unassignedFleetData: data } = useSelector(fleetsSelector);
  return (
    <ExpandableRow
      header={
        <ExpandableCardHeader
          headerData={fleetsPageHeaderDataAdapter({
            data: { vessels: data, name: 'Unassigned Fleet' },
          })}
          itemsContainerStyles="lg:grid-cols-2"
        />
      }
      expand={toggle}
    >
      <UnassignedFleetExpandedContent rowsData={unassignedFleetRowsDataAdapter({ data })} />
    </ExpandableRow>
  );
};

UnassignedFleet.propTypes = UnassignedFleetPropTypes;

export default UnassignedFleet;
