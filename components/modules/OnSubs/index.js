'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import OnSubsExpandedContent from './OnSubsExpandedContent';
import OnSubsExpandedFooter from './OnSubsExpandedFooter';

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

const OnSubs = () => {
  const { offers, toggle, loading, role } = useSelector(getOnSubsDataSelector);
  const { isOwner, isCharterer } = getRoleIdentity({ role });

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const scriveURL = isOwner ? rowData?.ownerDocumentSignUrl : rowData?.chartererDocumentSignUrl;

    return (
      <ExpandableRow
        className="px-5"
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 2fr 2fr 1fr 2fr 1fr 1fr 1fr' : '1.5fr 2fr 2.5fr 1fr 2.5fr 1fr 1fr 1fr 1fr'}
          />
        }
        expand={toggle}
        footer={
          <OnSubsExpandedFooter
            underRecap={!rowData?.isCountdownActive || !!rowData?.expiresAt || !!rowData?.failedAt}
            identity={{ isOwner, isCharterer }}
            status={{ chraterer: rowData.chartererConfirmed, owner: rowData.ownerConfirmed }}
            offerId={rowData?.id}
            scriveURL={scriveURL || ''}
          />
        }
      >
        <OnSubsExpandedContent
          offerId={rowData?.id}
          detailsData={onSubsDetailsAdapter({ data: rowData })}
          documentsData={onSubsDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (offers?.length) return offers?.map(printExpandableRow);

    return <Title level="3">No offers at current stage</Title>;
  }, [loading, offers, printExpandableRow]);

  return printContent;
};

export default OnSubs;
