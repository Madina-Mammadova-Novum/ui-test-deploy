'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

import { UrlPropTypes } from '@/lib/types';

import {
  chartererOnSubsHeaderDataAdapter,
  onSubsDetailsAdapter,
  onSubsDocumentsTabRowsDataAdapter,
  ownerOnSubsHeaderDataAdapter,
} from '@/adapters';
import { ExpandableCardHeader, Loader, Title } from '@/elements';
import { ExpandableRow } from '@/modules';
import { getOnSubsDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const OnSubsDetails = ({ searchedParams }) => {
  const { offers, loading, role, toggle } = useSelector(getOnSubsDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  const searchedResult = offers.find((offer) => offer.cargoeId === searchedParams.id);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const scriveURL = isOwner ? rowData?.ownerDocumentSignUrl : rowData?.chartererDocumentSignUrl;

    return (
      <ExpandableRow
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1.5fr 1fr 1.5fr 1fr 1fr 1fr 1fr'}
          />
        }
        expand={toggle}
        footer={
          <OnSubsExpandedFooter
            underRecap={!rowData?.isCountdownActive}
            offerId={rowData?.id}
            scriveURL={scriveURL || ''}
          />
        }
      >
        <OnSubsExpandedContent
          offerId={rowData?.id}
          detailsData={onSubsDetailsAdapter({ data: rowData })}
          documentsData={onSubsDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          tab={searchedParams?.status}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult]?.map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, searchedResult, printExpandableRow]);

  return printContent;
};

OnSubsDetails.propTypes = UrlPropTypes;

export default OnSubsDetails;
