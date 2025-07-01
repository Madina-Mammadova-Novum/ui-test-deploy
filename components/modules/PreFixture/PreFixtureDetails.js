'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { setToggle } from '@/store/entities/pre-fixture/slice';
import { getPreFixtureDataSelector } from '@/store/selectors';
import { getRoleIdentity } from '@/utils/helpers';

const PreFixtureDetails = ({ searchedParams }) => {
  const dispatch = useDispatch();

  const { loading, role, toggle, deal } = useSelector(getPreFixtureDataSelector);

  const { isOwner } = getRoleIdentity({ role });

  useEffect(() => {
    dispatch(setToggle(true));

    return () => {
      dispatch(setToggle(false));
    };
  }, []);

  const printExpandableRow = (rowData, index) => {
    const rowHeader = isOwner
      ? ownerPrefixtureHeaderDataAdapter({ data: rowData })
      : chartererPrefixtureHeaderDataAdapter({ data: rowData });

    const setAccepted = (isOwner ? rowData?.ownerConfirmed : rowData?.chartererConfirmed) === 'Confirmed';

    return (
      <ExpandableRow
        key={rowData.id}
        expand={index === 0 || toggle}
        header={
          <ExpandableCardHeader
            headerData={rowHeader}
            gridStyles={isOwner ? '1fr 1.5fr 1fr 1fr 2fr 1fr 1fr 1fr' : '1fr 1fr 1fr 2fr 1fr 1fr 1fr'}
          />
        }
        footer={
          <PreFixtureExpandedFooter
            underNegotiation={!rowData?.isCountdownActive}
            offerId={rowData.id}
            offerAccepted={setAccepted}
          />
        }
      >
        <PreFixtureExpandedContent
          detailsData={prefixtureDetailsAdapter({ data: rowData, role })}
          documentsData={prefixtureDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
          charterPartyData={rowData?.charterPartyOptions}
          proposedBaseCharterParty={rowData?.proposedBaseCharterParty}
          tab={searchedParams?.status}
          offerId={rowData?.id}
        />
      </ExpandableRow>
    );
  };

  const printContent = useMemo(() => {
    if (loading) return <Loader className="absolute top-1/2 z-0 h-8 w-8" />;
    return [deal].map((rowData, index) => printExpandableRow(rowData, index)) || <Title>Outdated notification</Title>;
  }, [loading, toggle, searchedParams.id]);

  return printContent;
};

PreFixtureDetails.propTypes = UrlPropTypes;

export default PreFixtureDetails;
