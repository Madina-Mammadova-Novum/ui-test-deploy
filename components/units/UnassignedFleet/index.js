'use client';

import UnassignedFleetExpandedContent from './UnassignedFleetExpandedContent';

import { fleetsPageHeaderDataAdapter, unassignedFleetRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getUnassignedVessels } from '@/services/vessel';
import { useFetch } from '@/utils/hooks';
import { UnassignedFleetPropTypes } from '@/lib/types';


const UnassignedFleet = ({ toggle }) => {
  const [data] = useFetch(getUnassignedVessels);

  return (
    <ExpandableRow
      header={
        <ExpandableCardHeader
          headerData={fleetsPageHeaderDataAdapter({ data: { ...data, name: 'Unassigned Fleet' } })}
        />
      }
      expand={toggle}
    >
      <UnassignedFleetExpandedContent rowsData={unassignedFleetRowsDataAdapter({ data: data?.vessels })} />
    </ExpandableRow>
  );
};

UnassignedFleet.propTypes = UnassignedFleetPropTypes;

export default UnassignedFleet;
