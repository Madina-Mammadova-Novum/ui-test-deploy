'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { setToggle } from '@/store/entities/on-subs/slice';
import { getOnSubsDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const OnSubsDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();
  const { loading, role, toggle, deal } = useSelector(getOnSubsDataSelector);
  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));
  }, [dispatch]);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const { frozenAt, isFailed } = rowData;
    const isStatusSectionActive = isFailed || frozenAt;

    return (
      <ExpandableRow
        key={rowData?.id}
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={
              isOwner
                ? `1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr ${isStatusSectionActive ? '2fr' : ''}`
                : `1.5fr 2fr 1fr 1fr 2.5fr 1fr 1fr 1fr 1fr ${isStatusSectionActive ? '2fr' : ''}`
            }
          />
        }
        expand={toggle}
        className="px-5"
        footer={
          <OnSubsExpandedFooter
            offerId={rowData?.id}
            identity={{ isOwner }}
            underRecap={!rowData?.isCountdownActive || !rowData?.failedAt || rowData?.isFailed}
            status={{ charterer: rowData.chartererConfirmed, owner: rowData.ownerConfirmed }}
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
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;

    return [deal].map(printExpandableRow) || <Title>Outdated notification</Title>;
  }, [loading, toggle, searchedParams.id, deal]);

  return printContent;
};

OnSubsDetails.propTypes = UrlPropTypes;

export default OnSubsDetails;
