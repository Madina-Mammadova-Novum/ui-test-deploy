'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import FleetsExpandedContent from './FleetsExpandedContent';

import { UrlPropTypes } from '@/lib/types';

import { fleetsPageHeaderDataAdapter, fleetsPageRowsDataAdapter } from '@/adapters';
import { DynamicLoader, ExpandableCardHeader, Title } from '@/elements';
import { ACTIONS } from '@/lib/constants';
import { ExpandableRow } from '@/modules';
import { getFleetsSelector } from '@/store/selectors';
import { UnassignedFleet } from '@/units';

const Fleets = ({ searchedParams }) => {
  const { data, unassignedData, toggle, loading } = useSelector(getFleetsSelector);

  const printExpandableRow = (rowData) => {
    const rowHeader = fleetsPageHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData?.id}
        className="px-5 pb-5"
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

    if (loading) return <DynamicLoader />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    if (data.length > 0 && !searchedResult) return data.map(printExpandableRow);

    if (!unassignedData || unassignedData.length === 0) {
      return <Title level="3">There are no available positions</Title>;
    }

    return null;
  }, [loading, data, toggle, searchedParams?.id]);

  return (
    <div className="flex grow flex-col gap-y-2.5">
      {!loading && <UnassignedFleet data={unassignedData} toggle={toggle} />}
      {printContent}
    </div>
  );
};

Fleets.propTypes = UrlPropTypes;

export default Fleets;
