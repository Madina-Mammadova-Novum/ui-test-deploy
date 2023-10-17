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
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const PreFixtureDetails = ({ searchedParams }) => {
  const { loading, offers, role, toggle } = useSelector(getPreFixtureDataSelector);

  const searchedResult = offers.find((offer) => offer?.cargoeId === searchedParams?.id);

  const { isOwner } = getRoleIdentity({ role });

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    return (
      <ExpandableRow
        key={rowData.id}
        expand={toggle || searchedParams?.status}
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 1fr 1.5fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr'}
          />
        }
        footer={
          <PreFixtureExpandedFooter
            underNegotiation={!rowData?.additionalCharterPartyTerms?.length}
            offerId={rowData.id}
            offerAccepted={(isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed'}
          />
        }
      >
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          tab={searchedParams?.status}
          offerId={rowData?.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult].map(printExpandableRow);

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, searchedResult, printExpandableRow]);

  return (
    <section className="flex min-h-[90vh] flex-col gap-y-5">
      <div className="flex flex-col gap-y-2.5 grow">{printContent}</div>
    </section>
  );
};

PreFixtureDetails.propTypes = UrlPropTypes;

export default PreFixtureDetails;
