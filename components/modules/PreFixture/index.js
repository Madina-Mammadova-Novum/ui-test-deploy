'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import PreFixtureExpandedContent from './PreFixtureExpandedContent';
import PreFixtureExpandedFooter from './PreFixtureExpandedFooter';

import { UrlPropTypes } from '@/lib/types';

import {
  chartererPrefixtureHeaderDataAdapter,
  ownerPrefixtureHeaderDataAdapter,
  prefixtureDetailsAdapter,
  prefixtureDocumentsTabRowsDataAdapter,
} from '@/adapters';
import { DynamicLoader, ExpandableCardHeader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const PreFixture = () => {
  const { loading, offers, role, toggle } = useSelector(getPreFixtureDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const printExpandableRow = (rowData, index) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData.id}
        expand={index === 0 || toggle}
        className="px-5"
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1fr 1fr 2fr 1fr 1fr 1fr'}
          />
        }
        footer={
          <PreFixtureExpandedFooter
            offerId={rowData.id}
            underNegotiation={rowData?.countdownStatus !== 'Running'}
            offerAccepted={(isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed'}
          />
        }
      >
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          charterPartyData={rowData?.charterPartyOptions}
          proposedBaseCharterParty={rowData?.proposedBaseCharterParty}
          offerId={rowData?.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <DynamicLoader />;
    if (offers?.length) return offers.map((rowData, index) => printExpandableRow(rowData, index));

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers]);

  return printContent;
};

PreFixture.propTypes = UrlPropTypes;

export default PreFixture;
