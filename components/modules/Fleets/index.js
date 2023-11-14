'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import FleetsExpandedContent from './FleetsExpandedContent';

import { UrlPropTypes } from '@/lib/types';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getFleetsSelector } from '@/store/selectors';
import { UnassignedFleet } from '@/units';

const Fleets = ({ searchedParams }) => {
  const { data, toggle, loading } = useSelector(getFleetsSelector);

  const printExpandableRow = (rowData) => {
    const rowHeader = fleetsPageHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            itemId={rowData?.id}
            itemsContainerStyles="lg:grid-cols-2"
            actions={[
              {
                action: ACTIONS.EDIT_FLEET,
                text: 'Edit',
                variant: 'tertiary',
                size: 'medium',
              },
              {
                action: ACTIONS.DELETE_FLEET,
                text: 'Delete',
                variant: 'delete',
                size: 'medium',
              },
            ]}
          />
        }
        expand={toggle}
        isOpened={Boolean(searchedParams?.id)}
      >
        <FleetsExpandedContent
          rowsData={fleetsPageRowsDataAdapter({ data: rowData.vessels, fleetName: rowData.name })}
          fleetId={rowData.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    const searchedResult = data?.find((vessel) => vessel?.id === searchedParams?.id);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    if (data.length > 0 && !searchedResult) return data.map(printExpandableRow);

    return <Title level="3">No positions</Title>;
  }, [loading, data, printExpandableRow]);

  return (
    <div className="flex flex-col gap-y-2.5 grow">
      <UnassignedFleet toggle={toggle} />
      {printContent}
    </div>
  );
};

Fleets.propTypes = UrlPropTypes;

export default Fleets;
