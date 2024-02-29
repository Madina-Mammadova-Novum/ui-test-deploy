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
  const { offers, loading, role, toggle } = useSelector(getOnSubsDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));

    return () => {
      dispatch(setToggle(false));
    };
  }, []);

  const printExpandableRow = (rowData) => {
    const rowHeader = isOwner
      ? ownerOnSubsHeaderDataAdapter({ data: rowData })
      : chartererOnSubsHeaderDataAdapter({ data: rowData });

    const scriveURL = isOwner ? rowData?.ownerDocumentSignUrl : rowData?.chartererDocumentSignUrl;
    const setStyles = isOwner ? '1fr 2fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1.5fr 1.5fr 1fr 1.5fr 1fr 1fr 1fr 1fr';

    return (
      <ExpandableRow
        key={rowData?.id}
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles={setStyles} />}
        expand={toggle}
        className="px-5"
        footer={
          <OnSubsExpandedFooter
            offerId={rowData?.id}
            identity={{ isOwner }}
            scriveURL={scriveURL || ''}
            underRecap={!rowData?.isCountdownActive}
            status={{ chraterer: rowData.chartererConfirmed, owner: rowData.ownerConfirmed }}
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
    const searchedResult = offers?.find((offer) => offer?.cargoeId === searchedParams.id);

    if (loading) return <Loader className="h-8 w-8 absolute top-1/2 z-0" />;
    if (searchedResult) return [searchedResult]?.map(printExpandableRow);

    return <Title level="3">Notification is outdated.</Title>;
  }, [loading, offers, toggle, isOwner, searchedParams?.id]);

  return printContent;
};

OnSubsDetails.propTypes = UrlPropTypes;

export default OnSubsDetails;
