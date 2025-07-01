'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import FixtureExpandedContent from './FixtureExpandedContent';

import {
  fixtureDetailsAdapter,
  fixtureDocumentsTabRowsDataAdapter,
  fixtureHeaderDataAdapter,
} from '@/adapters/fixture';
import { DynamicLoader, ExpandableCardHeader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getFixtureSelector } from '@/store/selectors';

const Fixture = () => {
  const { offers, toggle, loading } = useSelector(getFixtureSelector);

  const printExpandableRow = (rowData, index) => {
    const rowHeader = fixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData?.id}
        expand={index === 0 || toggle}
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles="1.5fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr" />}
      >
        <FixtureExpandedContent
          offerId={rowData?.id}
          detailsData={fixtureDetailsAdapter({ data: rowData })}
          documentsData={fixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <DynamicLoader />;
    if (offers?.length) return offers.map((rowData, index) => printExpandableRow(rowData, index));

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, printExpandableRow]);

  return printContent;
};
export default Fixture;
