'use client';

import { useSelector } from 'react-redux';

import UnassignedFleetExpandedContent from './UnassignedFleetExpandedContent';

import { UnassignedFleetPropTypes } from '@/lib/types';

import { fleetsPageHeaderDataAdapter, unassignedFleetRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getUnassignedVessels } from '@/services/vessel';
import { fleetsSelector } from '@/store/selectors';
import { useFetch } from '@/utils/hooks';

const UnassignedFleet = ({ toggle }) => {
  const { refetch } = useSelector(fleetsSelector);
  const [data] = useFetch(getUnassignedVessels, refetch);
  return (
    <ExpandableRow
      header={
        <ExpandableCardHeader
          headerData={fleetsPageHeaderDataAdapter({
            data: { vessels: data, name: 'Unassigned Fleet' },
          })}
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
